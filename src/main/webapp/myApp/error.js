'use strict';

angular.module('myApp.error', [])
        .controller('ErrorCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
                $scope.afficher = false;
                $scope.message = "";
                $scope.type = "error"; // success 
                $scope.titre = "Erreur";
                
                $scope.isError = function(){
                   return $scope.type === "error"; 
                };
                
                $rootScope.$on("myApp.success.show", function(evt, msg){
                    $scope.titre = "Succès";
                    $scope.afficher = true;
                    $scope.type = "success";
                    $scope.message = msg;
                });
                $rootScope.$on("myApp.success.hide", function(evt){
                    $scope.afficher = false;
                });
                
                $rootScope.$on("myApp.error.show", function(evt, msg){
                    $scope.titre = "Erreur";
                    $scope.afficher = true;
                    $scope.type = "error";
                    $scope.message = msg;
                });
                $rootScope.$on("myApp.error.hide", function(evt){
                    $scope.afficher = false;
                });
                
                $scope.close = function(){
                    $scope.afficher = false;
                };  
            }]);