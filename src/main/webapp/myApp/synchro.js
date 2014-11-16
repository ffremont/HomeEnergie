'use strict';
angular.module('myApp.synchro', ['myApp.data.store'])
        .service("sychroService", ['$rootScope', '$http', 'applicationCollectionService', 'radiateurCollectionService', '$window', function ($rootScope, $http, applicationCollectionService, radiateurCollectionService, $window) {
                this.sync = function () {
                    $rootScope.$emit("myApp.loader.show");
                    var myTimestamp = (new Date()).getTime();
                    $http.post('rest/home-energie/synchronisation', {
                        date: myTimestamp,
                        derniereSync: applicationCollectionService.getAttr("derniereSync"),
                        appName: applicationCollectionService.getAttr("appName"),
                        notifications: applicationCollectionService.getAttr("notifications"),
                        radiateurs: radiateurCollectionService.getAll(),
                        stopList: applicationCollectionService.getAttr("stopList")
                    }, {timeout : 10000}).
                            success(function (data) {
                                $rootScope.$emit("myApp.loader.hide");
                                if (data && data.radiateurs && data.radiateurs.length) {
                                    radiateurCollectionService.set(data.radiateurs);
                                    
                                    applicationCollectionService.setAttr("derniereSync", myTimestamp);
                                }

                                applicationCollectionService.setAttr("notifications", []);
                                applicationCollectionService.setAttr("stopList", []);
                                
                                $rootScope.$emit("myApp.success.show", "Appareil synchronisé avec le serveur");
                            }).
                            error(function (data, status) {
                                $rootScope.$emit("myApp.loader.hide");
                                $rootScope.$emit("myApp.error.show", "Impossible de synchroniser");
                            });
                };

                this.pushNotifs = function () {
                    $rootScope.$emit("myApp.loader.show");
                    $http.post('rest/home-energie/notification', applicationCollectionService.getAttr("notifications"), {timeout : 10000}).
                            success(function () {
                                $rootScope.$emit("myApp.loader.hide");
                                applicationCollectionService.setAttr("notifications", []);
                            }).
                            error(function (data, status) {
                                $rootScope.$emit("myApp.loader.hide");
                            });
                };

                this.pushStop = function () {
                    $rootScope.$emit("myApp.loader.show");
                    $http.post('rest/home-energie/stop', applicationCollectionService.getAttr("stopList"), {timeout : 10000}).
                            success(function () {
                                $rootScope.$emit("myApp.loader.hide");
                                applicationCollectionService.setAttr("stopList", []);
                            }).
                            error(function (data, status) {
                                $rootScope.$emit("myApp.loader.hide");
                            });
                };
            }])
        ;