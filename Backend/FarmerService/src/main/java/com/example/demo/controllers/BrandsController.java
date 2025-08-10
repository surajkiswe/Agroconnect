package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Brand;
import com.example.demo.services.BrandsService;

@RestController
@RequestMapping("/farmer/brand")
public class BrandsController {
	@Autowired
	BrandsService bserv;
	
	@GetMapping("getbyid/{bid}")
	public Brand getbyid(@PathVariable("bid") int id)
	{
		return bserv.Getone(id);
	}
	
	@GetMapping("getbycid/{cid}")
	public List<Brand> getbybid(@PathVariable("cid") int bid)
	{
		return bserv.bycid(bid);
	}

}
