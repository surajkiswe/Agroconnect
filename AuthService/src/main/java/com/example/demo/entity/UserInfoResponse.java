package com.example.demo.entity;

//class - just to hold the response info
//clubbing of userid, role, token
public class UserInfoResponse {
	String username;
	String role;
	String accessToken;
	public UserInfoResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserInfoResponse(String username, String role, String accessToken) {
		super();
		this.username = username;
		this.role = role;
		this.accessToken = accessToken;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	
	

	

}
