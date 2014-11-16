'use strict';

angular.module('myApp.meteo', ['myApp.data.store', 'myApp.config'])
        .factory('WeatherFactory', function () {
            function Weather(dataWeatherOpenWeatherMapp) {
                this.iconsTranslation = {
                    "01d": "icon-sun",
                    "02d": "icon-cloudy",
                    "03d": "icon-cloud-4",
                    "04d": "icon-cloud-7",
                    "09d": "icon-rainy",
                    "10d": "icon-rainy-2",
                    "11d": "icon-lightning-4",
                    "13d": "icon-snowy-3",
                    "50d": "icon-lines",
                    "01n": "icon-moon",
                    "02n": "icon-cloud-3",
                    "03n": "icon-cloud-4",
                    "04n": "icon-cloud-7",
                    "09n": "icon-rainy",
                    "10n": "icon-rainy-2",
                    "11n": "icon-lightning-4",
                    "13n": "icon-snowy-3",
                    "50n": "icon-lines"
                };

                this.iconCls = this.iconsTranslation[dataWeatherOpenWeatherMapp.icon] ? this.iconsTranslation[dataWeatherOpenWeatherMapp.icon] : "";
            }
            ;

            return Weather;
        })
        .service('openWeatherMapService', ['$rootScope', '$http', 'applicationCollectionService', 'WeatherFactory', 'OPENWEATHERMAP', function ($rootScope, $http, applicationCollectionService, WeatherFactory, OPENWEATHERMAP) {
                function OpenWeatherMap() {
                    var me = this;

                    me.data = {
                        currentTemp: null,
                        nextTemp: null,
                        weather: []
                    };

                    me.getData = function () {
                        return me.data;
                    };

                    me.whatWeatherLikeToday = function () {
                        var meteo = applicationCollectionService.getAttr("meteo");
                        if (meteo && (meteo.date > ((new Date()).getTime() - 7200000))) { // 2h
                            me.provide(meteo.dataSource);
                        } else {
                            $http.get(OPENWEATHERMAP.url)
                                    .success(function (data) {
                                        me.provide(data);
                                    }).
                                    error(function (data) {
                                        $rootScope.$emit("myApp.error.show", data);
                                    });
                        }
                    };

                    me.provide = function (data) {
                        applicationCollectionService.setAttr("meteo", {
                            "date": (new Date()).getTime(),
                            dataSource: data
                        });

                        var nowSec = (new Date()).getTime() / 1000;

                        if (data && (data.cod == "200")) {
                            angular.forEach(data.list, function (item, index) {
                                if (item && item.dt) {
                                    if (item.dt > nowSec) {
                                        if (me.data.weather.length === 0) {
                                            angular.forEach(item.weather, function (cell) {
                                                me.data.weather.push(new WeatherFactory(cell));
                                            });
                                        }
                                        if (me.data.currentTemp === null) {
                                            me.data.currentTemp = (parseFloat(item.main.temp) - 273.15).toFixed(0);
                                        } else {
                                            if (me.data.nextTemp === null) {
                                                me.data.nextTemp = (parseFloat(item.main.temp) - 273.15).toFixed(0);
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    };
                }
                ;

                return new OpenWeatherMap();
            }])
        .controller('MeteoCtrl', ['$scope', 'openWeatherMapService', function ($scope, openWeatherMapService) {
                $scope.weather = openWeatherMapService.data.weather;
                $scope.currentTemp = openWeatherMapService.data.currentTemp;
                $scope.nextTemp = openWeatherMapService.data.nextTemp;

                $scope.$watch(function () {
                    return openWeatherMapService.data.weather;
                }, function (newValue, oldValue) {
                    $scope.weather = newValue; // openWeatherMapService.data
                });
                $scope.$watch(function () {
                    return openWeatherMapService.data.currentTemp;
                }, function (newValue, oldValue) {
                    $scope.currentTemp = newValue;
                });
                $scope.$watch(function () {
                    return openWeatherMapService.data.nextTemp;
                }, function (newValue, oldValue) {
                    $scope.nextTemp = newValue;
                });

                openWeatherMapService.whatWeatherLikeToday();

                $scope.refresh = function () {
                    openWeatherMapService.whatWeatherLikeToday()
                };
            }]);