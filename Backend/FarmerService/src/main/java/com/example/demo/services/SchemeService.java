package com.example.demo.services;

import com.example.demo.entities.Scheme;
import com.example.demo.repositories.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchemeService {

    @Autowired
    private SchemeRepository schemeRepo;

    public List<Scheme> getAllSchemes() {
        return schemeRepo.findAll();
    }
}
