package com.example.demo.entities;

public class ProductVendorDummy {

	int prodid;
	int vid;
	double price;
	public ProductVendorDummy() {
		super();
		
	}
	public ProductVendorDummy(int prodid, int vid, double price) {
		super();
		this.prodid = prodid;
		this.vid = vid;
		this.price = price;
	}
	public int getProdid() {
		return prodid;
	}
	public void setProdid(int prodid) {
		this.prodid = prodid;
	}
	public int getVid() {
		return vid;
	}
	public void setVid(int vid) {
		this.vid = vid;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	
}
