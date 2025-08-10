package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Category;
import com.example.demo.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository crepo;

	
	public List<Category> getall()
	{
		return crepo.findAll();
	}
	
	public Category getbyid(int id)
	{
		return crepo.findById(id).get();
	}
	
	public Category addctegory(Category c)
	{
		return crepo.save(c);
	}
	
	public String deletecategory(int id)
	{
		crepo.deleteById(id);
		return "Category deleted successfully !!!";
	}
}
