package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.LoginInfo;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserInfoResponse;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.UserDetailsImple;
import com.example.demo.services.JwtUtils;
import com.example.demo.services.UserServices;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

	@Autowired
	UserServices us;
	
	@Autowired
	AuthenticationManager authManager;
    
	@Autowired
	UserRepository urepo;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@GetMapping("/all")
	public List<UserEntity> getAll()
	{
		return us.getAll();
	}
	
//	@GetMapping("/find")
//	public UserEntity getUserWithUsername(@RequestParam String username) {
//	    return us.getUserWithUsername(username,password);
//	}
	
	@PostMapping("/login") 
	public ResponseEntity<?> checkLogin(@RequestBody LoginInfo linfo)  {
	    System.out.println("Login attempt for user: " + linfo.getUsername());

	    Authentication authentication = authManager.authenticate(
	        new UsernamePasswordAuthenticationToken(linfo.getUsername(), linfo.getPassword())
	    );

	    SecurityContextHolder.getContext().setAuthentication(authentication);

	    UserDetailsImple userDetails = (UserDetailsImple) authentication.getPrincipal();

	    String token = jwtUtils.generateTokenFromUsername(userDetails.getUsername());

	    List<GrantedAuthority> authorities = (List<GrantedAuthority>) userDetails.getAuthorities();
	    String role = authorities.get(0).getAuthority();

	    return ResponseEntity.ok(new UserInfoResponse(userDetails.getUsername(), role, token));
	}

	
	
	@PostMapping("/insert")
	public UserEntity add(@RequestBody UserEntity u)
	{
		System.out.println("User : "+u.toString());
		return us.add(u);
	}
	
//	@DeleteMapping("/delete/{id}")
//	public ResponseEntity<?> deleteUser(@PathVariable int id) {
//	    userRepo.deleteById(id);
//	    return ResponseEntity.ok("Deleted");
//	}
}
