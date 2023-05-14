package com.bikeservicemanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bikeservicemanagement.dto.CommanApiResponse;
import com.bikeservicemanagement.dto.UserLoginRequest;
import com.bikeservicemanagement.dto.UserLoginResponse;
import com.bikeservicemanagement.dto.UserRoleResponse;
import com.bikeservicemanagement.dto.UsersResponseDto;
import com.bikeservicemanagement.entity.User;
import com.bikeservicemanagement.service.CustomUserDetailsService;
import com.bikeservicemanagement.service.UserService;
import com.bikeservicemanagement.utility.Constants.ResponseCode;
import com.bikeservicemanagement.utility.Constants.Sex;
import com.bikeservicemanagement.utility.Constants.UserRole;
import com.bikeservicemanagement.utility.JwtUtil;

@RestController
@RequestMapping("api/user/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	@GetMapping("roles")
	public ResponseEntity<?> getAllUsers() {
		
		UserRoleResponse response = new UserRoleResponse();
		List<String> roles = new ArrayList<>();
		
		for(UserRole role : UserRole.values() ) {
			roles.add(role.value());
		}
		
		if(roles.isEmpty()) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Fetch User Roles");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		else {
		    response.setRoles(roles);
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("User Roles Fetched success");
			return new ResponseEntity(response, HttpStatus.OK);
		}
		
	}
	
	@GetMapping("gender")
	public ResponseEntity<?> getAllUserGender() {
		
		UserRoleResponse response = new UserRoleResponse();
		List<String> genders = new ArrayList<>();
		
		for(Sex gender : Sex.values() ) {
			genders.add(gender.value());
		}
		
		if(genders.isEmpty()) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Fetch User Genders");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		else {
			response.setGenders(genders);
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("User Genders Fetched success");
			return new ResponseEntity(response, HttpStatus.OK);
		}
		
	}
	
	
	@PostMapping("register")
	public ResponseEntity<?> register(@RequestBody User user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());

		user.setPassword(encodedPassword);
		
		CommanApiResponse  response = new CommanApiResponse();

		User registerUser = userService.registerUser(user);

		if (registerUser != null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage(user.getRole() + " User Registered Successfully");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Register " + user.getRole() + " User");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("login")

	public ResponseEntity<?> login(@RequestBody UserLoginRequest userLoginRequest) {
	
		String jwtToken = null;
		UserLoginResponse useLoginResponse = new UserLoginResponse();
        User user = null;
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(userLoginRequest.getEmailId(), userLoginRequest.getPassword()));
		} catch (Exception ex) {
			useLoginResponse.setResponseCode(ResponseCode.FAILED.value());
			useLoginResponse.setResponseMessage("Failed to Login as " + userLoginRequest.getEmailId());
			return new ResponseEntity(useLoginResponse, HttpStatus.BAD_REQUEST);
		}

		UserDetails userDetails = customUserDetailsService.loadUserByUsername(userLoginRequest.getEmailId());

		for (GrantedAuthority grantedAuthory : userDetails.getAuthorities()) {
			if (grantedAuthory.getAuthority().equals(userLoginRequest.getRole())) {
				jwtToken = jwtUtil.generateToken(userDetails.getUsername());
			}
		}

		// user is authenticated
		if (jwtToken != null) {

			user = userService.getUserByEmailId(userLoginRequest.getEmailId());
			
			useLoginResponse = User.toUserLoginResponse(user);
			
			useLoginResponse.setResponseCode(ResponseCode.SUCCESS.value());
			useLoginResponse.setResponseMessage(user.getFirstName() + " logged in Successful");
			useLoginResponse.setJwtToken(jwtToken);
			return new ResponseEntity(useLoginResponse, HttpStatus.OK);
		
		}

		else {

			useLoginResponse.setResponseCode(ResponseCode.FAILED.value());
			useLoginResponse.setResponseMessage("Failed to Login as " + userLoginRequest.getEmailId());
			return new ResponseEntity(useLoginResponse, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("id")
	public ResponseEntity<?> fetchUser(@RequestParam("userId") int userId) {
		
		UsersResponseDto response = new UsersResponseDto();
		
		User user = userService.getUserById(userId);
		
		if(user == null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("No User with this Id present");
		}
		
		response.setUser(user);
		response.setResponseCode(ResponseCode.SUCCESS.value());
		response.setResponseMessage("User Fetched Successfully");
		
		return new ResponseEntity(response, HttpStatus.OK);
	}
	
	@GetMapping("customer/all")
	public ResponseEntity<?> getAllCustomer() {
		System.out.println("recieved request for getting ALL Customer!!!");
		
		List<User> deliveryPersons = this.userService.getAllUserByRole(UserRole.CUSTOMER.value());
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(deliveryPersons);
	}

}
