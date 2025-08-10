package com.example.demo.controllers;

import com.example.demo.entities.*;
import com.example.demo.services.SchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scheme")
@CrossOrigin(origins = "http://localhost:3000")
public class SchemeController {

    @Autowired
    private SchemeService schemeService;

    @GetMapping("/all")
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }

    // New: list of schemes with eligibility & applied flags for a given farmer (fid)
    @GetMapping("/forFarmer/{fid}")
    public ResponseEntity<?> getSchemesForFarmer(@PathVariable int fid) {
        try {
            List<SchemeWithStatusDTO> list = schemeService.getSchemesForFarmer(fid);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    // New: apply endpoint
    @PostMapping("/apply")
    public ResponseEntity<?> applyForScheme(@RequestBody ApplyRequest req) {
        try {
            AppliedScheme app = schemeService.applyForScheme(req);
            return ResponseEntity.ok(app);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }
}
