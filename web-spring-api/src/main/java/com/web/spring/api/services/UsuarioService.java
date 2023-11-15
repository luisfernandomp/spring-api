package com.web.spring.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.spring.api.configurations.ApiResponse;
import com.web.spring.api.configurations.ApiResponseMessage;
import com.web.spring.api.configurations.security.TokenService;
import com.web.spring.api.dto.AuthenticationDto;
import com.web.spring.api.dto.AuthenticationResponseDto;
import com.web.spring.api.dto.CriarContaDto;
import com.web.spring.api.entities.usuario.Usuario;
import com.web.spring.api.repositories.UsuarioRepository;
import com.web.spring.api.services.interfaces.IUsuarioService;


@Service
public class UsuarioService implements IUsuarioService {

	@Autowired
	private UsuarioRepository repo;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Override
	public ApiResponse logar(AuthenticationDto dto) {
		var user = new UsernamePasswordAuthenticationToken(dto.email(), dto.senha());
		var auth = authManager.authenticate(user);
		
		var token = tokenService.generateToken((Usuario)auth.getPrincipal());
		
		return new ApiResponse(true, new AuthenticationResponseDto(token), HttpStatus.OK);
	}
	
	@Override
	public ApiResponse getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ApiResponse find(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ApiResponse update(CriarContaDto dto, long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ApiResponse save(CriarContaDto dto) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		ApiResponseMessage message = new ApiResponseMessage();
		
		if(this.repo.findByEmail(dto.email()) != null) {
			message.addMessage("Usuário já cadastrado");
		}
		else {

			String encryptedPassword = new 
					BCryptPasswordEncoder()
					.encode(dto.senha());
			
			Usuario novoUsuario =
					new Usuario(dto.email(), 
							dto.nome(), 
							encryptedPassword,
							dto.role());
			
			repo.save(novoUsuario);
			message.addMessage("Usuário adicionado com sucesso");
			status = HttpStatus.OK;
			
		}
		return new ApiResponse(false, message, status);
	}
}
