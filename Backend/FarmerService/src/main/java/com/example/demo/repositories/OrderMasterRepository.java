package com.example.demo.repositories;

import com.example.demo.entities.OrderMaster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMasterRepository extends JpaRepository<OrderMaster, Integer> {
	
	List<OrderMaster> findByFid(Integer fid);

}
