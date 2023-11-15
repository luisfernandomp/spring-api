  package com.web.spring.api.services.interfaces;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.dto.AuthenticationDto;
import com.web.spring.api.dto.CriarContaDto;

public interface IUsuarioService {
	ApiResponse getAll();
	ApiResponse find(long id);
	ApiResponse update(CriarContaDto dto, long id);
	ApiResponse save(CriarContaDto dto);
	ApiResponse logar(AuthenticationDto dto);
}
