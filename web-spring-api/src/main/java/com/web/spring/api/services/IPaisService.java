package com.web.spring.api.services;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.dto.PaisDto;

public interface IPaisService {
    ApiResponse getAll();
    ApiResponse find(long id);
    ApiResponse update(PaisDto dto, long id);
    ApiResponse save(PaisDto dto);
    ApiResponse delete(long id) throws CustomException;
    ApiResponse getByNome(String q);
}
