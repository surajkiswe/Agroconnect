package com.example.demo.entities;

import java.util.List;
import com.example.demo.entities.OrderMaster;
import com.example.demo.entities.Payment;

public class OrderWithPaymentDTO {
    private OrderMaster order;
    private List<Payment> payments;

    public OrderWithPaymentDTO(OrderMaster order, List<Payment> payments) {
        this.order = order;
        this.payments = payments;
    }

    public OrderMaster getOrder() {
        return order;
    }

    public void setOrder(OrderMaster order) {
        this.order = order;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }
}
