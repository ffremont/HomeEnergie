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
@Document(collection = "notifications")
public class Notification {
    
    @Id
    private String id;
    
    /**
     * Programmé
     */
    @XmlJavaTypeAdapter(TimeStampAdapter.class)
    private Date scheduled;
    
    /**
     * Envoyé à
     */
    private String notify;
    
    /**
     * Contenu
     */
    private String message;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public Date getScheduled() {
        return scheduled;
    }

    public void setScheduled(Date scheduled) {
        this.scheduled = scheduled;
    }

    public String getNotify() {
        return notify;
    }

    public void setNotify(String notify) {
        this.notify = notify;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
    
    
}
