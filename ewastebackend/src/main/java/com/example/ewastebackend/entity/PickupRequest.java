package com.example.ewastebackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pickup_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PickupRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;          // Link to user by email

    private String deviceType;         // e.g., Laptop, Mobile, TV
    private String brand;
    private String model;
    private String conditionStatus;    // Working / Damaged / Dead
    private Integer quantity;

    @Column(length = 2000)
    private String imageUrls;          // Comma-separated URLs

    private String pickupAddress;

    @Column(length = 1000)
    private String remarks;

    private String status = "Pending"; // Default status
}
