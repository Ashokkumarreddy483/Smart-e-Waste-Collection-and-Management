package com.example.ewastebackend.service;

import com.example.ewastebackend.entity.PickupRequest;
import com.example.ewastebackend.repository.PickupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PickupService {

    private final PickupRepository pickupRepository;

    public PickupService(PickupRepository pickupRepository) {
        this.pickupRepository = pickupRepository;
    }

    // Create or update pickup request
    public PickupRequest savePickup(PickupRequest pickupRequest) {
        return pickupRepository.save(pickupRequest);
    }

    // Get all pickups (admin)
    public List<PickupRequest> getAllPickups() {
        return pickupRepository.findAll();
    }

    // Get pickup by user email
    public List<PickupRequest> getPickupsByUserEmail(String email) {
        return pickupRepository.findByUserEmail(email);
    }

    // Get by ID
    public Optional<PickupRequest> getPickupById(Long id) {
        return pickupRepository.findById(id);
    }

    // Update pickup status (admin action)
    public PickupRequest updateStatus(Long id, String newStatus) {
        PickupRequest pickup = pickupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));
        pickup.setStatus(newStatus);
        return pickupRepository.save(pickup);
    }

    // Delete
    public void deletePickup(Long id) {
        pickupRepository.deleteById(id);
    }
}
