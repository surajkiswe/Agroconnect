package com.example.demo.services;

<<<<<<< HEAD
import com.example.demo.entities.*;
import com.example.demo.repositories.SchemeRepository;
import com.example.demo.repositories.FarmerRepository;
import com.example.demo.repositories.AppliedSchemeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
=======
import com.example.demo.entities.Scheme;
import com.example.demo.repositories.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
>>>>>>> 47594a09605d92fa10e4596ce80b20a22f929cb6

@Service
public class SchemeService {

    @Autowired
    private SchemeRepository schemeRepo;

<<<<<<< HEAD
    @Autowired
    private FarmerRepository farmerRepo;

    @Autowired
    private AppliedSchemeRepository appliedRepo;

    public List<Scheme> getAllSchemes() {
        return schemeRepo.findAll();
    }

    /**
     * Return schemes annotated with eligibility & applied flag for a given farmer id
     */
    public List<SchemeWithStatusDTO> getSchemesForFarmer(int fid) {
        Optional<Farmer> farmerOpt = farmerRepo.findById(fid);
        Farmer farmer = farmerOpt.orElse(null);

        List<AppliedScheme> appliedList = appliedRepo.findByFid(fid);
        Set<Integer> appliedSchemeIds = appliedList.stream()
                .filter(a -> a.getStatus() == 1)
                .map(AppliedScheme::getSchemeid)
                .collect(Collectors.toSet());

        List<Scheme> schemes = schemeRepo.findAll();
        List<SchemeWithStatusDTO> list = new ArrayList<>();

        for (Scheme s : schemes) {
            SchemeWithStatusDTO dto = new SchemeWithStatusDTO();
            dto.setSchemeid(s.getSchemeid());
            dto.setSchemename(s.getSchemename());
            dto.setEligibility(s.getEligibility());
            dto.setDescription(s.getDescription());
            dto.setStartdate(s.getStartdate());
            dto.setLastdate(s.getLastdate());
            dto.setIncome(s.getIncome());
            dto.setLandsize(s.getLandsize());

            boolean canApply = false;
            if (farmer != null) {
                canApply = farmer.getIncome() <= s.getIncome() && farmer.getLandsize() <= s.getLandsize();
            }
            boolean applied = appliedSchemeIds.contains(s.getSchemeid());

            dto.setCanApply(canApply && !applied); // only allow apply if eligible and not already applied
            dto.setApplied(applied);
            dto.setApplicationStatus(applied ? 1 : 0);

            list.add(dto);
        }
        return list;
    }

    /**
     * Apply for a scheme: validates eligibility and inserts into appliedscheme with status=1
     */
    @Transactional
    public AppliedScheme applyForScheme(ApplyRequest req) {
        int fid = req.getFid();
        int schemeid = req.getSchemeid();

        Farmer farmer = farmerRepo.findById(fid)
                .orElseThrow(() -> new IllegalArgumentException("Farmer not found"));

        Scheme scheme = schemeRepo.findById(schemeid)
                .orElseThrow(() -> new IllegalArgumentException("Scheme not found"));

        // check eligibility: farmer.income <= scheme.income && farmer.landsize <= scheme.landsize
        if (!(farmer.getIncome() <= scheme.getIncome() && farmer.getLandsize() <= scheme.getLandsize())) {
            throw new IllegalArgumentException("Farmer is not eligible for this scheme");
        }

        // check existing applied record
        Optional<AppliedScheme> existing = appliedRepo.findByFidAndSchemeid(fid, schemeid);
        if (existing.isPresent() && existing.get().getStatus() == 1) {
            return existing.get(); // already applied (status=1)
        }

        AppliedScheme app = existing.orElse(new AppliedScheme());
        app.setFid(fid);
        app.setSchemeid(schemeid);
        app.setGid(scheme.getGid()); // use scheme's gid
        app.setStatus(1); // applied
        return appliedRepo.save(app);
    }
=======
    public List<Scheme> getAllSchemes() {
        return schemeRepo.findAll();
    }
>>>>>>> 47594a09605d92fa10e4596ce80b20a22f929cb6
}
