package com.web.spring.api.configurations;

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

	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}
}
