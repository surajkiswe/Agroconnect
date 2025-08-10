package com.example.demo.repositories;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductVendor;
import com.example.demo.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductVendorRepository extends JpaRepository<ProductVendor, Integer> {
    List<ProductVendor> findByVendor(Vendor vendor); 
    
//    List<ProductVendor> findByVid(Vendor vid);
    List<ProductVendor> findByProduct(Product prodid);

}
