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

import com.example.demo.entities.ProductRental;


import com.example.demo.repositories.ProductRentalDummy;
import com.example.demo.services.ProductRentalService;


@RestController
@RequestMapping("/vendor/productrental")
public class ProductRentalController {
	
    @Autowired
    private ProductRentalService productRentalService;
    
    

    
    @GetMapping("getone/{id}")
    public ProductRental getById(@PathVariable int id) {
        return productRentalService.getonebyid(id);
    }

    
    @PostMapping("/add")
    public ProductRental addProductRental(@RequestBody ProductRentalDummy dummy) {
        return productRentalService.add(dummy);
    }

    
    @DeleteMapping("delete/{id}") 
    public void deleteProductRental(@PathVariable int id) {
        productRentalService.delete(id);
    }

    @GetMapping("getbyvid/{vid}")
	public List<ProductRental> getbyvid(@PathVariable("vid") int vid)
	{
		
		return productRentalService.getbyvid(vid);
	}
    
    @PutMapping("update")
    public ProductRental updateRate(@RequestParam("prorid") int id, @RequestParam("rateperday") double rate) {
        return productRentalService.updaterate(id, rate);
    }
    
  

}
