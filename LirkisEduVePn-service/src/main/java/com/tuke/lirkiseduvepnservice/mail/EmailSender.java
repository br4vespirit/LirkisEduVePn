package com.tuke.lirkiseduvepnservice.mail;

public interface EmailSender {
    void send(String to, String name, String link);
}