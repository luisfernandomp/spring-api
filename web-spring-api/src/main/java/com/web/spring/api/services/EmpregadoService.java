package com.web.spring.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.web.spring.api.dto.ApiResponseDto;
import com.web.spring.api.dto.ApiResponseMessageDto;
import com.web.spring.api.dto.EmpregadoCarroDto;
import com.web.spring.api.dto.EmpregadoDto;
import com.web.spring.api.entities.Carro;
import com.web.spring.api.entities.Empregado;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.repositories.CarroRepository;
import com.web.spring.api.repositories.EmpregadoRepository;
import com.web.spring.api.services.interfaces.IEmpregadoService;

@Service
public class EmpregadoService implements IEmpregadoService{

	@Autowired
	private EmpregadoRepository repo;
	
	@Autowired
	private CarroRepository repoCarro;
	
	@Override
	public ApiResponseDto getAll(){
		var emp = repo.findAll();		

		return new ApiResponseDto(true, emp, HttpStatus.OK);
	}
	
	@Override
	public ApiResponseDto find(long id){
		return new ApiResponseDto(true, findById(id), HttpStatus.OK);
	}
	
	private Optional<Empregado> findById(long id){
		return repo.findById(id);
	}
	
	@Override
	public ApiResponseDto update(EmpregadoDto dto, long id){
		
		var empregadoOpt = findById(id);
		
		if(empregadoOpt.isPresent()) {
			empregadoOpt.get().setCargo(dto.cargo());
			empregadoOpt.get().setNome(dto.nome());
			empregadoOpt.get().setSalario(dto.salario());
			repo.save(empregadoOpt.get());
		}
		
		return new ApiResponseDto(true, empregadoOpt, HttpStatus.OK);
	}
	
	@Override
	public ApiResponseDto save(EmpregadoDto dto)
	{
		var empregado = new Empregado(dto.nome(), dto.salario(), dto.cargo());
		repo.save(empregado);
		
		ArrayList<Carro> carros = new ArrayList<>();
				
		for(EmpregadoCarroDto c : dto.carros()) {
			var carro = new Carro(c.modelo(), c.marca(), c.ano(), c.categoria(), empregado);
			repoCarro.save(carro);
					
			carros.add(carro);
		}
       
		return new ApiResponseDto(true, new ApiResponseMessageDto("Empregado cadastrado com sucesso"), HttpStatus.OK);
	}
	
	@Override
	public ApiResponseDto delete(long id) throws CustomException
	{
		var empregado = findById(id);
		
		if(!empregado.isPresent())
			throw new CustomException("Empregado não encontrado");
			
		repo.delete(empregado.get());
   
		return new ApiResponseDto(true, new ApiResponseMessageDto("Empregado cadastrado com sucesso"), HttpStatus.OK);
	}
	
	@Override
	public ApiResponseDto getByNome(String q) {
		
		var empregados = repo.getByNome(q);
		
		return new ApiResponseDto(true, empregados, HttpStatus.OK);
	}
	
}
