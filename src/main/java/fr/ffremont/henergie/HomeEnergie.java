/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie;

import fr.ffremont.henergie.data.models.Notification;
import fr.ffremont.henergie.data.models.Stop;
import fr.ffremont.henergie.data.models.Synchronisation;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

/**
 *
 * @author florent
 */
@Component
@Path("home-energie")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class HomeEnergie {

    private final static Logger LOG = LoggerFactory.getLogger(HomeEnergie.class);

    @Autowired
    MongoTemplate mongoTpl;

    @POST
    @Path("notification")
    public Response postNotifications(ArrayList<Notification> notifs) {
        if (notifs.size() > 0) {
            mongoTpl.insertAll(notifs);
            LOG.info("Push de la liste des 'notifications' : " + notifs.size());
        }

        return Response.ok().build();
    }

    @POST
    @Path("stop")
    public Response postStop(ArrayList<Stop> stopList) {
        if (stopList.size() > 0) {
            mongoTpl.insertAll(stopList);
            LOG.info("Push de la liste des 'stop' : " + stopList.size());
        }

        return Response.ok().build();
    }

    @POST
    @Path("synchronisation")
    public Response postSynchro(Synchronisation synchro) {
        // on veut la dernière sync ayant une dernièreSync > 
        Query query = new Query();
        if (synchro.getDerniereSync() != null) {
            LOG.debug("Recherche avec la derniereSync : "+synchro.getDerniereSync());
            query.addCriteria(Criteria.where("derniereSync").gt(synchro.getDerniereSync()));
        }
        query.with(new Sort(Sort.Direction.DESC, "date"));
        query.limit(3);

        Synchronisation lastSync = mongoTpl.findOne(query, Synchronisation.class);

        if (synchro.getStopList().size() > 0) {
            mongoTpl.insertAll(synchro.getStopList());
            LOG.info("Synchronisation de la liste des 'stop' : " + synchro.getStopList().size());
        }

        if (synchro.getStopList().size() > 0) {
            mongoTpl.insertAll(synchro.getNotifications());
            LOG.info("Synchronisation de la liste des 'notifications' : " + synchro.getNotifications().size());
        }

        // si NULL => je suis le + récent car je ne trouve rien de plus "frais"
        if (lastSync == null) {
            mongoTpl.insert(synchro);
            LOG.info("Enregistrement de la synchronisation");
        }else{
            LOG.debug("Retour de la dernière synchro");
        }

        return Response.ok().entity(lastSync).build();
    }

}
