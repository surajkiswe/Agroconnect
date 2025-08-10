package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prodid;

    @ManyToOne
    @JoinColumn(name = "bid")  // Foreign key column in product table referencing brand
    @JsonIgnoreProperties("products")  // Avoid infinite recursion
    private Brand brand;  // singular Brand

    private int cid;  // category id

    private String pname;
    private String pdescription;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties("product")
    private List<ProductVendor> productvendors;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties("product")
    private List<ProductRental> productrentals;

    public Product() {}
    
    public Product(int cid, String pname, String pdescription, Brand brand) {
        this.cid = cid;
        this.pname = pname;
        this.pdescription = pdescription;
        this.brand = brand;
    }


    public int getProdid() {
        return prodid;
    }
    public void setProdid(int prodid) {
        this.prodid = prodid;
    }

    public Brand getBrand() {
        return brand;
    }
    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public int getCid() {
        return cid;
    }
    public void setCid(int cid) {
        this.cid = cid;
    }

    public String getPname() {
        return pname;
    }
    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPdescription() {
        return pdescription;
    }
    public void setPdescription(String pdescription) {
        this.pdescription = pdescription;
    }

    public List<ProductVendor> getProductvendors() {
        return productvendors;
    }
    public void setProductvendors(List<ProductVendor> productvendors) {
        this.productvendors = productvendors;
    }

    public List<ProductRental> getProductrentals() {
        return productrentals;
    }
    public void setProductrentals(List<ProductRental> productrentals) {
        this.productrentals = productrentals;
    }
}
