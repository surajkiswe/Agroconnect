package com.example.demo.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductVendor;
import com.example.demo.entities.ProductVendorDummy;
import com.example.demo.entities.Vendor;
import com.example.demo.services.ProductService;
import com.example.demo.services.ProductVendorService;
import com.example.demo.services.VendorService;

@RestController
@RequestMapping("/vendor/productvendor")
public class ProductVendorController {

	@Autowired
	ProductVendorService pvserv;
	
	@Autowired
	VendorService vserv;
	
	@Autowired
	ProductService pserv;
	
	@GetMapping("getall")
	public List<ProductVendor> getall()
	{
		return pvserv.getall();
	}
	@GetMapping("getbypvid/{pvid}")    //change
	public ProductVendor getByPvid(@PathVariable("pvid") Integer pvid) {
	    return pvserv.getbyid(pvid);
	}

	
	@PostMapping("add")
	public ProductVendor addone(@RequestBody ProductVendorDummy p)
	{
		return pvserv.addpv(p);
	}
	
	@PutMapping("updateprice")
	public ProductVendor updateprice(@RequestParam("pvid") int id,@RequestParam("price") double price)
	{
		return pvserv.updatepvprice(id, price);
	}
	
	@GetMapping("getbyvid/{vid}")
	public List<ProductVendor> getbyvid(@PathVariable("vid") int vid)
	{
		Vendor v= vserv.getvendorbyid(vid);
		
		return pvserv.getbyvid(v);
	}
	
	@DeleteMapping("delete/{pvid}")  //change
	public String deleteByPvid(@PathVariable("pvid") Integer pvid) {
	    pvserv.deleteById(pvid);
	    return "ProductVendor with ID " + pvid + " deleted successfully.";
	}
	
	@GetMapping("getbyprodid/{prodid}")   //change
	public List<ProductVendor> getbyprodid(@PathVariable("prodid") int prodid)
	{
		Product p= pserv.getbyid(prodid);
		
		return pvserv.getbyprodid(p);
	}
	
}
