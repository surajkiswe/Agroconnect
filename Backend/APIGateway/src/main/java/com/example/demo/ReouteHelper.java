package com.example.demo;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class ReouteHelper {
	
	@Bean
	CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Ensure it matches your frontend URL
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setExposedHeaders(Arrays.asList("Authorization")); // Expose headers if needed
	    
	    source.registerCorsConfiguration("/**", config);

	    return new CorsWebFilter(source);
	}

	
	
	
	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("UserService",r->r.path("/user/**")
					.uri("http://localhost:8081"))
					//  .uri("lb://UserService"))
				.route("FarmerService",r->r.path("/farmer/**")
					.uri("http://localhost:8082"))
				.route("FarmerServiceScheme",r->r.path("/farmer/scheme/**")
						.uri("http://localhost:8082"))
				   // .uri("lb://FarmerService"))
				.route("FarmerServiceCategory",r->r.path("/farmer/category/**")
						.uri("http://localhost:8082"))
					    //.uri("lb://FarmerService"))
				.route("FarmerServiceCart",r->r.path("/farmer/cart/**")
						.uri("http://localhost:8082"))
					   // .uri("lb://FarmerService"))
				.route("FarmerServiceLocation",r->r.path("/farmer/location/**")
						.uri("http://localhost:8082"))
					  //  .uri("lb://FarmerService"))
				.route("FarmerServiceProduct",r->r.path("/farmer/product/**")
						.uri("http://localhost:8082"))
					    //.uri("lb://FarmerService"))
				.route("FarmerServiceProductVendor",r->r.path("/farmer/productvendor/**")
						.uri("http://localhost:8082"))
					   // .uri("lb://FarmerService"))
				.route("FarmerServiceProductRental",r->r.path("/farmer/productrental/**")
						.uri("http://localhost:8082"))
				.route("FarmerServicePayment",r->r.path("/farmer/payment/**")
						.uri("http://localhost:8082"))
					  //  .uri("lb://FarmerService"))
				.route("FarmerServiceOrder",r->r.path("/farmer/order/**")
						.uri("http://localhost:8082"))
					  //  .uri("lb://FarmerService"))
				.route("FarmerServiceOrder",r->r.path("/farmer/brands/**")
						.uri("http://localhost:8082"))
					  //  .uri("lb://FarmerService"))
				.route("FarmerServiceOrder",r->r.path("/farmer/vendor/**")
						.uri("http://localhost:8082"))
					  //  .uri("lb://FarmerService"))
				.route("VendorServiceBrands",r->r.path("/vendor/**")
						.uri("http://localhost:8083"))
					   // .uri("lb://VendorService"))
				.route("VendorServiceBrands",r->r.path("/vendor/brands")
						.uri("http://localhost:8083"))
					   // .uri("lb://VendorService"))
				.route("VendorServiceCategory",r->r.path("/vendor/category")
						.uri("http://localhost:8083"))
					   // .uri("lb://VendorService"))
				.route("VendorServiceProduct",r->r.path("/vendor/product")
						.uri("http://localhost:8083"))
					    //.uri("lb://VendorService"))
				.route("VendorServiceProductVendor",r->r.path("/vendor/productvendor")
						.uri("http://localhost:8083"))
					   // .uri("lb://VendorService"))
				.route("VendorServiceProductRentals",r->r.path("/vendor/productrental/**")
						.uri("http://localhost:8083"))
					    //.uri("lb://VendorService"))
//				.route("VendorServiceProductVendor",r->r.path("/productvendor/**")
//						.uri("http://localhost:8082"))
					   // .uri("lb://VendorService"))
				.route("GovernmenntService",r->r.path("/api/Government/**")
						.uri("http://localhost:8084"))
					  //  .uri("lb://GovernmentService"))
				.route("AdminService",r->r.path("/api/Admin/**")
						.uri("http://localhost:8085"))
					   // .uri("lb://AdminService"))
				.build();
		
	}

}
