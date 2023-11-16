package com.web.spring.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.web.spring.api.entities.usuario.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	UserDetails findByEmail(String email);
	public List<Usuario> findAllByOrderByIdAsc();
}
