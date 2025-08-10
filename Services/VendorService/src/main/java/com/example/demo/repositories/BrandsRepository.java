package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Brands;
import com.example.demo.entities.Category;

@Repository
public interface BrandsRepository extends JpaRepository<Brands, Integer> {

	public List<Brands> findByCid(Category cid);
	
	public List<Brands> findByBid(int bid);
}
