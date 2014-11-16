'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute', 'myApp.menu', 'myApp.error', 'myApp.synchro', 'myApp.meteo', 'myApp.views.tableau-de-bord.tdb', 'myApp.views.administration.admin', 'myApp.views.modification.modif', 'myApp.views.arret.arret', 'myApp.data.store'
])
        .controller("AppCtrl", ['$scope', '$rootScope', function ($scope, $rootScope) {
                $scope.hideLoader = true;

                $rootScope.$on("myApp.loader.show", function (evt, msg) {
                    $scope.hideLoader = false;
                });
                $rootScope.$on("myApp.loader.hide", function (evt, msg) {
                    $scope.hideLoader = true;
                });
            }])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider
                        .otherwise({
                            redirectTo: 'tableau-de-bord'
                        });
            }]);
