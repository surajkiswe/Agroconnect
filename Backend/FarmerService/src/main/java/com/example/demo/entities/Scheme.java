package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "schemes")
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int schemeid;

    private String schemename;
    private String eligibility;
    private String description;
    private double income;
    private double landsize;
    private int gid; 

    private java.sql.Date startdate;
    private java.sql.Date lastdate;

    // Getters and Setters
    
    public int getSchemeid() { return schemeid; }
    public double getIncome() {
		return income;
	}
	public void setIncome(double income) {
		this.income = income;
	}
	public double getLandsize() {
		return landsize;
	}
	public void setLandsize(double landsize) {
		this.landsize = landsize;
	}
	public int getGid() {
		return gid;
	}
	public void setGid(int gid) {
		this.gid = gid;
	}
	public void setSchemeid(int schemeid) { this.schemeid = schemeid; }

    public String getSchemename() { return schemename; }
    public void setSchemename(String schemename) { this.schemename = schemename; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }


    public java.sql.Date getStartdate() { return startdate; }
    public void setStartdate(java.sql.Date startdate) { this.startdate = startdate; }

    public java.sql.Date getLastdate() { return lastdate; }
    public void setLastdate(java.sql.Date lastdate) { this.lastdate = lastdate; }
}

