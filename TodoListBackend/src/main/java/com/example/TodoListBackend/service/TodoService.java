package com.example.TodoListBackend.service;

import com.example.TodoListBackend.dto.request.TodoRequest;
import com.example.TodoListBackend.dto.response.PageResponse;
import com.example.TodoListBackend.dto.response.TodoResponse;
import com.example.TodoListBackend.entity.Todo;
import com.example.TodoListBackend.exception.AppException;
import com.example.TodoListBackend.exception.ErrorCode;
import com.example.TodoListBackend.mapper.TodoMapper;
import com.example.TodoListBackend.repository.TodoRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TodoService {
    TodoRepository todoRepository;
    TodoMapper todoMapper;

    public TodoResponse createTodo(TodoRequest request) {
        if(todoRepository.existsByTitle(request.getTitle()))
            throw new AppException(ErrorCode.TODO_EXISTED);

        Todo todo = todoMapper.toToDo(request);
        return todoMapper.toToDoReponse(todoRepository.save(todo));
    }

    public PageResponse<TodoResponse> getTodos(String keyword, Boolean completed, Pageable pageable) {
        Page<Todo> todos;
        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();

        if (hasKeyword && completed != null) {
            todos = todoRepository.findByTitleContainingIgnoreCaseAndCompleted(
                    keyword.trim(),
                    completed,
                    pageable
            );
        } else if (hasKeyword) {
            todos = todoRepository.findByTitleContainingIgnoreCase(
                    keyword.trim(),
                    pageable
            );
        } else if (completed != null) {
            todos = todoRepository.findByCompleted(
                    completed,
                    pageable
            );
        } else {
            todos = todoRepository.findAll(pageable);
        }

        Page<TodoResponse> responsePage = todos.map(todoMapper::toToDoReponse);

        return PageResponse.of(responsePage);
    }

    public TodoResponse updateTodo(String id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TODO_NOT_FOUND));

        String newTitle = request.getTitle().trim();

        if (!todo.getTitle().equalsIgnoreCase(newTitle)
                && todoRepository.existsByTitle(newTitle)) {
            throw new AppException(ErrorCode.TODO_EXISTED);
        }

        todo.setTitle(newTitle);
        todo.setDescription(request.getDescription());

        if (request.getCompleted() != null) {
            todo.setCompleted(request.getCompleted());
        }

        return todoMapper.toToDoReponse(todoRepository.save(todo));
    }

    public void deleteTodo(String id) {
        if (!todoRepository.existsById(id)) {
            throw new AppException(ErrorCode.TODO_NOT_FOUND);
        }

        todoRepository.deleteById(id);
    }

    public TodoResponse toggleCompleted(String id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TODO_NOT_FOUND));

        todo.setCompleted(!todo.isCompleted());

        return todoMapper.toToDoReponse(todoRepository.save(todo));
    }

}
