package com.example.ewastebackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String itemType;
    private String address;
    private String contactNumber;
    private String status;  // "Pending", "Completed", etc.

    public Request() {}

    public Request(String userName, String itemType, String address, String contactNumber, String status) {
        this.userName = userName;
        this.itemType = itemType;
        this.address = address;
        this.contactNumber = contactNumber;
        this.status = status;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
