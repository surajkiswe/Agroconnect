package com.example.demo.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.entity.UserEntity;

public class UserDetailsImple implements UserDetails {
	int uid;
	String username;
	String password;
	List<GrantedAuthority> authorities;
	boolean status;
	
	
 
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {		
		return authorities;
	}

	
	public String getPassword() {		
		return password;
	}
	
	public String getUsername() {		
		return username;
	}	
	
	public UserDetailsImple() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserDetailsImple(int uid, String username, String password, List<GrantedAuthority> authorities,
			boolean status) {
		super();
		this.uid = uid;
		this.username = username;
		this.password = password;
		this.authorities = authorities;
		this.status = status;
	}


	public static UserDetails build(UserEntity u) {
		List<GrantedAuthority> authorities = new ArrayList<>();		
		authorities.add(new SimpleGrantedAuthority(u.getRid().getRname()));
		return new UserDetailsImple(u.getUid(), u.getUsername(), u.getPassword(), authorities , u.isStatus());
	}

}
