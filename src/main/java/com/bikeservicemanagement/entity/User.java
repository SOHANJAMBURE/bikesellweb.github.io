package com.bikeservicemanagement.entity;

import org.springframework.beans.BeanUtils;

import com.bikeservicemanagement.dto.UserDto;
import com.bikeservicemanagement.dto.UserLoginResponse;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String firstName;
	
	private String lastName;
	
	private int age;
	
	private String sex;
	
	private String emailId;
	
	private String contact;
	
	private String street;
	
	private String city;
	
	private String pincode;
	
	private String password;
	
	private String role;
	
	public static UserLoginResponse toUserLoginResponse(User user) {
		UserLoginResponse userLoginResponse=new UserLoginResponse();
		BeanUtils.copyProperties(user, userLoginResponse, "password");		
		return userLoginResponse;
	}
	
	public static UserDto toUserDto(User user) {
		UserDto userDto=new UserDto();
		BeanUtils.copyProperties(user, userDto, "password");		
		return userDto;
	}

}
