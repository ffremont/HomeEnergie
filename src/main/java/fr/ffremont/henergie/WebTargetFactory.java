/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

/**
 *
 * @author florent
 */
public class WebTargetFactory {
    
    public WebTarget createInstance(String url){
        Client client = ClientBuilder.newClient();
        
        return client.target(url);
    }
    
    
}
