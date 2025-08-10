package com.example.demo.repositories;

public class ProductRentalDummy {

	int prodid;
	int vid;
	double rateperday;
	public ProductRentalDummy() {
		super();
		
	}
	public ProductRentalDummy(int prodid, int vid, double rateperday) {
		super();
		this.prodid = prodid;
		this.vid = vid;
		this.rateperday = rateperday;
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
	public double getRateperday() {
		return rateperday;
	}
	public void setRateperday(double rateperday) {
		this.rateperday = rateperday;
	}
	
	
	
}
