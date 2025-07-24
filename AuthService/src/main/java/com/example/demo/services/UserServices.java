package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserAddDummy;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserServices {

	@Autowired
	UserRepository ur;
	
	@Autowired
	RoleRepository rr;

	//all data
	public List<UserEntity> getAll()
	{
		return ur.findAll();
	}
	
//	//authentication
//	public UserEntity getUserWithUsernameAndPassword(String username,String password)
//	{
//		return ur.getUserWithUsername(username,password);
//	}
	
	public UserEntity add(UserEntity u) {
	    UserEntity user = new UserEntity();

	    user.setUid(u.getUid()); // usually not needed, uid is auto-generated
	    user.setUsername(u.getUsername());
	    user.setEmail(u.getEmail());
	    user.setPassword(u.getPassword()); 
	    user.setMobileno(u.getMobileno());
	    user.setFname(u.getFname());
	    user.setLname(u.getLname());

	    // ✅ Correct way: load role from DB instead of creating a new one
	    RoleEntity role = rr.findById(2)
	        .orElseThrow(() -> new RuntimeException("Role not found with id 2"));

	    user.setrid(role);

	    return ur.save(user); // ur = UserRepository
	}

}
