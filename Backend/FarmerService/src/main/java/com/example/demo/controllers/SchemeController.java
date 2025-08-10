package com.example.demo.controllers;

import com.example.demo.entities.Scheme;
import com.example.demo.services.SchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farmer/scheme")
public class SchemeController {

    @Autowired
    private SchemeService schemeService;

    @GetMapping("/all")
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }
}
