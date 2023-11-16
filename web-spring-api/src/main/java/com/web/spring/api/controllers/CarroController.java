package com.web.spring.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.spring.api.dto.CarroDto;
import com.web.spring.api.exceptions.CustomException;
import com.web.spring.api.services.CarroService;

@RestController
@RequestMapping("api/carros")
public class CarroController {
    @Autowired
    private CarroService service;

    @GetMapping
    public ResponseEntity<Object> getCarros() {
        var response = service.getAll();
        return new ResponseEntity<>(response, response.getStatus());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable long id) {
        var response = service.find(id);
        return new ResponseEntity<>(response, response.getStatus());
    }
    
    @GetMapping("/empregado/{id}")
    public ResponseEntity<Object> getAllByEmpregadoId(@PathVariable long id){
    	var response = service.getAllByEmpregadoId(id);
    	return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("filtro")
    public ResponseEntity<Object> getByModelo(@RequestParam String q){
        var response = service.getByModelo(q);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping
    public ResponseEntity<Object> createCarro(@RequestBody CarroDto dto) {
        var response = service.save(dto);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCarro(@RequestBody CarroDto dto, @PathVariable long id) {
        var response = service.update(dto, id);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id) throws CustomException {
        var response = service.delete(id);
        return new ResponseEntity<>(response, response.getStatus());
    }
}
