package com.tuke.lirkiseduvepnservice.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service layer class to implement business logic of methods which are linked with JWT token
 */
@Service
public class JwtService {

    /**
     * Secret for creating end decoding JWT token
     */
    @Value("${jwt.secret}")
    private String secret;


    /**
     * Expiration of a JWT token
     */
    @Value("${jwt.expiration}")
    private Long expiration;


    /**
     * Method to extract all claims from a JWT token
     *
     * @param token token to be decoded
     * @return Claims of decoded JWT token
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    /**
     * Method to extract user email address from a JWT token
     *
     * @param token JWT token to be decoded
     * @return extracted user email address
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }


    /**
     * Method to extract expiration time from a JWT token
     *
     * @param token JWT token to be decoded
     * @return extracted JWT token expiration time
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    /**
     * Method that extracts all claims and then with a claimsResolver extracts requested parameter
     *
     * @param token          JWT token to be decoded
     * @param claimsResolver function to get a specific field from a Claims object
     * @param <T>            type of field to be extracted from a JWT token
     * @return extracted parameter
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }


    /**
     * Method to get JWT signing key as Key class
     *
     * @return signing key as Key instance
     */
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    /**
     * Method to generate JWT token without extra claims
     *
     * @param userDetails object that contains user authentication data
     * @return newly generated JWT token
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }


    /**
     * Method to generate a JWT token with som extra claims and UserDetails instance
     *
     * @param extraClaims additional data to be added to a JWT claims
     * @param userDetails object that contains user authentication data
     * @return newly generated JWT token
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    /**
     * Method that validates whether a JWT token is valid or not
     *
     * @param token       token to be validated
     * @param userDetails object that contains user authentication data
     * @return true if JWT token is valid otherwise false
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }


    /**
     * Method that checks whether a JWT token is expired or not
     *
     * @param token token to be checked
     * @return true if JWT token is expired otherwise false
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
