package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vid;

    private String liscenceno;
    private String companyname;

    @Column(name = "uid")
    private int uid; // Foreign key to User table

    // Getters and Setters
    public int getVid() {
        return vid;
    }

    public void setVid(int vid) {
        this.vid = vid;
    }

    public String getLiscenceno() {
        return liscenceno;
    }

    public void setLiscenceno(String liscenceno) {
        this.liscenceno = liscenceno;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }
}
