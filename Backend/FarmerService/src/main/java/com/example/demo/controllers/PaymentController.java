package com.example.demo.controllers;

import com.example.demo.entities.Payment;
import com.example.demo.services.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/farmer/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Create new payment (called when Pay button clicked)
    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody Payment paymentRequest) {
        if (paymentRequest == null || paymentRequest.getOrderid() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payment request");
        }

        Payment savedPayment = paymentService.savePayment(paymentRequest);

        if (savedPayment != null) {
            return ResponseEntity.ok("Payment successful! Transaction ID: " + savedPayment.getTransactionId());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process payment");
        }
    }

    // Update payment status for existing payment
    @PutMapping("/update/{orderId}")
    public ResponseEntity<String> updatePaymentStatus(
            @PathVariable Integer orderId,
            @RequestBody Payment paymentRequest) {

        if (paymentRequest == null || paymentRequest.getPaymentstatus() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payment request");
        }

        boolean updated = paymentService.updatePayment(orderId,
                paymentRequest.getPaymentstatus(),
                paymentRequest.getTransactionId());
        if (updated) {
            return ResponseEntity.ok("Payment updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
    }
}
