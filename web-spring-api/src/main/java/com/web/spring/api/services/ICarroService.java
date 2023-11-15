package com.web.spring.api.services;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.dto.CarroDto;

public interface ICarroService {
    ApiResponse getAll();
    ApiResponse find(long id);
    ApiResponse update(CarroDto dto, long id);
    ApiResponse save(CarroDto dto);
    ApiResponse delete(long id) throws CustomException;
    ApiResponse getByModelo(String q);
}
