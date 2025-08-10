package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartid;

    
    @ManyToOne
    @JoinColumn(name = "pvid") 
     private ProductVendor pvid;     

      
     @ManyToOne
     @JoinColumn(name = "prorid") 
     private ProductRental rental;
     
     @ManyToOne
     @JoinColumn(name = "fid") 
     private Farmer farmer;

    private int quantity;

	public int getCartid() {
		return cartid;
	}

	public void setCartid(int cartid) {
		this.cartid = cartid;
	}

	public ProductVendor getPvid() {
		return pvid;
	}

	public void setPvid(ProductVendor pvid) {
		this.pvid = pvid;
	}

	public ProductRental getRental() {
		return rental;
	}

	public void setRental(ProductRental rental) {
		this.rental = rental;
	}

	public Farmer getFarmer() {
		return farmer;
	}

	public void setFarmer(Farmer farmer) {
		this.farmer = farmer;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	

}
