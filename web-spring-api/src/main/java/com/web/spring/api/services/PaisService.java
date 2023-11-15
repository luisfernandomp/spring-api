package com.web.spring.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.configurations.ApiResponseMessage;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.dto.PaisDto;
import com.web.spring.api.entities.Pais;
import com.web.spring.api.repositories.PaisRepository;

@Service
public class PaisService implements IPaisService {
    @Autowired
    private PaisRepository repo;

    @Override
    public ApiResponse getAll(){
        var paisx = repo.findAll();
        return new ApiResponse(true, paisx, HttpStatus.OK);
    }

    @Override
    public ApiResponse find(long id){
        return new ApiResponse(true, findById(id), HttpStatus.OK);
    }
    private Optional<Pais> findById(long id){
        return repo.findById(id);
    }

    @Override
    public ApiResponse update(PaisDto dto, long id){
        var paisOpt = findById(id);

        if(paisOpt.isPresent()) {
            paisOpt.get().setNome(dto.getNome());
            paisOpt.get().setContinente(dto.getContinente());
            paisOpt.get().setPopulacao(dto.getPopulacao());
            repo.save(paisOpt.get());
        }
        return new ApiResponse(true, paisOpt, HttpStatus.OK);
    }

    @Override
    public ApiResponse save(paisOpt dto){
        var pais = new Pais(dto.getNome(), dto.getContinente(), dto.getPopulacao());
        repo.save(pais);

        return new ApiResponse(true, new ApiResponseMessage("Pais cadastrado com sucesso"), HttpStatus.OK);
    }

    @Override
    public ApiResponse delete(long id) throws CustomException{
        var pais = findById(id);

        if(!pais.isPresent())
            throw new CustomException("Pais não encontrado");

        repo.delete(pais.get());

        return new ApiResponse(true, new ApiResponseMessage("Pais cadastrado com sucesso"), HttpStatus.OK);
    }

    @Override
    public ApiResponse getByNome(String q) {
        var paises = repo.getByNome(q);

        return new ApiResponse(true, paises, HttpStatus.OK);
    }
}
