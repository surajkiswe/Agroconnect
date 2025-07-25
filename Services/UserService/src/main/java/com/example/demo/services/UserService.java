
package com.example.demo.services;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.entities.UserRegistrationDTO;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    public User registerUser(UserRegistrationDTO dto) {
        Role role = roleRepo.findById(dto.getRid())
                .orElseThrow(() -> new RuntimeException("Invalid role ID"));

        User user = new User();
        user.setFname(dto.getFname());
        user.setLname(dto.getLname());
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setMobileno(dto.getMobileno());
        user.setStatus(1);
        user.setRole(role);

        return userRepo.save(user);
    }
    
 // UserService.java
    public User validateLogin(String username, String password) {
        Optional<User> optionalUser = userRepo.findByUsernameAndPassword(username, password);
        return optionalUser.orElse(null);
    }

}
