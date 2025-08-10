package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Cart;
import com.example.demo.services.CartService;

@CrossOrigin
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }
    
    @GetMapping("/getall")
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCart(@PathVariable int id) {
        cartService.deleteCartById(id);
    }

    @PutMapping("/update/{cartid}")
    public Cart updateQuantity(@PathVariable int cartid, @RequestParam int quantity) {
        return cartService.updateCartQuantity(cartid, quantity);
    }
 
}
