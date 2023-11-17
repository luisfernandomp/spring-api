package com.web.spring.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.spring.api.entities.Empregado;

public interface EmpregadoRepository extends JpaRepository<Empregado, Long> 
{
	@Query(value = "SELECT * FROM empregados e WHERE e.nome LIKE %:q%", 
			nativeQuery = true)
	List<Empregado> getByNome(@Param("q") String q); 
	
	
	@Query(value = "SELECT * FROM empregados e WHERE e.pais_id = :id", 
			nativeQuery = true)
	List<Empregado> getByPais(@Param("id") long id);	
}
