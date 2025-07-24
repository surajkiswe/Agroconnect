package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;

public class UserDetailsServiceImple implements UserDetailsService {
	@Autowired
	UserRepository urepo;	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		   UserEntity u = urepo.getUserWithUsername(username);
		   UserDetails udetails = UserDetailsImple.build(u);
		   return udetails;		
	}

}
