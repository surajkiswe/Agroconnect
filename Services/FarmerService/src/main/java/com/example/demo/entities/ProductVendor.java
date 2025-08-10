package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "productvendor")
public class ProductVendor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int pvid;
	@OneToOne
	@JoinColumn(name = "prodid")
	Product prodid;
	@OneToOne
	@JoinColumn(name = "vid")
	Vendor vid;
	double price;
	public ProductVendor() {
		super();
		
	}
	public ProductVendor(Product prodid, Vendor vid, double price) {
		super();
		this.prodid = prodid;
		this.vid = vid;
		this.price = price;
	}
	public int getPvid() {
		return pvid;
	}
	public void setPvid(int pvid) {
		this.pvid = pvid;
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
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	
	
}
