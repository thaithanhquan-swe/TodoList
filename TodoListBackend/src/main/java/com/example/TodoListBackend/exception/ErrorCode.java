package com.example.TodoListBackend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1002, "Invalid message key", HttpStatus.BAD_REQUEST),

    TODO_EXISTED(1001, "Todo with title already exists", HttpStatus.BAD_REQUEST),
    TODO_NOT_FOUND(1003, "Todo not found", HttpStatus.NOT_FOUND);

    private int code;
    private String message;
    private HttpStatusCode statusCode;

}
