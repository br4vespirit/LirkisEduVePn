package com.tuke.lirkiseduvepnservice.mail;

/**
 * Interface of an email sender which defines a method to send message
 */
public interface EmailSender {

    /**
     * Method to send a message to a specific mail address
     *
     * @param to   mail address of a user
     * @param name name + surname of a user as a concatenated string
     * @param link link with confirmation token as request parameter which is catching in AuthenticationController endpoint
     */
    void send(String to, String name, String link);
}
