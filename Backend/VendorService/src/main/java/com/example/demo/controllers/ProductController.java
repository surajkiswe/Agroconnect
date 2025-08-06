package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Product;
import com.example.demo.services.ProductService;

@RestController
@RequestMapping("product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

	@Autowired
	ProductService pserv;
	
	@GetMapping("getall")
	public List<Product> getallProducts(){
		return pserv.getall();
		
	}
	
	@GetMapping("getallbybid/{bid}")
	public List<Product> getbybid(@PathVariable("bid") int bid)
	{
		return pserv.getbybid(bid);
	}
}
