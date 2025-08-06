package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductVendor;
import com.example.demo.entities.Vendor;

import java.util.List;


@Repository
public interface ProductVendorRepository extends JpaRepository<ProductVendor, Integer> {

	public List<ProductVendor> findByVid(Vendor vid);
	public List<ProductVendor> findByProdid(Product prodid);
	
}
