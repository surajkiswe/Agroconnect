// FarmerDTO.java
package com.example.demo.entities;

public class FarmerDTO {

    private double landsize;
    private double income;
    private int uid;           // Refers to user ID
    private String locname;    // Name of the location (e.g., "Nagpur")

    // Getters and Setters
    public double getLandsize() {
        return landsize;
    }

    public void setLandsize(double landsize) {
        this.landsize = landsize;
    }

    public double getIncome() {
        return income;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getLocname() {
        return locname;
    }

    public void setLocname(String locname) {
        this.locname = locname;
    }
}
