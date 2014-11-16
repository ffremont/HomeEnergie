'use strict';

angular.module('myApp.views.arret.arret', ['ngRoute', 'myApp.config', 'myApp.data.store', 'myApp.synchro'])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/arret/:idRadiateur', {
                    templateUrl: 'myApp/views/arret/arret.html'
                });
            }])
        .controller('ArretCtrl', ['$scope', '$routeParams', '$location', 'radiateurCollectionService', 'applicationCollectionService', 'sychroService', function ($scope, $routeParams, $location, radiateurCollectionService, applicationCollectionService, sychroService) {
                var radiateur = radiateurCollectionService.find($routeParams.idRadiateur);
                $scope.$emit("myApp.refresh.menu", radiateur.libelle());
                
                $scope.radiateur = radiateur;
                $scope.dateFinPrevue = radiateur.dernierMiseEnRoute + (60000 * radiateur.dureeEstimee);
                
                $scope.arreter = function(rad){
                    rad.stop();
                    rad.position = parseInt($scope.radiateur.position);
                    
                    var list = applicationCollectionService.getAttr("stopList");
                    list.push({
                        dateArret: Math.round((new Date()).getTime() / 1000),
                        dureeMin: rad.derniereDuree,
                        puissanceWatt : rad.puissance
                    });
                    applicationCollectionService.setAttr("stopList", list);
                    radiateurCollectionService.put(rad);
                    
                    sychroService.pushStop();
                    
                    $location.path("#tableau-de-bord");
                };
            }]);