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

    public List<Cart> getCartByFarmerId(Integer fid) {
        return cartRepository.findByFid(fid);
    }

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }
    
    public Optional<Cart> getById(Integer id) {
        return cartRepository.findById(id);
    }

    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    public void removeFromCart(Integer cartid) {
        cartRepository.deleteById(cartid);
    }

    public void clearCartByFarmerId(Integer fid) {
        List<Cart> carts = cartRepository.findByFid(fid);
        cartRepository.deleteAll(carts);
    }
}
