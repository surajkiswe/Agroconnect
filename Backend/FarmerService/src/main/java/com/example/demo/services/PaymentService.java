package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.OrderMaster;
import com.example.demo.entities.Payment;
import com.example.demo.repositories.OrderMasterRepository;
import com.example.demo.repositories.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderMasterRepository orderMasterRepository;

    // Generate unique transaction ID
    private String generateTransactionId() {
        return UUID.randomUUID().toString();
    }

    @Transactional
    public boolean updatePayment(Integer orderId, String paymentStatus, String transactionId) {
        List<Payment> payments = paymentRepository.findByOrderid(orderId);

        if (payments.isEmpty()) {
            return false;  // No payment found for orderId
        }

        for (Payment payment : payments) {
            payment.setPaymentstatus(paymentStatus);

            // Generate transaction ID if not provided or empty
            if (transactionId == null || transactionId.isBlank()) {
                transactionId = generateTransactionId();
            }
            payment.setTransactionId(transactionId);

            // Set payment date if status is COMPLETED and date not set yet
            if ("COMPLETED".equalsIgnoreCase(paymentStatus) && payment.getPaymentDate() == null) {
                payment.setPaymentDate(LocalDate.now());
            }

            paymentRepository.save(payment);
        }

        // Update order payment status accordingly
        Optional<OrderMaster> orderOpt = orderMasterRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            OrderMaster order = orderOpt.get();
            switch (paymentStatus.toUpperCase()) {
                case "COMPLETED":
                    order.setPaymentstatus("PAID");
                    break;
                case "FAILED":
                    order.setPaymentstatus("PAYMENT_FAILED");
                    break;
                default:
                    order.setPaymentstatus(paymentStatus.toUpperCase());
            }
            orderMasterRepository.save(order);
        }

        return true;
    }

    @Transactional
    public Payment savePayment(Payment payment) {
        // Generate transaction ID if not provided
        if (payment.getTransactionId() == null || payment.getTransactionId().isBlank()) {
            payment.setTransactionId(generateTransactionId());
        }

        // Set payment date if status is COMPLETED and date is not set
        if ("COMPLETED".equalsIgnoreCase(payment.getPaymentstatus()) && payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDate.now());
        }

        // Save payment entity
        Payment savedPayment = paymentRepository.save(payment);

        // Update order payment status accordingly
        Optional<OrderMaster> orderOpt = orderMasterRepository.findById(payment.getOrderid());
        if (orderOpt.isPresent()) {
            OrderMaster order = orderOpt.get();
            switch (payment.getPaymentstatus().toUpperCase()) {
                case "COMPLETED":
                    order.setPaymentstatus("PAID");
                    break;
                case "FAILED":
                    order.setPaymentstatus("PAYMENT_FAILED");
                    break;
                default:
                    order.setPaymentstatus(payment.getPaymentstatus().toUpperCase());
            }
            orderMasterRepository.save(order);
        }

        return savedPayment;
    }
}
