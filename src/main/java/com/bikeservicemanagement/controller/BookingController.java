package com.bikeservicemanagement.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bikeservicemanagement.dao.UpdateBookingStatusRequestDto;
import com.bikeservicemanagement.dto.BookingResponseDto;
import com.bikeservicemanagement.dto.CommanApiResponse;
import com.bikeservicemanagement.entity.Bike;
import com.bikeservicemanagement.entity.Booking;
import com.bikeservicemanagement.entity.User;
import com.bikeservicemanagement.service.BikeService;
import com.bikeservicemanagement.service.BookingService;
import com.bikeservicemanagement.service.UserService;
import com.bikeservicemanagement.utility.Constants.BookingStatus;
import com.bikeservicemanagement.utility.Constants.ResponseCode;
import com.bikeservicemanagement.utility.Helper;

@RestController
@RequestMapping("api/book/bike")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {


	@Autowired
	private BookingService bookingService;

	@Autowired
	private UserService userService;

	@Autowired
	private BikeService bikeService;

	@PostMapping("service")

	public ResponseEntity<?> book(@RequestBody Booking booking) {

		System.out.println(booking);

		CommanApiResponse response = new CommanApiResponse();

		if (booking == null) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Booking Failed");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		if (booking.getUserId() == 0) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("User is not not looged in");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		if (booking.getBikeId() == 0) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Bike not found to Book");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		Bike bike = bikeService.getBikeById(booking.getBikeId());

		if (bike == null) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("No bike present with this Id");
		}

		booking.setBookingDate(LocalDate.now().toString());
		booking.setStatus(BookingStatus.PENDING.value());
		booking.setBookingId(Helper.getAlphaNumericId());

		Booking bookedService = this.bookingService.addBooking(booking);

		if (bookedService != null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Bike Booked Successfully, Please Check Approval Status on Booking Option");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Book Bike Service");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	@GetMapping("/fetch/all")
	public ResponseEntity<?> fetchAllHotelBooking() {


		List<BookingResponseDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getAllBooking();

		for (Booking booking : allBookings) {

			BookingResponseDto b = new BookingResponseDto();

			User customer = this.userService.getUserById(booking.getUserId());
			Bike bike = this.bikeService.getBikeById(booking.getBikeId());

			b.setBookingId(booking.getBookingId());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
			b.setBookDate(booking.getBookDate());
			b.setBookingDate(booking.getBookingDate());
			b.setBikeId(booking.getBikeId());
			b.setBikeName(bike.getName());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setCompany(bike.getCompany());
			b.setId(booking.getId());
			b.setStatus(booking.getStatus());
			b.setUserId(customer.getId());

			bookings.add(b);
		}

		return new ResponseEntity(bookings, HttpStatus.OK);

	}

	@GetMapping("/fetch")
	public ResponseEntity<?> fetchMyBooking(@RequestParam("userId") int userId) {
		
		List<BookingResponseDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getBookingsByUserId(userId);

		for (Booking booking : allBookings) {

			BookingResponseDto b = new BookingResponseDto();

			User customer = this.userService.getUserById(booking.getUserId());
			Bike bike = this.bikeService.getBikeById(booking.getBikeId());

			b.setBookingId(booking.getBookingId());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
			b.setBookDate(booking.getBookDate());
			b.setBookingDate(booking.getBookingDate());
			b.setBikeId(booking.getBikeId());
			b.setBikeName(bike.getName());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setCompany(bike.getCompany());
			b.setId(booking.getId());
			b.setStatus(booking.getStatus());
			b.setUserId(customer.getId());

			bookings.add(b);
		}

		return new ResponseEntity(bookings, HttpStatus.OK);

	}

	@GetMapping("/fetch/{bookingId}")
	public ResponseEntity<?> fetchBooking(@RequestParam("id") int bookingId) {
	
		Booking booking = this.bookingService.getBookById(bookingId);

		BookingResponseDto b = new BookingResponseDto();
		
			User customer = this.userService.getUserById(booking.getUserId());
			Bike bike = this.bikeService.getBikeById(booking.getBikeId());

			b.setBookingId(booking.getBookingId());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
			b.setBookDate(booking.getBookDate());
			b.setBookingDate(booking.getBookingDate());
			b.setBikeId(booking.getBikeId());
			b.setBikeName(bike.getName());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setCompany(bike.getCompany());
			b.setId(booking.getId());
			b.setStatus(booking.getStatus());
			b.setUserId(customer.getId());

	
		return new ResponseEntity(b, HttpStatus.OK);

	}

	@GetMapping("/fetch/status")

	public ResponseEntity<?> fetchAllBookingStatus() {
	
		List<String> response = new ArrayList<>();

		for (BookingStatus status : BookingStatus.values()) {
			response.add(status.value());
		}

		return new ResponseEntity(response, HttpStatus.OK);

	}

	@PostMapping("/update/status")

	public ResponseEntity<?> updateGroundBookingStatus(@RequestBody UpdateBookingStatusRequestDto request) {


		if (request == null) {
			return new ResponseEntity("Request found NULL", HttpStatus.BAD_REQUEST);
		}

		Booking book = this.bookingService.getBookById(request.getBookingId());

		if (BookingStatus.PENDING.value().equals(request.getStatus())) {
			return new ResponseEntity("Can't update Booking status to Pending", HttpStatus.BAD_REQUEST);
		}

		book.setStatus(request.getStatus());
		this.bookingService.addBooking(book);

		return new ResponseEntity("Booking " + book.getStatus() + "Successfully", HttpStatus.OK);

	}

}
