package com.web.spring.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.spring.api.entities.Carro;

public interface CarroRepository extends JpaRepository<Carro, Long> {
    @Query(value = "SELECT * FROM carros e WHERE e.modelo LIKE %:q%",
            nativeQuery = true)
    List<Carro> getByModelo(@Param("q") String q);
    
    @Query(value = "SELECT * FROM carros c WHERE c.empregado_id = :id",
            nativeQuery = true)
    List<Carro> getAllByEmpregadoId(@Param("id") long id);
    
    @Query(value = "SELECT * FROM carros c WHERE c.empregado_id = :id", 
			nativeQuery = true)
	List<Carro> getCarros(@Param("id") long id);
}
