'use strict';

angular.module('myApp.menu', ['myApp.config', 'myApp.data.store', 'myApp.synchro'])
        .controller('MenuCtrl', ['$scope', '$rootScope', 'APP_VERSION', 'sychroService', '$location', function ($scope, $rootScope, APP_VERSION, sychroService, $location) {
                $rootScope.$on("myApp.refresh.menu", function (evt, newTitle) {
                    $scope.title = newTitle;
                });

                $scope.version = APP_VERSION;
                $scope.hideItems = true;
                $scope.synchro = function () {
                    sychroService.sync();
                };

                $scope.toggleMenu = function () {
                    $scope.hideItems = !$scope.hideItems;
                };

                $scope.go = function (path) {
                    $location.path(path);
                };
            }]);