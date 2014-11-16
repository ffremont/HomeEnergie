'use strict';

angular.module('myApp.data.radiateur', ['myApp.config'])
        .factory('RadiateurFactory', ['HM', function (HM) {
                function Radiateur(data) {
                    this.id = data.id;
                    this.nom = data.nom;
                    this.piece = data.piece;
                    this.position = data.position || 0;
                    this.etat = data.etat || null;
                    this.puissance = data.puissance || 2000; // watt

                    /*this.notification = data.notification || null;*/

                    this.dernierMiseEnRoute = data.dernierMiseEnRoute || null; // milli s
                    this.dernierArret = data.dernierArret || null; // milli s
                    this.derniereDuree = null; // min
                    this.dureeEstimee = 0; // min

                    this.enChauffe = data.enChauffe || false;
                }
                Radiateur.ETAT = {
                    PROG: "01",
                    HORS_GEL: "03",
                    CONF: "02"
                };

                Radiateur.prototype.cout = function () {
                    var deltaSec = ((new Date()).getTime() - this.dernierMiseEnRoute) / 1000, min = null, h = null, reste = null;

                    var heure = deltaSec / 3600;
                    var consoWatt = (this.puissance * heure) / 1000; // KWatt

                    return parseFloat(consoWatt * HM).toFixed(2);
                };
                Radiateur.prototype.stop = function () {
                    var deltaSec = ((new Date()).getTime() - this.dernierMiseEnRoute) / 1000;

                    this.dernierArret = (new Date()).getTime();
                    this.derniereDuree = Math.round(deltaSec / 60);
                    this.enChauffe = false;
                };
                Radiateur.prototype.libelle = function () {
                    return this.piece;
                };
                Radiateur.prototype.lblEtat = function () {
                    var lbl = "Inactif";
                    switch (this.etat) {
                        case Radiateur.ETAT.CONF :
                            lbl = "Confort";
                            break;
                        case Radiateur.ETAT.PROG :
                            lbl = "Programmé";
                            break;
                        case Radiateur.ETAT.HORS_GEL:
                            lbl = "Hors gel";
                            break;
                    }

                    return lbl;
                };
                Radiateur.prototype.duree = function () {
                    var libelle = "";
                    if (this.enChauffe) {
                        if (this.dernierMiseEnRoute) {
                            var deltaSec = (new Date()).getTime() - (this.dernierMiseEnRoute), min = null, h = null, reste = null;
                            deltaSec = deltaSec / 1000;
                            h = Math.floor(deltaSec / 3600);
                            h = h < 10 ? "0" + h : h;
                            reste = deltaSec % 3600;
                            min = Math.floor(reste / 60);
                            min = min < 10 ? "0" + min : min;
                            libelle = ' ' + h + 'h' + min + 'm';
                        } else {
                            libelle = " ?? ";
                        }
                    }

                    return libelle;
                };
                Radiateur.prototype.bootCls = function (prefix) {
                    var cls = prefix + "info";

                    if (this.enChauffe) {
                        cls = prefix + "danger";
                    } else {
                        if (this.estInactif()) {
                            cls = prefix + "default";
                        } else {
                            if (this.dernierArret) {
                                var time = this.dernierArret, now = (new Date()).getTime();

                                if ((now - time) < 1800000) {
                                    cls = prefix + "warning";
                                }
                            }
                        }
                    }
                    return cls;
                };
                Radiateur.prototype.estInactif = function () {
                    return this.etat === Radiateur.ETAT.HORS_GEL;
                };



                return Radiateur;
            }])
        .service('RadiateurService', ['RadiateurFactory', function (RadiateurFactory) {
                this.liste = [new RadiateurFactory({
                        id: "A",
                        nom: 'Rad. couloir',
                        piece: 'Salon',
                        etat: RadiateurFactory.ETAT.PROG,
                        enChauffe: false,
                        puissance : 2000,
                        dernierMiseEnRoute: (new Date()).getTime()
                    }), new RadiateurFactory({
                        id: "B",
                        nom: 'Rad. cuisine',
                        piece: 'Cuisine',
                        puissance : 2000,
                        etat: RadiateurFactory.ETAT.PROG,
                        dernierMiseEnRoute: ((new Date()).getTime() - 1000)
                    }), new RadiateurFactory({
                        id: "C",
                        nom: 'Rad. couloir',
                        piece: 'Couloir',
                        puissance : 750,
                        etat: RadiateurFactory.ETAT.PROG
                    }), new RadiateurFactory({
                        id: "D",
                        nom: 'Rad. Chambre amis',
                        piece: 'Chambre amis',
                        puissance : 1250,
                        etat: RadiateurFactory.ETAT.PROG
                    }), new RadiateurFactory({
                        id: "E",
                        nom: 'Chauffe serviette',
                        piece: 'Salle de bain',
                        puissance : 3000,
                        etat: RadiateurFactory.ETAT.PROG
                    }), new RadiateurFactory({
                        id: "F",
                        nom: 'Chambre parents',
                        piece: 'Chambre parents',
                        puissance : 1250,
                        etat: RadiateurFactory.ETAT.PROG
                    }), new RadiateurFactory({
                        id: "G",
                        nom: 'Chambre Célia',
                        piece: 'Chambre Célia',
                        puissance : 1250,
                        etat: RadiateurFactory.ETAT.PROG
                    })];
            }]);