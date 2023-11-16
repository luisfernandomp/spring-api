package com.web.spring.api.dto;

public record CarroDto (String modelo, 
						String marca, 
						int ano, 
						String categoria, 
						int empregado_id) 
{}
