/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.ffremont.henergie;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.xml.bind.annotation.adapters.XmlAdapter;

/**
 *
 * @author florent
 */
public class TimeStampAdapter  extends XmlAdapter<String, Date> {

    @Override
    public String marshal(Date v) throws Exception {
        return String.valueOf(v.getTime());
    }

    @Override
    public Date unmarshal(String v) throws Exception {
        return (new Date(Long.valueOf(v)));
    }
}
