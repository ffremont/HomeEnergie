'use strict';

angular.module('myApp.views.modification.modif', ['ngRoute', 'myApp.config', 'myApp.data.store', 'myApp.data.radiateur', 'myApp.synchro'])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/modification/:idRadiateur', {
                    templateUrl: 'myApp/views/modification/modif.html'
                });
            }])
        .controller('ModificationCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'radiateurCollectionService', 'RadiateurFactory', 'applicationCollectionService', 'sychroService', function ($scope, $rootScope, $routeParams, $location, radiateurCollectionService, RadiateurFactory, applicationCollectionService, sychroService) {
                var radiateur = radiateurCollectionService.find($routeParams.idRadiateur);
                $scope.$emit("myApp.refresh.menu", radiateur.libelle());

                $scope.radiateur = radiateur;

                $scope.notif = true;
                $scope.position = radiateur.position;
                $scope.etat = radiateur.etat;
                $scope.dureeEstimee = 10; // min

                $scope.submit = function (rad) {
                    rad.position = parseInt($scope.position);
                    rad.etat = $scope.etat;
                    rad.dureeEstimee = parseInt($scope.dureeEstimee);
                    
                    if (($scope.etat !== RadiateurFactory.ETAT.HORS_GEL) && $scope.dureeEstimee && $scope.position) {
                        rad.dernierMiseEnRoute = (new Date()).getTime();
                        rad.enChauffe = true;
                        
                        if($scope.notif){
                            var list = applicationCollectionService.getAttr("notifications");
                            list.push({
                                notify: applicationCollectionService.getAttr("telephoneNotif"),
                                scheduled : rad.dernierMiseEnRoute + (60000 * rad.dureeEstimee),
                                message : "HOME ENERGIE \n Rappel : éteindre le radiateur '"+rad.libelle()+"'\nEn chauffe depuis "+rad.dureeEstimee+"min."
                            });
                            applicationCollectionService.setAttr("notifications", list);
                            radiateurCollectionService.put(rad);

                            sychroService.pushNotifs();
                        }
                    }

                    radiateurCollectionService.put(rad);

                    $location.path("#tableau-de-bord");
                };
            }]);

        