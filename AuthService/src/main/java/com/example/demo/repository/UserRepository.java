package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.UserEntity;


public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	@Query("select u from User u where username = ?1")
	public UserEntity getUserWithUsername(String username);

	
}
