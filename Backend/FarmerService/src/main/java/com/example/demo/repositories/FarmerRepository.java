// FarmerRepository.java
package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Farmer;
import java.util.List;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {
    List<Farmer> findByUid(int uid);  
}
