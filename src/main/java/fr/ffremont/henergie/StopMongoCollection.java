/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie;

import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 *
 * @author florent
 */
public class StopMongoCollection {
    
    @Value("mongo.db")
    private String db;
    
    @Value("mongo.collections.stop")
    private String collecton;
    
    private MongoClient client;
    
    public DBCollection getCollection(){
        return client.getDB(db).getCollection(collecton);
    }

    public String getDb() {
        return db;
    }

    public void setDb(String db) {
        this.db = db;
    }

    public String getCollecton() {
        return collecton;
    }

    public void setCollecton(String collecton) {
        this.collecton = collecton;
    }

    public MongoClient getClient() {
        return client;
    }

    public void setClient(MongoClient client) {
        this.client = client;
    }
    
    
}
