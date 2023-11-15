package com.web.spring.api.configurations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ApiResponseMessage {
	private List<String> messages;
	
	public ApiResponseMessage(List<String> messages) {
		super();
		this.messages = messages;
	}

	public ApiResponseMessage(String message) {
		messages = Arrays.asList(message);
	}
	
	public ApiResponseMessage() {}

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
