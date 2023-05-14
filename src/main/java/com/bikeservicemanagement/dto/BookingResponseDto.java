package com.bikeservicemanagement.dto;

import lombok.Data;

@Data
public class BookingResponseDto {
	
    private int id;
    
	private String bookingId;
	
	private String bookingDate;
	
	private String bookDate;
	
	private int userId;
	
	private int bikeId;
	
	private String status;
	
	private String customerName;
	
	private String customerContact;
	
	private String bikeName;
	
	private String registrationNo;
	
	private String modelNo;
	
	private String company;
	
}
