package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.FarmerDTO;
import com.example.demo.entities.Farmer;
import com.example.demo.entities.Location;
import com.example.demo.entities.Vendor;
import com.example.demo.repositories.FarmerRepository;
import com.example.demo.repositories.LocationRepository;

@Service
public class FarmerService {

    @Autowired
    private FarmerRepository farmerRepo;

    @Autowired
    private LocationRepository locationRepo;

    public Farmer registerFarmer(FarmerDTO dto) {
        if (dto == null || dto.getLocname() == null || dto.getLocname().trim().isEmpty()) {
            throw new IllegalArgumentException("Location name cannot be null or empty");
        }

        // Step 1: Normalize location name
        String locname = dto.getLocname().trim().toLowerCase();

        // Step 2: Check if location exists or insert new one
        Location location = locationRepo.findByLocname(locname);
        if (location == null) {
            location = new Location();
            location.setLocname(locname);
            location = locationRepo.save(location);
        }

        // Step 3: Create Farmer entity
        Farmer farmer = new Farmer();
        farmer.setLandsize(dto.getLandsize());
        farmer.setIncome(dto.getIncome());
        farmer.setUid(dto.getUid());
        farmer.setLocation(location); // will set location_id correctly

        return farmerRepo.save(farmer);
    }

    public List<Farmer> getAllFarmers() {
        return farmerRepo.findAll();
    }

    public Farmer getFarmerByUid(int uid) {
        List<Farmer> list = farmerRepo.findByUid(uid);
        return list.isEmpty() ? null : list.get(0);
    }
    
    public List<Farmer> getbyuid(int id)
    {
    	return farmerRepo.findByUid(id);
    }
}
