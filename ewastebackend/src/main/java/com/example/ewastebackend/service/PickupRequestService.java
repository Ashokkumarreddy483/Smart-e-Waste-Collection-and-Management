package com.example.ewastebackend.service;

import com.example.ewastebackend.entity.PickupRequest;
import com.example.ewastebackend.repository.PickupRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PickupRequestService {

    @Autowired
    private PickupRequestRepository pickupRequestRepository;

    // ✅ Get all pickup requests (Admin)
    public List<PickupRequest> getAllPickupRequests() {
        return pickupRequestRepository.findAll();
    }

    // ✅ Get a pickup request by ID
    public PickupRequest getPickupRequestById(Long id) {
        return pickupRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pickup Request not found with ID: " + id));
    }

    // ✅ Update status (Pending → Approved/Rejected/Completed)
    public PickupRequest updateStatus(Long id, String status) {
        PickupRequest request = getPickupRequestById(id);
        request.setStatus(status);
        return pickupRequestRepository.save(request);
    }
}
