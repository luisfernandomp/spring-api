package com.web.spring.api.dto;

import com.web.spring.api.entities.usuario.UsuarioRole;

public record UsuarioDto (long id, String nome, String senha, String email, boolean ativo, UsuarioRole role) {
	public UsuarioDto {}
}
