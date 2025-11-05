package com.example.ewastebackend.repository;

import com.example.ewastebackend.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {
    long countByStatus(String status);
}
