package com.example.ewastebackend.controller;

import com.example.ewastebackend.entity.Admin;
import com.example.ewastebackend.repository.RequestRepository;
import com.example.ewastebackend.repository.UserRepository;
import com.example.ewastebackend.service.AdminService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;
    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    public AdminController(AdminService adminService,
                           RequestRepository requestRepository,
                           UserRepository userRepository) {
        this.adminService = adminService;
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }

    // ✅ Register a new admin
    @PostMapping("/register")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.registerAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    // ✅ Admin login
    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
        boolean success = adminService.loginAdmin(admin.getEmail(), admin.getPassword());
        if (success) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // ✅ Get all admins
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    // ✅ Delete admin
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }

    // ✅ Dashboard Statistics API
    @GetMapping("/dashboard-stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRequests", requestRepository.count());
        stats.put("activeUsers", userRepository.countByStatus("ACTIVE"));
        stats.put("completedPickups", requestRepository.countByStatus("Completed"));
        stats.put("pendingRequests", requestRepository.countByStatus("Pending"));
        return stats;
    }
}
