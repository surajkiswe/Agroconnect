package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.UserDetailsServiceImple;


@Service
public class UserServices {

    private final UserDetailsServiceImple userDetailsServiceImple;

	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	RoleRepository rr;

    UserServices(UserDetailsServiceImple userDetailsServiceImple) {
        this.userDetailsServiceImple = userDetailsServiceImple;
    }

	//all data
	public List<UserEntity> getAll()
	{
		return ur.findAll();
	}
	
//	//authentication
//	public UserEntity getUserWithUsername(String username,String password)
//	{
//		return ur.getUserWithUsername(username);
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

	    user.setRid(role);

	    return ur.save(user); // ur = UserRepository
	}

}
