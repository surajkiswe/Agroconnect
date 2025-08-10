package com.example.demo.services;

import com.example.demo.entities.OrderDetails;
import com.example.demo.entities.OrderMaster;
import com.example.demo.entities.OrderRequestDTO;
import com.example.demo.entities.OrderWithPaymentDTO;
import com.example.demo.entities.Payment;
import com.example.demo.repositories.OrderDetailsRepository;
import com.example.demo.repositories.OrderMasterRepository;
import com.example.demo.repositories.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderMasterRepository orderMasterRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    

    @Transactional
    public OrderMaster createOrder(OrderMaster order, List<OrderDetails> orderDetailsList) {
        // Save OrderMaster first (so it gets an ID)
        OrderMaster savedOrder = orderMasterRepository.save(order);

        // Set order reference to all order details and save them
        for (OrderDetails details : orderDetailsList) {
            details.setOrderMaster(savedOrder);  // <-- Set object reference here
            orderDetailsRepository.save(details);
        }

        return savedOrder;
    }
    
    public Optional<OrderMaster> getOrderById(Integer orderId) {
        return orderMasterRepository.findById(orderId);
    }
    
    public List<OrderWithPaymentDTO> getOrdersWithPayments(Integer fid) {
        List<OrderMaster> orders = orderMasterRepository.findByFid(fid);

        return orders.stream().map(order -> {
            List<Payment> payments = paymentRepository.findByOrderid(order.getOrderid());

            return new OrderWithPaymentDTO(order, payments);
        }).collect(Collectors.toList());
    }
    
    public void placeOrder(OrderRequestDTO dto) {
        OrderMaster order = new OrderMaster();
        order.setFid(dto.getFid());
        order.setShippingaddress(dto.getAddress()); // this will override default
        // other order details...
        orderMasterRepository.save(order);
    }






}
