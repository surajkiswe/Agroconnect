package com.example.demo.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import com.example.demo.entity.UserEntity;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtils {

	 @Value("${jwt.secret}")
	  private String jwtSecret;

	  @Value("${jwt.jwtExpirationInMs}")
	  private int jwtExpirationMs; 	 
		 
	 
	public String getUserNameFromJwtToken(String token) {
			  return Jwts.parser().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
		
		 
		    //return Jwts.parser().setSigningKey(key()).build()
		        //.parseClaimsJws(token).getBody().getSubject(); 
		     //return Jwts.parser().setSigningKey(jwtSecret).build().parseClaimsJws(token).getBody().getSubject();
	  }
		  
		  private Key key() {
		    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
		  }

		  public boolean validateJwtToken(String authToken) {
			  System.out.println(authToken);
		    try {
		      Jwts.parser().setSigningKey(key()).build().parseClaimsJws(authToken);
		      return true;
		    } catch (Exception e) {
		    	e.printStackTrace();
		    }

		    return false;
		  }
		  
		  public String generateTokenFromUsername(String username) { 
			  System.out.println(username);
		    return Jwts.builder()
		              .setSubject(username)
		              .setIssuedAt(new Date())
		              .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
		              .signWith(key(), SignatureAlgorithm.HS256)
		              .compact();
		  }
		  
		  public Boolean validateToken(String token, UserDetails userDetails) {
		        final String username = getUserNameFromJwtToken(token);
		        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
		    }

		  private Boolean isTokenExpired(String token) {
		        return extractExpiration(token).before(new Date());
		    }
		  
		  public Date extractExpiration(String token) {
		        return extractClaim(token, Claims::getExpiration);
		    }

		    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		        final Claims claims = extractAllClaims(token);
		        return claimsResolver.apply(claims);
		    }

		    private Claims extractAllClaims(String token) {
		        return Jwts
		                .parser()
		                .setSigningKey(getSignKey())
		                .build()
		                .parseClaimsJws(token)
		                .getBody();
		    }
		    private Key getSignKey() {
		        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
		        return Keys.hmacShaKeyFor(keyBytes);
		    }
}
