// Farmer.java
package com.example.demo.entities;

import jakarta.persistence.*;


@Entity
@Table(name = "farmer")
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fid;

    private double landsize;
    private double income;

    @Column(name = "uid")
    private int uid;  // Foreign key to user table (no direct relation, handled via UID)

    @ManyToOne
    @JoinColumn(name = "locid")  // locid is FK from location table
    private Location location;

    // Getters and Setters
    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

	
}
