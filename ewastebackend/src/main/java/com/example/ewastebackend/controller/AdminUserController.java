package com.example.ewastebackend.controller;

import com.example.ewastebackend.entity.User;
import com.example.ewastebackend.service.AdminUserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    // ✅ Fetch all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminUserService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // ✅ Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        boolean deleted = adminUserService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
