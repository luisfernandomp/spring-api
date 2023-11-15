package com.web.spring.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.configurations.ApiResponseMessage;
import com.web.spring.api.dto.CarroDto;
import com.web.spring.api.entities.Carro;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.repositories.CarroRepository;

@Service
public class CarroService implements ICarroService {
    @Autowired
    private CarroRepository repo;

    @Override
    public ApiResponse getAll(){
        var car = repo.findAll();
        return new ApiResponse(true, car, HttpStatus.OK);
    }

    @Override
    public ApiResponse find(long id){
        return new ApiResponse(true, findById(id), HttpStatus.OK);
    }
    private Optional<Carro> findById(long id){
        return repo.findById(id);
    }

    @Override
    public ApiResponse update(CarroDto dto, long id){
        var carroOpt = findById(id);

        if(carroOpt.isPresent()) {
            carroOpt.get().setModelo(dto.getModelo());
            carroOpt.get().setMarca(dto.getMarca());
            carroOpt.get().setAno(dto.getAno());
            carroOpt.get().setCategoria(dto.getCategoria());
            repo.save(carroOpt.get());
        }
        return new ApiResponse(true, carroOpt, HttpStatus.OK);
    }


    @Override
    public ApiResponse delete(long id) throws CustomException{
        var carro = findById(id);

        if(!carro.isPresent())
            throw new CustomException("Carro não encontrado");

        repo.delete(carro.get());

        return new ApiResponse(true, new ApiResponseMessage("Carro cadastrado com sucesso"), HttpStatus.OK);
    }

    @Override
    public ApiResponse getByModelo(String q) {
        var carros = repo.getByModelo(q);

        return new ApiResponse(true, carros, HttpStatus.OK);
    }

	@Override
	public ApiResponse save(CarroDto dto) {
		// TODO Auto-generated method stub
		return null;
	}
}
