package com.example.ewastebackend.repository;

import com.example.ewastebackend.entity.PickupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupRepository extends JpaRepository<PickupRequest, Long> {

    // find all pickups made by a specific user
    List<PickupRequest> findByUserEmail(String email);

    // find by status (for admin view)
    List<PickupRequest> findByStatus(String status);
}
