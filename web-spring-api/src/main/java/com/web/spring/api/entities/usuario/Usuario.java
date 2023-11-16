package com.web.spring.api.entities.usuario;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.web.spring.api.dto.UsuarioDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	@Column(name = "nome", nullable = false, length = 500)
	private String nome;
	
	@Column(name = "email", nullable = false, length = 500, unique = true)
	private String email;
	
	@Column(name = "senha", nullable = false, length = 600)
	private String senha;
	
	@Column(name = "role", nullable = false, length = 650)
	private UsuarioRole role;
	
	@Column(name = "ativo", nullable = false)
	private boolean ativo;
	
	@Column(name = "dataCadastro", nullable = false)
	private LocalDateTime dataCadastro;
	
	public Usuario(String email, String nome, String senha, UsuarioRole role) {
		this.email = email;
		this.nome = nome;
		this.senha = senha;
		this.role = role;
		this.dataCadastro = LocalDateTime.now();
		this.ativo = true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if(this.role == UsuarioRole.ADMIN)
			return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
					new SimpleGrantedAuthority("ROLE_USER"));
		
		return List.of(new SimpleGrantedAuthority("ROLE_USER"));
	}
	
	public UsuarioDto toDto() {
		return new UsuarioDto(id, nome, email, ativo, role);
	}
	
	public void alterar(UsuarioDto dto) {
		nome = dto.nome();
		email = dto.email();
		role = dto.role();
		ativo = dto.ativo();
	}

	@Override
	public String getPassword() {
		return senha;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
