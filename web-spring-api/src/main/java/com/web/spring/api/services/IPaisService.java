package com.web.spring.api.services;

import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.PaisDto;

public interface IPaisService {
    ApiResponseDto getAll();
    ApiResponseDto find(long id);
    ApiResponseDto update(PaisDto dto, long id);
    ApiResponseDto save(PaisDto dto);
    ApiResponseDto delete(long id) throws CustomException;
    ApiResponseDto getByNome(String q);
}
