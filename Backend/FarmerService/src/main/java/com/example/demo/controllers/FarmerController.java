// FarmerController.java
package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.FarmerDTO;
import com.example.demo.entities.Vendor;
import com.example.demo.entities.Farmer;
import com.example.demo.services.FarmerService;

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
    public Farmer getByUid(@PathVariable int uid) {
        return farmerService.getFarmerByUid(uid);
    }
    
    @GetMapping("/getbyuid/{uid}")
    public List<Farmer> getbyuid(@PathVariable("uid") int id)
    {
    	return farmerService.getbyuid(id);
    }
}
