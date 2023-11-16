package com.web.spring.api.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ApiResponseMessageDto {
	private List<String> messages;
	
	public ApiResponseMessageDto(List<String> messages) {
		super();
		this.messages = messages;
	}

	public ApiResponseMessageDto(String message) {
		messages = Arrays.asList(message);
	}
	
	public ApiResponseMessageDto() {}

	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}
	
	public void addMessage(String message) {
		if(this.messages == null) 
			this.messages = new ArrayList<String>();
		
		this.messages.add(message);
	}
}
