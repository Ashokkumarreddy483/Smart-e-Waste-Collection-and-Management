package com.example.ewastebackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int conditionPercent;
    private int usedYears;
    private double estimatedPrice;

    private String email;

    @Column(length = 500)
    private String address;

    private LocalDateTime dateTime;

    private String frontImgUrl;
    private String backImgUrl;
    private String sideImgUrl;

    private String uploadedImagePath; // for file uploads
}
