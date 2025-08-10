package com.example.demo.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartid;

    private Integer fid; // Farmer ID (FK)

    private Integer quantity = 1;

    @Column(name="duration_days")
    private Integer durationDays; // For rentals only

    private Integer pvid; // Vendor product ID (nullable)

    private Integer prorid; // Rental product ID (nullable)

    private Double price; // Price per unit

    private LocalDateTime addedDate = LocalDateTime.now();

    // Getters & Setters
    public Integer getCartid() {
        return cartid;
    }

    public void setCartid(Integer cartid) {
        this.cartid = cartid;
    }

    public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public Integer getPvid() {
        return pvid;
    }

    public void setPvid(Integer pvid) {
        this.pvid = pvid;
    }

    public Integer getProrid() {
        return prorid;
    }

    public void setProrid(Integer prorid) {
        this.prorid = prorid;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDateTime getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDateTime addedDate) {
        this.addedDate = addedDate;
    }
}
