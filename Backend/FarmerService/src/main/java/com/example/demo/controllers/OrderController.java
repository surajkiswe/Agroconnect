package com.example.demo.controllers;

import com.example.demo.entities.OrderDetails;
import com.example.demo.entities.OrderMaster;
import com.example.demo.entities.OrderRequestDTO;
import com.example.demo.entities.OrderWithPaymentDTO;
import com.example.demo.entities.Payment;
import com.example.demo.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/farmer/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Create order with order details
    @PostMapping("/create")
    public OrderMaster createOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest.getOrder(), orderRequest.getOrderDetails());
    }

    // Get order by ID
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderMaster> getOrderById(@PathVariable Integer orderId) {
        Optional<OrderMaster> order = orderService.getOrderById(orderId);
        return order.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    // Helper DTO for incoming JSON
    public static class OrderRequest {
        private OrderMaster order;
        private List<OrderDetails> orderDetails;

        public OrderMaster getOrder() {
            return order;
        }
        public void setOrder(OrderMaster order) {
            this.order = order;
        }

        public List<OrderDetails> getOrderDetails() {
            return orderDetails;
        }
        public void setOrderDetails(List<OrderDetails> orderDetails) {
            this.orderDetails = orderDetails;
        }
    }
    
    @GetMapping("/farmer/{fid}/withpayments")
    public ResponseEntity<List<OrderWithPaymentDTO>> getOrdersWithPayments(@PathVariable Integer fid) {
        List<OrderWithPaymentDTO> ordersWithPayments = orderService.getOrdersWithPayments(fid);
        return ResponseEntity.ok(ordersWithPayments);
    }
    
    @PostMapping("/placeOrder")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequestDTO orderRequest) {
        // Use orderRequest.getAddress() here
        orderService.placeOrder(orderRequest);
        return ResponseEntity.ok("Order placed successfully");
    }



}
