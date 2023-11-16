package com.web.spring.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.api.dto.UsuarioDto;
import com.web.spring.api.services.UsuarioService;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioService service;
	
	@GetMapping
	public ResponseEntity<Object> getAll()
	{
		var response = service.getAll();
		return new ResponseEntity<>(response, response.getStatus());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findById(@PathVariable long id) {
		var response = service.find(id);
		return new ResponseEntity<>(response, response.getStatus());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> update(@RequestBody UsuarioDto dto, @PathVariable long id)
	{
		var response = service.update(dto, id);
		return new ResponseEntity<>(response, response.getStatus());
	}	
}
