package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Vendor;
import com.example.demo.entities.VendorDTO;
import com.example.demo.services.VendorService;

@RestController
@RequestMapping("/vendor")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @PostMapping("/register")
    public Vendor registerVendor(@RequestBody VendorDTO dto) {
        return vendorService.registerVendor(dto);
    }
}
