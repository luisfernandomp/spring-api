package com.web.spring.api.dto;

import com.web.spring.api.entities.usuario.UsuarioRole;

public record CriarContaDto (String nome, String email, String senha, UsuarioRole role) {
	
}
