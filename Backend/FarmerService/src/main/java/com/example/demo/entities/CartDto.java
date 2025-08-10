package com.example.demo.entities;

public class CartDto {
    private String added_date;      // ISO string date
    private Integer duration_days;
    private Integer fid;
    private Double price;
    private Integer prorid;
    private Integer pvid;
    private Integer quantity;

    // getters and setters
    public String getAdded_date() { return added_date; }
    public void setAdded_date(String added_date) { this.added_date = added_date; }

    public Integer getDuration_days() { return duration_days; }
    public void setDuration_days(Integer duration_days) { this.duration_days = duration_days; }

    public Integer getFid() { return fid; }
    public void setFid(Integer fid) { this.fid = fid; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getProrid() { return prorid; }
    public void setProrid(Integer prorid) { this.prorid = prorid; }

    public Integer getPvid() { return pvid; }
    public void setPvid(Integer pvid) { this.pvid = pvid; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
