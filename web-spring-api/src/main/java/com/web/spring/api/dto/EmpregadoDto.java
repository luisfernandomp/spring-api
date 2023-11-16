package com.web.spring.api.dto;

public record EmpregadoDto (long id,
							String nome,
							String cargo,
							double salario,
							EmpregadoCarroDto[] carros)
{}
