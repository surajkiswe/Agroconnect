package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "productrental")
public class ProductRental {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int prorid;
	@OneToOne
	@JoinColumn(name = "prodid")
	Product prodid;
	@OneToOne
	@JoinColumn(name = "vid")
	Vendor vid;
	double rateperday;
	public ProductRental() {
		super();
	
	}
	public ProductRental(Product prodid, Vendor vid, double rateperday) {
		super();
		this.prodid = prodid;
		this.vid = vid;
		this.rateperday = rateperday;
	}
	public int getProrid() {
		return prorid;
	}
	public void setProrid(int prorid) {
		this.prorid = prorid;
	}
	public Product getProdid() {
		return prodid;
	}
	public void setProdid(Product prodid) {
		this.prodid = prodid;
	}
	public Vendor getVid() {
		return vid;
	}
	public void setVid(Vendor vid) {
		this.vid = vid;
	}
	public double getRateperday() {
		return rateperday;
	}
	public void setRateperday(double rateperday) {
		this.rateperday = rateperday;
	}
	
	
	
	

}
