package com.bikeservicemanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bikeservicemanagement.dto.BikeResponseDto;
import com.bikeservicemanagement.entity.Bike;
import com.bikeservicemanagement.entity.User;
import com.bikeservicemanagement.service.BikeService;
import com.bikeservicemanagement.service.UserService;

@RestController
@RequestMapping("api/bike/")
@CrossOrigin(origins = "http://localhost:3000")
public class BikeController {
	
	
	@Autowired
	private BikeService bikeService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("add")
	public ResponseEntity<?> register(Bike bike) {
		if(bike == null) {
			return new ResponseEntity("bike is null", HttpStatus.BAD_REQUEST);
		}
		
		if(bike.getUserId() == 0) {
			return new ResponseEntity("User Id is null", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (bikeService.addBike(bike) != null) {
			return new ResponseEntity("User Bike added successfully", HttpStatus.OK);
		}

		else {
			return new ResponseEntity("Failed to add Bike", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("all")
	public ResponseEntity<?> getAllBike() {
	
		List<Bike> bikes = this.bikeService.getAllBike();
		
		List<BikeResponseDto> response = new ArrayList<>();
		
		for(Bike bike : bikes) {
            BikeResponseDto b = new BikeResponseDto();
			
			User customer = userService.getUserById(bike.getUserId());
			
			b.setCompany(bike.getCompany());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " "+customer.getLastName());
			b.setId(bike.getId());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setUserId(customer.getId());	
			b.setName(bike.getName());
			
			response.add(b);
		}
		
		return new ResponseEntity(response, HttpStatus.OK);
	}
	
	//this might create problem check for it
	@GetMapping("fetch")	
	public ResponseEntity<?> getAllBikeByUserId(@RequestParam("userId") int userId) {

        List<Bike> bikes = this.bikeService.getBikeByUserId(userId);
		
		List<BikeResponseDto> response = new ArrayList<>();
		
		for(Bike bike : bikes) {
			BikeResponseDto b = new BikeResponseDto();
			
			User customer = userService.getUserById(bike.getUserId());
			
			b.setCompany(bike.getCompany());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " "+customer.getLastName());
			b.setId(bike.getId());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setUserId(customer.getId());	
			b.setName(bike.getName());
			
			response.add(b);
		}
		
		return new ResponseEntity(response, HttpStatus.OK);
	}

}

