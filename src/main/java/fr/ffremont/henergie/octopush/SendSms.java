/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie.octopush;

/**
 *
 * @author florent
 */
public class SendSms {
    private String user_login;
    private String api_key;
    private String sms_recipients;
    private String sms_text;
    private int sms_mode;
    private String sms_type;
    private int transactional;
    
    public SendSms(){
        this.sms_mode = 1;
        this.sms_type = "XXX";
        this.transactional = 1;
    }

    public SendSms(String user_login, String api_key, String sms_recipients, String sms_text) {
        this();
        this.user_login = user_login;
        this.api_key = api_key;
        this.sms_recipients = sms_recipients;
        this.sms_text = sms_text;
    }
    
    public void send(){
        
    }

    public String getUser_login() {
        return user_login;
    }

    public void setUser_login(String user_login) {
        this.user_login = user_login;
    }

    public String getApi_key() {
        return api_key;
    }

    public void setApi_key(String api_key) {
        this.api_key = api_key;
    }

    public String getSms_recipients() {
        return sms_recipients;
    }

    public void setSms_recipients(String sms_recipients) {
        this.sms_recipients = sms_recipients;
    }

    public String getSms_text() {
        return sms_text;
    }

    public void setSms_text(String sms_text) {
        this.sms_text = sms_text;
    }

    public int getSms_mode() {
        return sms_mode;
    }

    public void setSms_mode(int sms_mode) {
        this.sms_mode = sms_mode;
    }

    public String getSms_type() {
        return sms_type;
    }

    public void setSms_type(String sms_type) {
        this.sms_type = sms_type;
    }

    public int getTransactional() {
        return transactional;
    }

    public void setTransactional(int transactional) {
        this.transactional = transactional;
    }
    
    
}
