package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Brand;

import com.example.demo.entities.Product;
import com.example.demo.entities.Productcategorydummy;
import com.example.demo.repositories.ProductRepository;

@Service
public class ProductService {

//	@Autowired
//	ProductRepository prepo;
//	
//	@Autowired
//	CategoryService cserv;
//	
//	@Autowired
//	BrandsService bserv;
//	
//	
//	public List<Product> getall()
//	{
//		return prepo.findAll(); 
//	}
//	
//	public Product getbyid(int id)
//	{
//		return prepo.findById(id).get();
//	}
//	
//	public Product add(Productcategorydummy pd)
//	{
//		Brand b= bserv.Getone(pd.getBid());
//		Product p = new Product(pd.getCid(),pd.getPname(),pd.getPdescription(),b);
//		return prepo.save(p);
//	}
//	public List<Product> getbybid(int bid)
//	{
//		Brand b=bserv.Getone(bid);
//		return prepo.findByBid(b);
//	}
//	
//	 public List<Product> getProductsByCategory(int cid) {
//	        return prepo.findByCid(cid);
//	    }
	
	    @Autowired
	    ProductRepository prepo;

	    @Autowired
	    CategoryService cserv;

	    @Autowired
	    BrandsService bserv;

	    public List<Product> getall() {
	        return prepo.findAll();
	    }

	    public Product getbyid(int id) {
	        return prepo.findById(id).orElse(null);
	    }

	    public Product add(Productcategorydummy pd) {
	        Brand b = bserv.Getone(pd.getBid());
	        Product p = new Product(pd.getCid(), pd.getPname(), pd.getPdescription(), b);
	        return prepo.save(p);
	    }

	    public List<Product> getbybid(int bid) {
	        Brand b = bserv.Getone(bid);
	        return prepo.findByBrand(b);
	    }

	    public List<Product> getProductsByCategory(int cid) {
	        return prepo.findByCid(cid);
	    }
	}

