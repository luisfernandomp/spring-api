  package com.web.spring.api.services.interfaces;

import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.AuthenticationDto;
import com.web.spring.api.dto.CriarContaDto;
import com.web.spring.api.dto.UsuarioDto;

public interface IUsuarioService {
	ApiResponseDto getAll();
	ApiResponseDto find(long id);
	ApiResponseDto update(UsuarioDto dto, long id);
	ApiResponseDto save(CriarContaDto dto);
	ApiResponseDto logar(AuthenticationDto dto);
}
