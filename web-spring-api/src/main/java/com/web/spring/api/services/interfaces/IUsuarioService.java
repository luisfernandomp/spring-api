  package com.web.spring.api.services.interfaces;

import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.AuthenticationDto;
import com.web.spring.api.dto.CriarContaDto;

public interface IUsuarioService {
	ApiResponseDto getAll();
	ApiResponseDto find(long id);
	ApiResponseDto update(CriarContaDto dto, long id);
	ApiResponseDto save(CriarContaDto dto);
	ApiResponseDto logar(AuthenticationDto dto);
}
