package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "appliedscheme")
public class AppliedScheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid;

    private int gid;
    private int fid;
    private int schemeid; // newly added column
    private int status; // tinyint in DB, use int here for simplicity

    // Getters & Setters
    public int getAid() { return aid; }
    public void setAid(int aid) { this.aid = aid; }

    public int getGid() { return gid; }
    public void setGid(int gid) { this.gid = gid; }

    public int getFid() { return fid; }
    public void setFid(int fid) { this.fid = fid; }

    public int getSchemeid() { return schemeid; }
    public void setSchemeid(int schemeid) { this.schemeid = schemeid; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
}
