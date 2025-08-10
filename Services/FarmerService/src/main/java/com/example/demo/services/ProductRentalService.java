package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductRental;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.ProductRentalDummy;
import com.example.demo.repositories.ProductRentalRepository;


@Service
public class ProductRentalService {
	
	@Autowired
	ProductRentalRepository prepo;
	
	@Autowired
	ProductService pserv;
	
	@Autowired
	VendorService vserv;
	
	
	public ProductRental getonebyid(int id)
	{
		return prepo.findById(id).get();
	}
	
	public ProductRental add(ProductRentalDummy pr)
	{
		Product p= pserv.getbyid(pr.getProdid());
		Vendor v=vserv.getvendorbyid(pr.getVid());
		ProductRental prr=new ProductRental(p,v,pr.getRateperday());
		return prepo.save(prr);
	}
	
	public void delete(int id)
	{
		prepo.deleteById(id);
	}
	
	public ProductRental updaterate(int id, double rate)
	{
		ProductRental pr=prepo.findById(id).get();
		pr.setRateperday(rate);
		return prepo.save(pr);
	}
	public List<ProductRental> getbyvid(int vid)
	{
		Vendor v= vserv.getvendorbyid(vid);
		return prepo.findByVid(v);
	}
	public List<ProductRental> getbyprodid(int id)
	{
		Product p=pserv.getbyid(id);
		return prepo.findByProdid(p);
	}

}
