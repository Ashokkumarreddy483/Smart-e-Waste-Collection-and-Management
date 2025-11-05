package com.example.ewastebackend.repository;

import com.example.ewastebackend.entity.PickupOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PickupOrderRepository extends JpaRepository<PickupOrder, Long> {
    List<PickupOrder> findByEmail(String email);
}
