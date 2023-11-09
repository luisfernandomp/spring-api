package com.web.spring.api.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="empregados")
public class Empregado {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private double salario;
	
	@Column(nullable = false)
	private String cargo;

	@Column(nullable = false)
	private LocalDateTime dataCadastro;

	public Empregado() {
		
	}
	public Empregado(String nome, double salario, String cargo) {
		super();
		this.nome = nome;
		this.salario = salario;
		this.cargo = cargo;
		this.dataCadastro = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public double getSalario() {
		return salario;
	}

	public void setSalario(double salario) {
		this.salario = salario;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
}
