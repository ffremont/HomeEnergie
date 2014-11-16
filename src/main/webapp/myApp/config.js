'use strict';
angular.module('myApp.config', [])
        .constant('APP_VERSION', "${project.version}") // version affichée
        .constant('DB_VERSION', "1") 
        .constant('HM', 0.14)
        .constant('APP_NAME', 'Flow')
        .constant('NOTIFY_TO', '+33679600983')
        .constant('SENDER_NAME', 'Home Energie')
        .constant('OPENWEATHERMAP', {
            url : 'http://api.openweathermap.org/data/2.5/forecast?id=2990355'  // niort from http://openweathermap.org/help/city_list.txt
        })
        ;