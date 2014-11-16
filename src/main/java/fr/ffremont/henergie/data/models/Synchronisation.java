/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie.data.models;

import fr.ffremont.henergie.TimeStampAdapter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author florent
 */
@Document(collection = "synchronisations")
public class Synchronisation {

    /**
     * Date de la synchronisation
     */
    @XmlJavaTypeAdapter(TimeStampAdapter.class)
    private Date date;
    
    /**
     * Date de la dernière synchronisation
     */
    @XmlJavaTypeAdapter(TimeStampAdapter.class)
    private Date derniereSync;

    /**
     * Nom de l'application
     */
    private String appName;
    
    /**
     * Liste des notifs à prévoir
     */
    @Transient
    private ArrayList<Notification> notifications;

    /**
     * Liste des radiateurs
     */
    private ArrayList<Radiateur> radiateurs;

    /**
     * Liste des actions "stop"
     */
    @Transient
    private List<Stop> stopList;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    public Date getDerniereSync() {
        return derniereSync;
    }

    public void setDerniereSync(Date derniereSync) {
        this.derniereSync = derniereSync;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public ArrayList<Radiateur> getRadiateurs() {
        return radiateurs;
    }

    public void setRadiateurs(ArrayList<Radiateur> radiateurs) {
        this.radiateurs = radiateurs;
    }

    public List<Stop> getStopList() {
        return stopList;
    }

    public void setStopList(List<Stop> stopList) {
        this.stopList = stopList;
    }

    public ArrayList<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(ArrayList<Notification> notifications) {
        this.notifications = notifications;
    }
    
}
