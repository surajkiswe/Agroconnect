package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {
}
