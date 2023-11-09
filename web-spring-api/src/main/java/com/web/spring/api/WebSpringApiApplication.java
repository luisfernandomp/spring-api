package com.web.spring.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@ComponentScan(basePackages = {"com.web.spring.api.controllers"})
@ComponentScan(basePackages = {"com.web.spring.api.repositories"})
@ComponentScan(basePackages = {"com.web.spring.api.services"})
public class WebSpringApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebSpringApiApplication.class, args);
	}

}
