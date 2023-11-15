package com.web.spring.api.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.web.spring.api.entities.Pais;

public interface PaisRepository extends JpaRepository<Pais, Long> {
    @Query(value = "SELECT * FROM paises e WHERE e.nome LIKE %:q%",
            nativeQuery = true)
    List<Pais> getByNome(@Param("q") String q);
}
