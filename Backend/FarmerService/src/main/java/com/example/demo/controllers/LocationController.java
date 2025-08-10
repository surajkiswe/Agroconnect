package com.example.demo.controllers;

import com.example.demo.entities.Location;
import com.example.demo.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farmer/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping("/insert")
    public Location insertLocation(@RequestBody Location location) {
        return locationService.saveLocation(location);
    }

    @GetMapping("/all")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }
}
