package com.web.spring.api.dto;

public record CarroDto (String modelo, 
						String marca, 
						int ano, 
						String categoria, 
						long empregado_id) 
{}
