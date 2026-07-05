package com.example.TodoListBackend.mapper;

import com.example.TodoListBackend.dto.request.TodoRequest;
import com.example.TodoListBackend.dto.response.TodoResponse;
import com.example.TodoListBackend.entity.Todo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TodoMapper {
    Todo toToDo(TodoRequest request);

    TodoResponse toToDoReponse(Todo todo);
}
