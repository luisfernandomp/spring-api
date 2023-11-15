package com.web.spring.api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="paises")
public class Pais {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String continente;

    @Column(nullable = false)
    private int populacao;

    public Pais() {}
    public Pais(String nome, String continente, int populacao) {
        super();
        this.nome = nome;
        this.continente = continente;
        this.populacao = populacao;
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

    public String getContinente() {
        return continente;
    }
    public void setContinente(String continente) {
        this.continente = continente;
    }

    public int getPopulacao() {
        return populacao;
    }
    public void setPopulacao(int populacao) {
        this.populacao = populacao;
    }
}
