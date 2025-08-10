package com.example.demo.repositories;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductRental;
import com.example.demo.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRentalRepository extends JpaRepository<ProductRental, Integer> {
    List<ProductRental> findByVendor(Vendor vendor);
    
//    List<ProductRental> findByVid(Vendor vid);
    List<ProductRental> findByProduct(Product product);

}
