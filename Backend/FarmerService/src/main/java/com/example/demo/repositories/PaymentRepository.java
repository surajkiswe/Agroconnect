package com.example.demo.repositories;

import com.example.demo.entities.Payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
   
    List<Payment> findByOrderid(Integer orderid);
}
