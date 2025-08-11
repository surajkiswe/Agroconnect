package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.example.demo.entities.User;
import com.example.demo.entities.UserLoginDTO;
import com.example.demo.entities.UserRegistrationDTO;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRegistrationDTO dto) {
        User user = userService.registerUser(dto);
        return ResponseEntity.ok(user);
    }
    
 // UserController.java
    @PostMapping("/find")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO loginDto) {
        User user = userService.validateLogin(loginDto.getUsername(), loginDto.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    
    @PutMapping("/user/{id}/updateStatus")
    public ResponseEntity<String> toggleUserStatus(@PathVariable Integer id) {
        String message = userService.toggleUserStatus(id);
        if ("User not found".equals(message)) {
            return ResponseEntity.status(404).body(message);
        }
        return ResponseEntity.ok(message);
    }


}