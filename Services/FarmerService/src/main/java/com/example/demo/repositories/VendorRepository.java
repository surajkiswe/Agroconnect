package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Vendor;
import java.util.List;


public interface VendorRepository extends JpaRepository<Vendor, Integer> {
	
	public List<Vendor> findByUid(int uid);
}
