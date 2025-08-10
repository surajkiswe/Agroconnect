package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Brand;
import com.example.demo.entities.Category;

@Repository
public interface BrandsRepository extends JpaRepository<Brand, Integer> {

	public List<Brand> findByCid(Category cid);
	
	public List<Brand> findByBid(int bid);
}
