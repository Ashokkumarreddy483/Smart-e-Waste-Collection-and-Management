package com.example.ewastebackend.controller;

import com.example.ewastebackend.entity.Item;
import com.example.ewastebackend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class ItemController {

    @Autowired
    private ItemService itemService;

    // ✅ POST: Add a new item (Base64 images handled as plain text)
    @PostMapping("/add")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        item.setDateTime(LocalDateTime.now());
        Item savedItem = itemService.saveItem(item);
        return ResponseEntity.ok(savedItem);
    }

    // ✅ GET: Fetch all items
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    // ✅ GET: Fetch single item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemService.getItemById(id);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(item);
    }
}
