package com.example.ewastebackend.controller;

import com.example.ewastebackend.entity.PickupRequest;
import com.example.ewastebackend.service.PickupRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/requests")
public class AdminPickupController {

    @Autowired
    private PickupRequestService pickupRequestService;

    // ✅ Get all pickup requests
    @GetMapping
    public ResponseEntity<List<PickupRequest>> getAllPickupRequests() {
        return ResponseEntity.ok(pickupRequestService.getAllPickupRequests());
    }

    // ✅ Approve pickup
    @PutMapping("/{id}/approve")
    public ResponseEntity<PickupRequest> approvePickup(@PathVariable Long id) {
        PickupRequest updated = pickupRequestService.updateStatus(id, "Approved");
        return ResponseEntity.ok(updated);
    }

    // ✅ Reject pickup
    @PutMapping("/{id}/reject")
    public ResponseEntity<PickupRequest> rejectPickup(@PathVariable Long id) {
        PickupRequest updated = pickupRequestService.updateStatus(id, "Rejected");
        return ResponseEntity.ok(updated);
    }

    // ✅ Mark pickup as completed
    @PutMapping("/{id}/complete")
    public ResponseEntity<PickupRequest> completePickup(@PathVariable Long id) {
        PickupRequest updated = pickupRequestService.updateStatus(id, "Completed");
        return ResponseEntity.ok(updated);
    }
}
