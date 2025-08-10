package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "productvendor")
public class ProductVendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int pvid;

    @ManyToOne
    @JoinColumn(name = "prodid")
    @JsonIgnoreProperties("productvendors")
    Product product;

    @OneToOne
    @JoinColumn(name = "vid")
    Vendor vendor;

    double price;

    // Constructors
    public ProductVendor() {}

    public ProductVendor(Product product, Vendor vendor, double price) {
        this.product = product;
        this.vendor = vendor;
        this.price = price;
    }

    // Getters and setters
    public int getPvid() {
        return pvid;
    }
    public void setPvid(int pvid) {
        this.pvid = pvid;
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

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
}
