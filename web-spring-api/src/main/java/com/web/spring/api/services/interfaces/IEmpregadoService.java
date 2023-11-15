package com.web.spring.api.services.interfaces;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.dto.EmpregadoDto;
import com.web.spring.api.exceptions.CustomException;

public interface IEmpregadoService {
	ApiResponse getAll();
	ApiResponse find(long id);
	ApiResponse update(EmpregadoDto dto, long id);
	ApiResponse save(EmpregadoDto dto);
	ApiResponse delete(long id) throws CustomException;
	ApiResponse getByNome(String q);
}
