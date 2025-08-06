package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Brands;
import com.example.demo.entities.Category;
import com.example.demo.entities.Product;
import com.example.demo.entities.Productcategorydummy;
import com.example.demo.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository prepo;
	
	@Autowired
	CategoryService cserv;
	
	@Autowired
	BrandsService bserv;
	
	
	public List<Product> getall()
	{
		return prepo.findAll(); 
	}
	
	public Product getbyid(int id)
	{
		return prepo.findById(id).get();
	}
	
	public Product add(Productcategorydummy pd)
	{
		Category c= cserv.getbyid(pd.getCid());
		Brands b= bserv.Getone(pd.getBid());
		Product p = new Product(pd.getPname(),pd.getPdescription(),b);
		return prepo.save(p);
	}
	public List<Product> getbybid(int bid)
	{
		Brands b=bserv.Getone(bid);
		return prepo.findByBid(b);
		
	}
}
