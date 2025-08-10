package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.repositories.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }
    
    public void deleteCartById(int id) {
        cartRepository.deleteById(id);
    }
    
    public Cart updateCartQuantity(int cartid, int quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartid);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.setQuantity(quantity);
            return cartRepository.save(cart);
        } else {
            throw new RuntimeException("Cart not found with ID: " + cartid);
        }
    }


}
