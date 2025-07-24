package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RoleEntity;
import com.example.demo.services.RoleServices;


@RestController
@RequestMapping("/role")
@CrossOrigin(origins = "http://localhost:3000/")
public class RoleController {

	@Autowired
	RoleServices rs;
	
	@GetMapping("/all")
	public List<RoleEntity> getAll()
	{
		return rs.getAll();
	}
	
	@PostMapping
    public RoleEntity saveRole(@RequestBody RoleEntity role) {
        return rs.saveRole(role);
    }
}
