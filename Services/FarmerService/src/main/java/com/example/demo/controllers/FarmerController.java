// FarmerController.java
package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.FarmerDTO;
import com.example.demo.entities.Farmer;
import com.example.demo.services.FarmerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/farmer")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @PostMapping("/register")
    public Farmer registerFarmer(@RequestBody FarmerDTO dto) {
        return farmerService.registerFarmer(dto);
    }

    @GetMapping("/all")
    public List<Farmer> getAllFarmers() {
        return farmerService.getAllFarmers();
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> getByUid(@PathVariable int uid) {
        Farmer farmer = farmerService.getFarmerByUid(uid);
        if (farmer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Farmer not found for uid " + uid));
        }
        return ResponseEntity.ok(farmer);
    }

}
