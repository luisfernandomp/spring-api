package com.web.spring.api.configurations;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.web.spring.api.dto.ApiErrorResponseDto;
import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.exceptions.CustomException;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler{

	
	@ExceptionHandler(CustomException.class)
	public ResponseEntity<Object> handleCustomExcepiton(CustomException ex){
		
		var erros = new ApiErrorResponseDto(ex.getMessage());
		var response = new ApiResponseDto(false, erros, HttpStatus.BAD_REQUEST);
		
		return new ResponseEntity<>(response, response.getStatus());
	}
	
}
