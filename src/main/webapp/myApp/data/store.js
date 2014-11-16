'use strict';

angular.module('myApp.data.store', ['myApp.config', 'myApp.data.radiateur'])
        .factory('DataFactory', ['DB_VERSION', function(DB_VERSION){
                function Data(name){
                    var me = this;
                    
                    me.dbKey = DB_VERSION + "_" + name;
                    me.value = null;
                    
                    me.load = function(){
                        me.value = JSON.parse(window.localStorage[me.dbKey] || "{}");
                    };
                    me.setAttr = function(attr, value){
                        me.value[attr] = value;
                        
                        me.flush();
                    };
                    me.set = function(value){
                        me.value = value;
                        
                        me.flush();
                    };
                    me.flush = function(){
                        window.localStorage[me.dbKey] = angular.toJson(me.value);
                    };
                    me.getAttr = function(attr){
                        return me.value[attr];
                    };
                    me.get = function(){
                        return me.value;
                    }
                };
                
                return Data;
        }])
        .factory('EngineFactory', ['DB_VERSION', 'RadiateurService', 'RadiateurFactory', function (DB_VERSION, RadiateurService, RadiateurFactory) {
                function Engine(collectionName, idName) {
                    var me = this;

                    me.idName = idName || "id";
                    me.db = null;
                    me.dbKey = DB_VERSION + "_" + collectionName;
                    me.data = [];

                    me.loadData = function () {
                        me.data = [];
                        
                        var collection = JSON.parse(window.localStorage[me.dbKey] || "[]");
                        angular.forEach(collection, function (cell) {
                            me.data.push(new RadiateurFactory(cell));
                        });
                    };
                    me.set = function(list){
                        me.data = list;
                        me.flush();
                        
                        me.loadData();
                    };
                    me.flush = function () {
                        window.localStorage[me.dbKey] = angular.toJson(me.data);
                    };
                    me.put = function (data) {
                        angular.forEach(me.data, function (cell) {
                            if (cell[me.idName] && (cell[me.idName] === data[me.idName])) {
                                cell = data;
                            }
                        });

                        me.flush();
                    };
                    me.push = function(data){
                        me.data.push(data);
                        
                        me.flush();
                    },
                    me.find = function (id) {
                        var rec = null;
                        angular.forEach(me.data, function (cell) {
                            if (cell[me.idName] && (cell[me.idName] === id) ) {
                                rec = cell;
                            }
                        });

                        return rec;
                    };
                    me.getAll = function () { // asc
                        return me.data;
                    };
                }
                ;

                return Engine;
            }])
        .service('radiateurCollectionService', ['EngineFactory', 'RadiateurService', 'RadiateurFactory', function (EngineFactory, RadiateurService, RadiateurFactory) {
                var engine = new EngineFactory("radiateur");

                if (!window.localStorage[engine.dbKey]) {
                    window.localStorage[engine.dbKey] = angular.toJson(RadiateurService.liste);
                }
                engine.loadData();

                return engine;
            }])
        .service('applicationCollectionService', ['DataFactory', 'NOTIFY_TO', 'APP_NAME', 'APP_VERSION', function (DataFactory, NOTIFY_TO, APP_NAME, APP_VERSION) {
                var app = new DataFactory("application");

                app.reset = function(){
                    window.localStorage[app.dbKey] = JSON.stringify({
                        version : APP_VERSION,
                        derniereSync : null,                        
                        meteo : null,
                        appName : APP_NAME,
                        telephoneNotif : NOTIFY_TO,
                        stopList: [], // { dateArret, dureeMin, puissanceWatt },
                        notifications: [] // { notify : "", message : ""}
                    });
                };
                if (!window.localStorage[app.dbKey]) {
                    app.reset();
                }
                app.load();

                return app;
            }])
        ;