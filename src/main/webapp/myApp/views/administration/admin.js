'use strict';

angular.module('myApp.views.administration.admin', ['ngRoute', 'myApp.data.store'])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/administration', {
                    templateUrl: 'myApp/views/administration/admin.html'
                });
            }])
        .controller('AdminCtrl', ['$scope', 'applicationCollectionService', '$location',
            function ($scope, applicationCollectionService, $location) {

                $scope.appName = applicationCollectionService.getAttr("appName");
                $scope.telephoneNotif = applicationCollectionService.getAttr("telephoneNotif");   
                $scope.reinit = function(){
                    applicationCollectionService.reset();
                    applicationCollectionService.load();
                    $location.path("#tableau-de-bord");
                };
                $scope.enregistrer = function(){
                    applicationCollectionService.setAttr("appName", $scope.appName);
                    applicationCollectionService.setAttr("telephoneNotif", $scope.telephoneNotif);
                    
                    $location.path("#tableau-de-bord");
                };
            }]);