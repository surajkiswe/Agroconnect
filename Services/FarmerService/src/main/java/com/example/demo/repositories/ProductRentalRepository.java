package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductRental;
import com.example.demo.entities.Vendor;

import java.util.List;


@Repository
public interface ProductRentalRepository extends JpaRepository<ProductRental, Integer> {

	public List<ProductRental> findByVid(Vendor vid);
	
	public List<ProductRental> findByProdid(Product prodid);
	
}
