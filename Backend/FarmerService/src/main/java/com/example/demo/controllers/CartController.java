package com.example.demo.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Cart;
import com.example.demo.entities.CartUpdateRequest;
import com.example.demo.entities.OrderDetails;
import com.example.demo.entities.OrderMaster;
import com.example.demo.entities.Payment;
import com.example.demo.repositories.CartRepository;
import com.example.demo.services.CartService;
import com.example.demo.services.OrderService;
import com.example.demo.services.PaymentService;
import com.github.andrewoma.dexx.collection.Map;

@RestController
@RequestMapping("/farmer/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;
    


    // Get cart by farmer ID
    @GetMapping("/{fid}")
    public List<Cart> getCart(@PathVariable Integer fid) {
        return cartService.getCartByFarmerId(fid);
    }

    // Add item to cart
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }
    
    

    // Remove single cart item
    @DeleteMapping("/delete/{cartid}")
    public void removeFromCart(@PathVariable Integer cartid) {
        cartService.removeFromCart(cartid);
    }

    // Clear cart for a specific farmer
    @DeleteMapping("/clear/{fid}")
    public void clearCart(@PathVariable Integer fid) {
        cartService.clearCartByFarmerId(fid);
    }
    
    @PutMapping("/update/{cartid}")
    public ResponseEntity<?> updateCartQuantity(@PathVariable Integer cartid,
                                                @RequestBody CartUpdateRequest updateRequest) {
        Optional<Cart> opt = cartService.getById(cartid);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cart cart = opt.get();

        Integer qty = updateRequest.getQuantity();
        if (qty != null) {
            if (qty < 1) {
                return ResponseEntity.badRequest().body("Quantity must be at least 1");
            }
            cart.setQuantity(qty);
        }

        // handle other fields here if you add to DTO

        Cart updated = cartService.save(cart);
        return ResponseEntity.ok(updated);
    }
    

}
