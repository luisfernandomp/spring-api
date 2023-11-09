package com.web.spring.api.configurations;

import java.util.Arrays;
import java.util.List;

public class ApiErrorResponse {
	private List<String> erros;
	
	public ApiErrorResponse(List<String> erros) {
		super();
		this.erros = erros;
	}

	public ApiErrorResponse(String erro) {
		erros = Arrays.asList(erro);
	}

	public List<String> getErros() {
		return erros;
	}

	public void setErros(List<String> erros) {
		this.erros = erros;
	}
	
}
