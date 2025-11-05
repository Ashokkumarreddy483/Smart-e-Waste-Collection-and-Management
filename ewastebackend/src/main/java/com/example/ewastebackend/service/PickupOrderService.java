package com.example.ewastebackend.service;

import com.example.ewastebackend.entity.PickupOrder;
import com.example.ewastebackend.entity.PickupStatus;  // ✅ Import added
import com.example.ewastebackend.repository.PickupOrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PickupOrderService {

    private final PickupOrderRepository pickupOrderRepository;

    public PickupOrderService(PickupOrderRepository pickupOrderRepository) {
        this.pickupOrderRepository = pickupOrderRepository;
    }

    // ✅ Create new pickup order
    public PickupOrder createOrder(PickupOrder order) {
        order.setStatus(PickupStatus.PENDING);
        return pickupOrderRepository.save(order);
    }

    // ✅ Get orders for specific user
    public List<PickupOrder> getOrdersByEmail(String email) {
        return pickupOrderRepository.findByEmail(email);
    }

    // ✅ Get all pickup orders
    public List<PickupOrder> getAllOrders() {
        return pickupOrderRepository.findAll();
    }

    // ✅ Update order status (generic)
    public PickupOrder updateStatus(Long id, PickupOrder updatedOrder) {
        PickupOrder existing = pickupOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pickup order not found"));

        existing.setStatus(updatedOrder.getStatus());
        existing.setRejectionReason(updatedOrder.getRejectionReason());
        existing.setScheduledDateTime(updatedOrder.getScheduledDateTime());

        return pickupOrderRepository.save(existing);
    }

    // ✅ Admin: Approve / Reject / Schedule actions
    public boolean updateStatusByAdmin(Long id, PickupStatus status, String rejectionReason, LocalDateTime scheduledTime) {
        Optional<PickupOrder> optionalOrder = pickupOrderRepository.findById(id);

        if (optionalOrder.isPresent()) {
            PickupOrder order = optionalOrder.get();
            order.setStatus(status);

            if (rejectionReason != null && !rejectionReason.isBlank()) {
                order.setRejectionReason(rejectionReason);
            }

            if (scheduledTime != null) {
                order.setScheduledDateTime(scheduledTime);
            }

            pickupOrderRepository.save(order);
            return true;
        }

        return false;
    }
}
