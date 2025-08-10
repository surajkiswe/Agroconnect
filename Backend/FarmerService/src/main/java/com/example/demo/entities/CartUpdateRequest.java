package com.example.demo.entities;

public class CartUpdateRequest {
    private Integer quantity;

    // You can add more fields here if you want to update other things, e.g. durationDays

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
