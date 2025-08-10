package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int prodid;
	
	@JoinColumn(name = "cid")
	int cid;
	
	String pname;
	String pdescription;
	@ManyToOne
	@JoinColumn(name = "bid")
	@JsonIgnoreProperties("products")
	Brands bid;
	
	
	public Product() {
		super();
	}
	
	public Product(int cid, String pname, String pdescription, Brands bid) {
		super();
		this.cid = cid;
		this.pname = pname;
		this.pdescription = pdescription;
		this.bid = bid;
	}

	public int getProdid() {
		return prodid;
	}
	public void setProdid(int prodid) {
		this.prodid = prodid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getPdescription() {
		return pdescription;
	}
	public void setPdescription(String pdescription) {
		this.pdescription = pdescription;
	}
	public Brands getBid() {
		return bid;
	}
	public void setBid(Brands bid) {
		this.bid = bid;
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	
	
	
	
	

}
