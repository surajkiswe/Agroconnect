package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Payment;
import com.example.demo.services.PaymentService;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/add")
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.save(payment);
    }

    @GetMapping("/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAll();
    }

    @GetMapping("/getbyid/{id}")
    public Payment getPayment(@PathVariable int id) {
        return paymentService.getById(id);
    }
}
