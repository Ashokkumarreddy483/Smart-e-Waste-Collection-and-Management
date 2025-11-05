package com.example.ewastebackend.repository;

import com.example.ewastebackend.entity.PickupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {
}
