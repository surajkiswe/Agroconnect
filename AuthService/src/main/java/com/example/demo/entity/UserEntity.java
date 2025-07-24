package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;

//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	
	String username;
	
	String password;
	
	String mobileno;
	
	String email;
	
	String fname;
	
	String lname;
	
	boolean status;
	
	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public RoleEntity getRid() {
		return rid;
	}

	public void setRid(RoleEntity rid) {
		this.rid = rid;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "rid")
	@JsonIgnoreProperties("user")
	RoleEntity rid;

	public RoleEntity getrid() {
		return rid;
	}

	public void setrid(RoleEntity rid) {
		this.rid = rid;
	}

	public UserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public UserEntity(int uid, String username, String password, String mobileno, String email, String fname,
			String lname, RoleEntity rid) {
		super();
		this.uid = uid;
		this.username = username;
		this.password = password;
		this.mobileno = mobileno;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
		this.rid = rid;
	}
	
	
}