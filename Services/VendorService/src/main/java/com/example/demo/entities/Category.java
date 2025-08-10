package com.example.demo.entities;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="category")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int cid;
	String cname;
	String ctype;
	String description;
	@OneToMany(mappedBy = "cid",cascade = CascadeType.ALL )
	@JsonIgnoreProperties("cid")
	List<Brands> brands;
	
	
	public Category() {
		super();
		
	}
	public Category(String cname, String ctype, String description) {
		super();
		this.cname = cname;
		this.ctype = ctype;
		this.description = description;
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	public String getCtype() {
		return ctype;
	}
	public void setCtype(String ctype) {
		this.ctype = ctype;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<Brands> getBrands() {
		return brands;
	}
	public void setBrands(List<Brands> brands) {
		this.brands = brands;
	}
	
	

}
