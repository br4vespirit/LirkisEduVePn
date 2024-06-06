package com.tuke.lirkiseduvepnservice.config;

import com.tuke.lirkiseduvepnservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Properties;

/**
 * Configuration class with beans that will be injected in other services, controllers and configuration classes.
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    /**
     * JPA repository that manages users table
     */
    private final UserRepository userRepository;


    /**
     * Bean of an UserDetailsServer type which implements loadUserByUsername() method to retrieve a user by a specific value
     * as email or username
     *
     * @return user details service object with custom loadUserByUsername() method
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


    /**
     * Bean of an AuthenticationProvider type that is used to create a custom Authentication Provider or use some prepared
     *
     * @return DaoAuthenticationProvider instance with password encoder and user details service
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }


    /**
     * Bean of an AuthenticationManager type that is used to authenticate user
     *
     * @param config configuration for an Authentication
     * @return authentication manager instance
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    /**
     * Bean of an PasswordEncoder type that is used to encrypt and hash passwords
     *
     * @return BcryptPasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    /**
     * Bean of an JavaMailSender that is used to send email for a specific user
     *
     * @return JavaMailSender instance with custom configuration
     */
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("ddmygames08@gmail.com");
        mailSender.setPassword("SECRET");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

}
