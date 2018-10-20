// Java program to send email 

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;
import javax.mail.Session;
import javax.mail.Transport;


public class SendEmail
{

    public static void main(String [] args)
    {

        //CONFIDENTIAL AUTHENTIFICATION INFORMATION DELETED

        Authenticator authenticator = new Authenticator()
        {
            @Override
            protected PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication(smtpAuthUserName, smtpAuthPassword);
            }
        };
        // Getting system properties
        Properties properties = System.getProperties();

        // Setting up mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");

        // creating session object to get properties
        Session session = Session.getInstance(properties,authenticator);

        try
        {
            // MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From Field: adding senders email to from field.
            message.setFrom(new InternetAddress(sender));

            // Set To Field: adding recipient's email to from field.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));

            // Set Subject: subject of the email
            message.setSubject("Fire Alert Update");

            // set body of the email.
            message.setText("This is an incoming fire alert. \n A fire has been detected in your proximity.");

            // Send email.
            Transport.send(message);
            System.out.println("Mail successfully sent");
        }
        catch (MessagingException mex)
        {
            mex.printStackTrace();
        }
    }
} 
