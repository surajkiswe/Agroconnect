package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "productrental")
public class ProductRental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int prorid;

    @ManyToOne
    @JoinColumn(name = "prodid")
    @JsonIgnoreProperties("productrentals")
    Product product;

    @OneToOne
    @JoinColumn(name = "vid")
    Vendor vendor;

    double rateperday;

    // Constructors
    public ProductRental() {}

    public ProductRental(Product product, Vendor vendor, double rateperday) {
        this.product = product;
        this.vendor = vendor;
        this.rateperday = rateperday;
    }

    // Getters and setters
    public int getProrid() {
        return prorid;
    }
    public void setProrid(int prorid) {
        this.prorid = prorid;
    }

    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }

    public Vendor getVendor() {
        return vendor;
    }
    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public double getRateperday() {
        return rateperday;
    }
    public void setRateperday(double rateperday) {
        this.rateperday = rateperday;
    }
}
