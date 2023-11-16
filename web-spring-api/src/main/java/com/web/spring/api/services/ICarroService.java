package com.web.spring.api.services;

import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.CarroDto;
import com.web.spring.api.exceptions.CustomException;

public interface ICarroService {
    ApiResponseDto getAll();
    ApiResponseDto find(long id);
    ApiResponseDto update(CarroDto dto, long id);
    ApiResponseDto save(CarroDto dto);
    ApiResponseDto delete(long id) throws CustomException;
    ApiResponseDto getByModelo(String q);
    ApiResponseDto getAllByEmpregadoId(long id);
}
