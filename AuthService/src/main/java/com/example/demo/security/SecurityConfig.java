package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.filters.SecurityAuthenticationFilter;

@Configuration
public class SecurityConfig {
	
	@Bean
	SecurityAuthenticationFilter authFilter() {
		return new SecurityAuthenticationFilter();
	}


	@Bean
	SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {		
		http.csrf(csrf -> csrf.disable())
	    .addFilterBefore(authFilter(),UsernamePasswordAuthenticationFilter.class)
	    .authorizeHttpRequests(authorize -> authorize.requestMatchers("/register","/login","/public").permitAll())
	    .authorizeHttpRequests(authorize -> authorize.requestMatchers("/user/*").hasAuthority("user"))
	    .authorizeHttpRequests(authorize -> authorize.requestMatchers("/admin/*").hasAuthority("admin"));
		
		return http.build();	
	}
	
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService());
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}
	
	@Bean
	UserDetailsService userDetailsService() {
		return new UserDetailsServiceImple();
	}
	
	@Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
	
	
}
