package com.web.spring.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.configurations.ApiResponseMessage;
import com.web.spring.api.dto.EmpregadoDto;
import com.web.spring.api.entities.Empregado;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.repositories.EmpregadoRepository;

@Service
public class EmpregadoService implements IEmpregadoService{

	@Autowired
	private EmpregadoRepository repo;
	
	@Override
	public ApiResponse getAll(){
		var emp = repo.findAll();
		return new ApiResponse(true, emp, HttpStatus.OK);
	}
	
	@Override
	public ApiResponse find(long id){
		return new ApiResponse(true, findById(id), HttpStatus.OK);
	}
	
	private Optional<Empregado> findById(long id){
		return repo.findById(id);
	}
	
	@Override
	public ApiResponse update(EmpregadoDto dto, long id){

		var empregadoOpt = findById(id);
		
		if(empregadoOpt.isPresent()) {
			empregadoOpt.get().setCargo(dto.getCargo());
			empregadoOpt.get().setNome(dto.getNome());
			empregadoOpt.get().setSalario(dto.getSalario());
			repo.save(empregadoOpt.get());
		}
		
		return new ApiResponse(true, empregadoOpt, HttpStatus.OK);
	}
	
	@Override
	public ApiResponse save(EmpregadoDto dto)
	{
		var empregado = new Empregado(dto.getNome(), dto.getSalario(), dto.getCargo());
		repo.save(empregado);
       
		return new ApiResponse(true, new ApiResponseMessage("Empregado cadastrado com sucesso"), HttpStatus.OK);
	}
	
	@Override
	public ApiResponse delete(long id) throws CustomException
	{
		var empregado = findById(id);
		
		if(!empregado.isPresent())
			throw new CustomException("Empregado não encontrado");
			
		repo.delete(empregado.get());
   
		return new ApiResponse(true, new ApiResponseMessage("Empregado cadastrado com sucesso"), HttpStatus.OK);
	}
	
	@Override
	public ApiResponse getByNome(String q) {
		
		var empregados = repo.getByNome(q);
		
		return new ApiResponse(true, empregados, HttpStatus.OK);
	}
	
}
