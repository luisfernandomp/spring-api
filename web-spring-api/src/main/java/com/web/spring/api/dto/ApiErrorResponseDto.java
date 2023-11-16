package com.web.spring.api.dto;

import java.util.Arrays;
import java.util.List;

public class ApiErrorResponseDto {
	private List<String> erros;
	
	public ApiErrorResponseDto(List<String> erros) {
		super();
		this.erros = erros;
	}

	public ApiErrorResponseDto(String erro) {
		erros = Arrays.asList(erro);
	}

	public List<String> getErros() {
		return erros;
	}

	public void setErros(List<String> erros) {
		this.erros = erros;
	}
	
}
