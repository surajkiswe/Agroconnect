package com.example.demo.entities;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "brands")
public class Brands {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int bid;
	
	String bname;

	@ManyToOne
	@JoinColumn(name = "cid")
	@JsonIgnoreProperties("brands")
	Category cid;
	
	@OneToMany(mappedBy = "bid",cascade = CascadeType.ALL)
	@JsonIgnoreProperties("bid")
	List<Product> products; 
	
	

	public Brands() {
		super();
		
	}

	public Brands(String bname, Category cid) {
		super();
		this.bname = bname;
		this.cid = cid;
	}

	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public String getBname() {
		return bname;
	}

	public void setBname(String bname) {
		this.bname = bname;
	}

	public Category getCid() {
		return cid;
	}

	public void setCid(Category cid) {
		this.cid = cid;
	}
	
	
	
	
	
	
	
}
