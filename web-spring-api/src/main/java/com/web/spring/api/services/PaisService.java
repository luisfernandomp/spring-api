package com.web.spring.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.ApiResponseMessageDto;
import com.web.spring.api.dto.PaisDto;
import com.web.spring.api.entities.Pais;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.repositories.PaisRepository;

@Service
public class PaisService implements IPaisService {
    @Autowired
    private PaisRepository repo;

    @Override
    public ApiResponseDto getAll(){
        var paisx = repo.findAll();
        return new ApiResponseDto(true, paisx, HttpStatus.OK);
    }

    @Override
    public ApiResponseDto find(long id){
        return new ApiResponseDto(true, findById(id), HttpStatus.OK);
    }
    private Optional<Pais> findById(long id){
        return repo.findById(id);
    }

    @Override
    public ApiResponseDto update(PaisDto dto, long id){
        var paisOpt = findById(id);

        if(paisOpt.isPresent()) {
            paisOpt.get().setNome(dto.nome());
            paisOpt.get().setContinente(dto.continente());
            paisOpt.get().setPopulacao(dto.populacao());
            repo.save(paisOpt.get());
        }
        return new ApiResponseDto(true, paisOpt, HttpStatus.OK);
    }

    /*@Override
    public ApiResponse save(paisOpt dto){
        var pais = new Pais(dto.getNome(), dto.getContinente(), dto.getPopulacao());
        repo.save(pais);

        return new ApiResponse(true, new ApiResponseMessage("Pais cadastrado com sucesso"), HttpStatus.OK);
    }*/

    @Override
    public ApiResponseDto delete(long id) throws CustomException{
        var pais = findById(id);

        if(!pais.isPresent())
            throw new CustomException("Pais não encontrado");

        repo.delete(pais.get());

        return new ApiResponseDto(true, new ApiResponseMessageDto("Pais cadastrado com sucesso"), HttpStatus.OK);
    }

    @Override
    public ApiResponseDto getByNome(String q) {
        var paises = repo.getByNome(q);

        return new ApiResponseDto(true, paises, HttpStatus.OK);
    }

	@Override
	public ApiResponseDto save(PaisDto dto) {
		// TODO Auto-generated method stub
		return null;
	}
}
