package com.web.spring.api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="carros")
public class Carro {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private int ano;

    @Column(nullable = false)
    private String categoria;

    @ManyToOne(optional = true)
    @JoinColumn(name = "empregado_id")
    private Empregado empregado;
    
    public Empregado getEmpregado() {
    	return empregado;
    }
    
    public void setEmpregado(Empregado empregado) {
    	this.empregado = empregado;
    }
    
    public Carro(){}

    public Carro(String modelo, String marca, int ano, String categoria, Empregado empregado) {
        super();
        this.modelo = modelo;
        this.marca = marca;
        this.ano = ano;
        this.categoria = categoria;
        this.empregado = empregado;
    }

    public Long getId() {
        return id;
    }

    public String getModelo() {
        return modelo;
    }
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }

    public int getAno() {
        return ano;
    }
    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
