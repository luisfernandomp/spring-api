package com.web.spring.api.services.interfaces;

import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.EmpregadoDto;
import com.web.spring.api.exceptions.CustomException;

public interface IEmpregadoService {
	ApiResponseDto getAll();
	ApiResponseDto find(long id);
	ApiResponseDto update(EmpregadoDto dto, long id);
	ApiResponseDto save(EmpregadoDto dto);
	ApiResponseDto delete(long id) throws CustomException;
	ApiResponseDto getByNome(String q);
}
