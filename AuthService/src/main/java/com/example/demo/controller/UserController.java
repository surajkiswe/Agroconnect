package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.UserAddDummy;
import com.example.demo.entity.UserDummy;
import com.example.demo.entity.UserEntity;
import com.example.demo.services.UserServices;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

	@Autowired
	UserServices us;
	
	@GetMapping("/all")
	public List<UserEntity> getAll()
	{
		return us.getAll();
	}
	
//	@GetMapping("/find")
//	public UserEntity getUserWithUsernameAndPassword(@RequestBody UserEntity u)
//	{
//		return us.getUserWithUsernameAndPassword(u.getUsername(), u.getPassword());
//	}
	
	@PostMapping("/insert")
	public UserEntity add(@RequestBody UserEntity u)
	{
		System.out.println("User : "+u.toString());
		return us.add(u);
	}
}
