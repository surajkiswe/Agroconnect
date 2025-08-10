package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "orderdetails")
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderdetailid;

    private Integer pvid;    // product vendor id (nullable)
    private Integer prorid;  // product rental id (nullable)
    private Integer quantity;
    private Integer durationdays;
    private Double priceperunit;
    private Double subtotal;
    private Integer vid;     // vendor id
    private Double price;

    // Many order details belong to one OrderMaster
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderid") // FK column in orderdetails table
    @JsonBackReference 
    private OrderMaster orderMaster;

    // Getters and setters

    public Integer getOrderdetailsid() {
        return orderdetailid;
    }

    public void setOrderdetailsid(Integer orderdetailid) {
        this.orderdetailid = orderdetailid;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getDurationdays() {
        return durationdays;
    }

    public void setDurationdays(Integer durationdays) {
        this.durationdays = durationdays;
    }

    public Double getPriceperunit() {
        return priceperunit;
    }

    public void setPriceperunit(Double priceperunit) {
        this.priceperunit = priceperunit;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Integer getVid() {
        return vid;
    }

    public void setVid(Integer vid) {
        this.vid = vid;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public OrderMaster getOrderMaster() {
        return orderMaster;
    }

    public void setOrderMaster(OrderMaster orderMaster) {
        this.orderMaster = orderMaster;
    }
}
