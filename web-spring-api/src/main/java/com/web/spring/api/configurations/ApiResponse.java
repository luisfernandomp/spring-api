package com.web.spring.api.configurations;

import org.springframework.http.HttpStatus;

public class ApiResponse {

    private boolean success;
    private Object data;
    private HttpStatus status;

    public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public ApiResponse(boolean success, Object data, HttpStatus status) {
		super();
		this.success = success;
		this.data = data;
		this.status = status;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
}
