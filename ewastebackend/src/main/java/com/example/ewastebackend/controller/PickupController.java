package com.example.ewastebackend.controller;

import com.example.ewastebackend.entity.PickupRequest;
import com.example.ewastebackend.service.PickupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class PickupController {

    private final PickupService pickupService;

    public PickupController(PickupService pickupService) {
        this.pickupService = pickupService;
    }

    // ✅ Create new pickup request (with image uploads)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPickup(
            @RequestParam("userEmail") String userEmail,
            @RequestParam("deviceType") String deviceType,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("conditionStatus") String conditionStatus,
            @RequestParam("quantity") int quantity,
            @RequestParam("pickupAddress") String pickupAddress,
            @RequestParam(value = "remarks", required = false) String remarks,
            @RequestParam(value = "images", required = false) List<MultipartFile> images
    ) {
        try {
            // ✅ Define upload directory (outside /tmp to persist after restart)
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs(); // Create folder if not present

            // ✅ Build comma-separated list of image URLs
            StringBuilder imagePaths = new StringBuilder();
            if (images != null && !images.isEmpty()) {
                for (MultipartFile file : images) {
                    if (!file.isEmpty()) {
                        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                        File destination = new File(uploadDir + fileName);
                        file.transferTo(destination);

                        // Public URL format (frontend can access via http://localhost:8080/uploads/filename)
                        imagePaths.append("/uploads/").append(fileName).append(",");
                    }
                }
            }

            // ✅ Create and save PickupRequest entity
            PickupRequest pickup = new PickupRequest();
            pickup.setUserEmail(userEmail);
            pickup.setDeviceType(deviceType);
            pickup.setBrand(brand);
            pickup.setModel(model);
            pickup.setConditionStatus(conditionStatus);
            pickup.setQuantity(quantity);
            pickup.setPickupAddress(pickupAddress);
            pickup.setRemarks(remarks);
            pickup.setImageUrls(imagePaths.toString());
            pickup.setStatus("Pending");

            PickupRequest savedPickup = pickupService.savePickup(pickup);
            return ResponseEntity.ok(savedPickup);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ File upload failed: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Failed to create pickup request: " + e.getMessage());
        }
    }

    // ✅ Get all pickups (Admin)
    @GetMapping
    public ResponseEntity<List<PickupRequest>> getAllPickups() {
        return ResponseEntity.ok(pickupService.getAllPickups());
    }

    // ✅ Get pickups by user email
    @GetMapping("/user/{email}")
    public ResponseEntity<List<PickupRequest>> getByUserEmail(@PathVariable String email) {
        return ResponseEntity.ok(pickupService.getPickupsByUserEmail(email));
    }

    // ✅ Update pickup status (Admin)
    @PutMapping("/{id}/status")
    public ResponseEntity<PickupRequest> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(pickupService.updateStatus(id, status));
    }

    // ✅ Delete pickup
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePickup(@PathVariable Long id) {
        pickupService.deletePickup(id);
        return ResponseEntity.noContent().build();
    }
}
