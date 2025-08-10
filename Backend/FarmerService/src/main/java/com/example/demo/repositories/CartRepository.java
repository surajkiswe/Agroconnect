package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByFid(Integer fid);
}
