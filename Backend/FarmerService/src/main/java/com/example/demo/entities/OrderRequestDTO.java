package com.example.demo.entities;

public class OrderRequestDTO {
    private Integer cartId;   // or productId, qty etc., whatever you send
    private Integer fid;
    private String address;   // New field

    public Integer getCartId() {
        return cartId;
    }
    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Integer getFid() {
        return fid;
    }
    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
}
