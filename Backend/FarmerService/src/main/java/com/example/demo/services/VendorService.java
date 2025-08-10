package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entities.*;
import com.example.demo.repositories.VendorRepository;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepo;

    public Vendor registerVendor(VendorDTO dto) {   
    	if (dto == null) {
            throw new IllegalArgumentException("Location name cannot be null or empty");
        }
    	
    	
        Vendor vendor = new Vendor();
        vendor.setUid(dto.getUid());
        vendor.setLiscenceno(dto.getLiscenceno());
        vendor.setCompanyname(dto.getCompanyname());

        return vendorRepo.save(vendor);
    }
    
    public Vendor getvendorbyid(int id)
    {
    	return vendorRepo.findById(id).get();
    }
    
    public List<Vendor> getbyuid(int id)
    {
    	return vendorRepo.findByUid(id);
    }
}
