package com.example.ewastebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class PickupOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phoneNumber;
    private String pickupAddress;
    private String additionalNotes;

    @Enumerated(EnumType.STRING)
    private PickupStatus status = PickupStatus.PENDING;

    private String rejectionReason;
    private LocalDateTime scheduledDateTime;
}
