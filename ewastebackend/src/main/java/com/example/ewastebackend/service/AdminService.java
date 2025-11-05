package com.example.ewastebackend.service;

import com.example.ewastebackend.entity.Admin;
import com.example.ewastebackend.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // ✅ Register a new admin
    public Admin registerAdmin(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(admin.getEmail());
        if (existingAdmin.isPresent()) {
            throw new RuntimeException("Admin already exists with email: " + admin.getEmail());
        }
        return adminRepository.save(admin);
    }

    // ✅ Login admin
    public boolean loginAdmin(String email, String password) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            return admin.getPassword().equals(password);
        }
        return false;
    }

    // ✅ Get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // ✅ Delete admin
    public void deleteAdmin(Long id) {
        if (!adminRepository.existsById(id)) {
            throw new RuntimeException("Admin not found with ID: " + id);
        }
        adminRepository.deleteById(id);
    }
}
