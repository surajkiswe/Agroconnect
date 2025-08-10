package com.example.demo.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductVendor;
import com.example.demo.entities.ProductVendorDummy;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.ProductVendorRepository;

@Service
public class ProductVendorService {
	
	@Autowired
	ProductVendorRepository pvrepo;
	
	@Autowired
	ProductService pserv;
	
	@Autowired
	VendorService vserv;

	public List<ProductVendor> getall()
	{
		return pvrepo.findAll();
	}
	//change 
	public ProductVendor getbyid(Integer pvid) {
	    return pvrepo.findById(pvid)
	        .orElseThrow(() -> new RuntimeException("ProductVendor not found with id: " + pvid));
	}

	//change
	public void deleteById(Integer pvid) {
	    if (!pvrepo.existsById(pvid)) {
	        throw new RuntimeException("ProductVendor not found with id: " + pvid);
	    }
	    pvrepo.deleteById(pvid);
	}

	public ProductVendor addpv(ProductVendorDummy p)
	{
		Product pr = pserv.getbyid(p.getProdid());
		Vendor v = vserv.getvendorbyid(p.getVid());
		ProductVendor pv=new ProductVendor(pr, v, p.getPrice());
		return pvrepo.save(pv);
	}
	public ProductVendor updatepvprice(int id, double price)
	{
		ProductVendor pv= pvrepo.findById(id).get();
		pv.setPrice(price);
		return pvrepo.save(pv);
		
	}
	
	public List<ProductVendor> getbyvid(Vendor vid)
	{
		return pvrepo.findByVid(vid);
	}
	public List<ProductVendor> getbyprodid(Product prodid)
	{
		return pvrepo.findByProdid(prodid);
	}
}
