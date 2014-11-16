/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie.data.models;

import fr.ffremont.henergie.TimeStampAdapter;
import java.util.Date;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author florent
 */
@Document(collection = "stop")
public class Stop {

    @Id
    private String id;
    
    @XmlJavaTypeAdapter(TimeStampAdapter.class)
    private Date dateArret;
    
    private int dureeMin;
    private int puissanceWatt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDateArret() {
        return dateArret;
    }

    public void setDateArret(Date dateArret) {
        this.dateArret = dateArret;
    }

    public int getDureeMin() {
        return dureeMin;
    }

    public void setDureeMin(int dureeMin) {
        this.dureeMin = dureeMin;
    }

    public int getPuissanceWatt() {
        return puissanceWatt;
    }

    public void setPuissanceWatt(int puissanceWatt) {
        this.puissanceWatt = puissanceWatt;
    }

}
