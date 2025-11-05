package com.example.ewastebackend.service;

import com.example.ewastebackend.entity.User;
import com.example.ewastebackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    private final UserRepository userRepository;

    public AdminUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Delete user
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
