package com.example.ewastebackend.controller;

import com.example.ewastebackend.entity.PickupOrder;
import com.example.ewastebackend.entity.PickupStatus;
import com.example.ewastebackend.service.PickupOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/pickup-orders")
@CrossOrigin(origins = "http://localhost:3000")
public class PickupOrderController {

    private final PickupOrderService pickupOrderService;

    public PickupOrderController(PickupOrderService pickupOrderService) {
        this.pickupOrderService = pickupOrderService;
    }

    // ✅ Create new pickup order (User)
    @PostMapping
    public PickupOrder createPickupOrder(@RequestBody PickupOrder order) {
        return pickupOrderService.createOrder(order);
    }

    // ✅ Get all pickup orders for a user by email
    @GetMapping("/user/{email}")
    public List<PickupOrder> getOrdersByEmail(@PathVariable String email) {
        return pickupOrderService.getOrdersByEmail(email);
    }

    // ✅ Get all pickup orders (Admin)
    @GetMapping("/all")
    public List<PickupOrder> getAllOrders() {
        return pickupOrderService.getAllOrders();
    }

    // ✅ Update order status (generic update)
    @PutMapping("/{id}/status")
    public PickupOrder updateOrderStatus(@PathVariable Long id, @RequestBody PickupOrder updatedOrder) {
        return pickupOrderService.updateStatus(id, updatedOrder);
    }

    // ✅ Admin: Approve pickup request
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approvePickup(@PathVariable Long id) {
        boolean updated = pickupOrderService.updateStatusByAdmin(id, PickupStatus.APPROVED, null, null);
        return updated ? ResponseEntity.ok("Pickup approved successfully") :
                ResponseEntity.notFound().build();
    }

    // ✅ Admin: Reject pickup request with reason
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectPickup(@PathVariable Long id, @RequestBody(required = false) String reason) {
        boolean updated = pickupOrderService.updateStatusByAdmin(id, PickupStatus.REJECTED, reason, null);
        return updated ? ResponseEntity.ok("Pickup rejected successfully") :
                ResponseEntity.notFound().build();
    }

    // ✅ Admin: Schedule pickup (approve + assign date/time)
    @PutMapping("/{id}/schedule")
    public ResponseEntity<?> schedulePickup(@PathVariable Long id, @RequestParam String dateTime) {
        LocalDateTime scheduledTime = LocalDateTime.parse(dateTime);
        boolean updated = pickupOrderService.updateStatusByAdmin(id, PickupStatus.SCHEDULED, null, scheduledTime);
        return updated ? ResponseEntity.ok("Pickup scheduled successfully") :
                ResponseEntity.notFound().build();
    }
}
