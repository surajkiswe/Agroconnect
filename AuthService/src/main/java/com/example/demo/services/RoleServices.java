package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.RoleEntity;
import com.example.demo.repository.RoleRepository;

@Service
public class RoleServices {

	@Autowired
	RoleRepository rr;
	
	public List<RoleEntity> getAll()
	{
		return rr.findAll();
	}
	
	public RoleEntity saveRole(RoleEntity role) {
        return rr.save(role);
    }
	
	public RoleEntity getRole(int id)
	{
		return rr.findById(id).get();
	}
	
	
}
