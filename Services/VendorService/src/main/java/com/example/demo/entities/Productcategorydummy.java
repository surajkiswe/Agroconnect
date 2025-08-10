package com.example.demo.entities;

public class Productcategorydummy {

	int prodid;
	int cid;
	String pname;
	String pdescription;
	int bid;
	public Productcategorydummy() {
		super();
		
	}
	public Productcategorydummy(int cid, String pname, String pdescription, int bid) {
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
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
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
	public int getBid() {
		return bid;
	}
	public void setBid(int bid) {
		this.bid = bid;
	}
	
	
}
