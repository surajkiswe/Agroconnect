package com.example.demo.services;

import com.example.demo.entities.Location;
import com.example.demo.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepo;

    public Location saveLocation(Location location) {
        String locname = location.getLocname().trim().toLowerCase();
        Location existing = locationRepo.findByLocname(locname);
        if (existing != null) {
            return existing;
        }
        location.setLocname(locname);
        return locationRepo.save(location);
    }

    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }
}
