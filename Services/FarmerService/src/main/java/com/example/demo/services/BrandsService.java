package com.example.demo.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Brands;
import com.example.demo.entities.Category;
import com.example.demo.repositories.BrandsRepository;

@Service
public class BrandsService {
	
	@Autowired
	BrandsRepository brepo;
	
	@Autowired
	CategoryService cserv;
	
	public Brands Getone(int id)
	{
		return brepo.findById(id).get();
	}
	
	public List<Brands> bycid(int id)
	{
		Category cid= cserv.getbyid(id);
		return brepo.findByCid(cid);
	}
	

}
