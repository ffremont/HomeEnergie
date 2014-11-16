/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie.data.models;

import java.util.Date;

/**
 *
 * @author florent
 */
public class Radiateur {
    private String id;
    private String nom;
    private String piece;
    private int position;
    private String etat;
    
    /**
     * En watt
     */
    private int puissance;
   
    private Date dernierMiseEnRoute;
    private Date dernierArret;
    
    /**
     * En minute
     */
    private int derniereDuree;    
    
    /**
     * En minute
     */
    private int dureeEstimee;    
    private boolean enChauffe;  

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPiece() {
        return piece;
    }

    public void setPiece(String piece) {
        this.piece = piece;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public int getPuissance() {
        return puissance;
    }

    public void setPuissance(int puissance) {
        this.puissance = puissance;
    }

    public Date getDernierMiseEnRoute() {
        return dernierMiseEnRoute;
    }

    public void setDernierMiseEnRoute(Date dernierMiseEnRoute) {
        this.dernierMiseEnRoute = dernierMiseEnRoute;
    }

    public Date getDernierArret() {
        return dernierArret;
    }

    public void setDernierArret(Date dernierArret) {
        this.dernierArret = dernierArret;
    }

    public int getDerniereDuree() {
        return derniereDuree;
    }

    public void setDerniereDuree(int derniereDuree) {
        this.derniereDuree = derniereDuree;
    }

    public int getDureeEstimee() {
        return dureeEstimee;
    }

    public void setDureeEstimee(int dureeEstimee) {
        this.dureeEstimee = dureeEstimee;
    }

    public boolean isEnChauffe() {
        return enChauffe;
    }

    public void setEnChauffe(boolean enChauffe) {
        this.enChauffe = enChauffe;
    }
    
    
}
