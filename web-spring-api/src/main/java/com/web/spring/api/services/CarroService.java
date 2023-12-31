package com.web.spring.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.ApiResponseMessageDto;
import com.web.spring.api.dto.CarroDto;
import com.web.spring.api.entities.Carro;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.repositories.CarroRepository;
import com.web.spring.api.repositories.EmpregadoRepository;

@Service
public class CarroService implements ICarroService {
    @Autowired
    private CarroRepository repo;

    @Autowired
    private EmpregadoRepository repoEmpregado;
    
    @Override
    public ApiResponseDto getAll(){
        var car = repo.findAll();
        return new ApiResponseDto(true, car, HttpStatus.OK);
    }

    @Override
    public ApiResponseDto find(long id){
        return new ApiResponseDto(true, findById(id), HttpStatus.OK);
    }
    private Optional<Carro> findById(long id){
        return repo.findById(id);
    }

    @Override
    public ApiResponseDto update(CarroDto dto, long id){
        var carroOpt = findById(id);

        if(carroOpt.isPresent()) {
            carroOpt.get().setModelo(dto.modelo());
            carroOpt.get().setMarca(dto.marca());
            carroOpt.get().setAno(dto.ano());
            carroOpt.get().setCategoria(dto.categoria());
            repo.save(carroOpt.get());
        }
        return new ApiResponseDto(true, carroOpt, HttpStatus.OK);
    }


    @Override
    public ApiResponseDto delete(long id) throws CustomException{
        var carro = findById(id);

        if(!carro.isPresent())
            throw new CustomException("Carro não encontrado");

        repo.delete(carro.get());

        return new ApiResponseDto(true, new ApiResponseMessageDto("Carro cadastrado com sucesso"), HttpStatus.OK);
    }

    @Override
    public ApiResponseDto getByModelo(String q) {
        var carros = repo.getByModelo(q);

        return new ApiResponseDto(true, carros, HttpStatus.OK);
    }

	@Override
	public ApiResponseDto save(CarroDto dto) {
		var empregado = repoEmpregado.findById(dto.empregado_id());
		
		if(!empregado.isPresent())
			return new ApiResponseDto(false, null, HttpStatus.BAD_REQUEST);
		
		var carro = new Carro(dto.modelo(), dto.marca(), dto.ano(), dto.categoria(), empregado.get());
	
		repo.save(carro);
		
		return new ApiResponseDto(true, null, HttpStatus.OK);
	}

	@Override
	public ApiResponseDto getAllByEmpregadoId(long id) {
		
		var carros = repo.getAllByEmpregadoId(id);
		return new ApiResponseDto(true, carros, HttpStatus.OK);
	}
}
