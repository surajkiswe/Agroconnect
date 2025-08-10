package com.example.demo.entities;

import java.sql.Date;

public class SchemeWithStatusDTO {
    private int schemeid;
    private String schemename;
    private String eligibility;
    private String description;
    private Date startdate;
    private Date lastdate;
    private double income;
    private double landsize;

    // UI flags
    private boolean canApply;   // eligible by conditions
    private boolean applied;    // already applied by this farmer
    private int applicationStatus; // optional: 1 if applied

    // Getters & setters for all fields...
    // constructor (optional) or use setters
    // (Omitted here for brevity — generate with your IDE)
    public int getSchemeid() { return schemeid; }
    public void setSchemeid(int schemeid) { this.schemeid = schemeid; }
    public String getSchemename() { return schemename; }
    public void setSchemename(String schemename) { this.schemename = schemename; }
    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Date getStartdate() { return startdate; }
    public void setStartdate(Date startdate) { this.startdate = startdate; }
    public Date getLastdate() { return lastdate; }
    public void setLastdate(Date lastdate) { this.lastdate = lastdate; }
    public double getIncome() { return income; }
    public void setIncome(double income) { this.income = income; }
    public double getLandsize() { return landsize; }
    public void setLandsize(double landsize) { this.landsize = landsize; }
    public boolean isCanApply() { return canApply; }
    public void setCanApply(boolean canApply) { this.canApply = canApply; }
    public boolean isApplied() { return applied; }
    public void setApplied(boolean applied) { this.applied = applied; }
    public int getApplicationStatus() { return applicationStatus; }
    public void setApplicationStatus(int applicationStatus) { this.applicationStatus = applicationStatus; }
}
