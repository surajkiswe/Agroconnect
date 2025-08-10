package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.AppliedScheme;
import java.util.Optional;
import java.util.List;

public interface AppliedSchemeRepository extends JpaRepository<AppliedScheme, Integer> {
    Optional<AppliedScheme> findByFidAndSchemeid(int fid, int schemeid);
    List<AppliedScheme> findByFid(int fid);
}
