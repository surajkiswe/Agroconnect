package com.example.demo.repositories;

import com.example.demo.entities.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchemeRepository extends JpaRepository<Scheme, Integer> {
}
