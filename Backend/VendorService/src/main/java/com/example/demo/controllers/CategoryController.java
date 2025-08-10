package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Category;
import com.example.demo.services.CategoryService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;




@RestController
@RequestMapping("/vendor/category")

public class CategoryController {
	
	@Autowired
	CategoryService cserv;

	@GetMapping("getall")
	public List<Category> getall()
	{
		return cserv.getall();
	}
	
	@GetMapping("getone/{cid}")
	public Category getbyid(@PathVariable("cid") int id)
	{
		return cserv.getbyid(id);
	}
	
	
	
}
