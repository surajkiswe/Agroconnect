// LocationRepository.java
package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    Location findByLocname(String locname);
}
