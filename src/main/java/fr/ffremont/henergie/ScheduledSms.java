/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie;

import fr.ffremont.henergie.data.models.Notification;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 *
 * @author florent
 */
@Component
public class ScheduledSms {
    
    private final static Logger LOG = LoggerFactory.getLogger(ScheduledSms.class);
    
    @Autowired
    MongoTemplate mongoTpl;
    
    @Value("${octopush.userLogin}")
    private String userLogin;

    @Value("${octopush.apiKey}")
    private String apiKey;

    @Autowired
    @Qualifier("octopushClient")
    WebTarget octopushClient;    
    
     /**
     * 
     * @param msg 
     */
    private void sendSms(String msg, String notifyTo){
        Form form = new Form();
        form.param("user_login", userLogin);
        form.param("api_key", apiKey);
        form.param("sms_recipients", notifyTo);
        form.param("sms_text", msg);
        form.param("sms_mode", "1");
        form.param("sms_type", "XXX");
        form.param("transactional", "1");

        octopushClient.request(MediaType.APPLICATION_XML).post(Entity.entity(form, MediaType.APPLICATION_FORM_URLENCODED_TYPE));
    }
    
    @Scheduled(fixedDelay=60000)
    public void send(){
        LOG.info("ScheduledSms processing...");
        
        Query query = new Query();
        query.addCriteria(Criteria.where("scheduled").lte(Date.from(Instant.now())).gt(Date.from(Instant.now().minusSeconds(3600))));
        List<Notification> notifs = mongoTpl.findAllAndRemove(query, Notification.class);
        
        notifs.forEach((Notification notif) -> {
            this.sendSms(notif.getMessage(), notif.getNotify());
        });

    }
}
