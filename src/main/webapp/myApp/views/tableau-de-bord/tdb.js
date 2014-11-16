'use strict';

angular.module('myApp.views.tableau-de-bord.tdb', ['ngRoute', 'myApp.config', 'myApp.data.radiateur', 'myApp.data.store'])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/tableau-de-bord', {
                    templateUrl: 'myApp/views/tableau-de-bord/tdb.html'
                });
            }])
        .controller('TableauDeBordCtrl', ['$scope', '$rootScope', '$location', 'RadiateurService', 'radiateurCollectionService',
            function ($scope, $rootScope, $location, RadiateurService, radiateurCollectionService) {
                $scope.$emit("myApp.refresh.menu", "Tableau de bord");

                $scope.radiateurs = radiateurCollectionService.getAll();
                $scope.$watch(function () {
                    return radiateurCollectionService.getAll() === $scope.radiateurs;
                }, function () {
                    $scope.radiateurs = radiateurCollectionService.getAll();
                });
                
                $scope.onClickRadiateur = function (id, enChauffe) {
                    if (enChauffe) {
                        $location.path("/arret/" + id);
                    } else {
                        $location.path("/modification/" + id);
                    }
                };

                // horloge
                var timer = setInterval(function () {
                    $scope.$apply();
                }, 60000);

                $scope.$on('$destroy', function () {
                    clearInterval(timer);
                });
            }]);