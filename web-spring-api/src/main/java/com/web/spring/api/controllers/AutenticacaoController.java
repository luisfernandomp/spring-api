package com.web.spring.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.dto.AuthenticationDto;
import com.web.spring.api.dto.CriarContaDto;
import com.web.spring.api.services.UsuarioService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/auth")
public class AutenticacaoController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDto authDto)
	{
		var response = usuarioService.logar(authDto);
		return new ResponseEntity<>(response, response.getStatus());
	}
	
	@PostMapping("/criar-conta")
	public ResponseEntity<Object> criarConta(@RequestBody @Valid CriarContaDto criarContaDto)
	{
		ApiResponse response = usuarioService.save(criarContaDto);
		return new ResponseEntity<>(response, response.getStatus());
	}
}
