package com.example.ewastebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ewastebackend.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
