package com.web.spring.api.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	
	@OneToOne(cascade = CascadeType.ALL, optional = true)
	@JoinColumn(name = "pais_id", referencedColumnName = "id")
	private Pais pais;
	
	@OneToMany(mappedBy = "empregado", fetch = FetchType.LAZY)
	private List<Carro> carros;

	public Empregado() {
		
	}
	public Empregado(String nome, double salario, String cargo, Pais pais) {
		super();
		this.nome = nome;
		this.salario = salario;
		this.cargo = cargo;
		this.dataCadastro = LocalDateTime.now();
		this.pais = pais;
	}

	public Long getId() {
		return id;
	}
	
	public String getNome() {
		return nome;
	}
	
	public void setPais(Pais pais) {
		this.pais = pais;
	}
	
	public Pais getPais() {
		return pais;
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
