package com.example.ewastebackend.repository;

import com.example.ewastebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 🔹 Used for login or fetching user details
    Optional<User> findByEmail(String email);

    // 🔹 Used for dashboard statistics
    long countByStatus(String status);
}
