package com.example.TodoListBackend.controller;

import com.example.TodoListBackend.dto.ApiResponse;
import com.example.TodoListBackend.dto.request.TodoRequest;
import com.example.TodoListBackend.dto.response.PageResponse;
import com.example.TodoListBackend.dto.response.TodoResponse;
import com.example.TodoListBackend.service.TodoService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TodoController {
    TodoService todoService;

    @PostMapping
    ApiResponse<TodoResponse> createTodo(@Valid @RequestBody TodoRequest request) {
        return ApiResponse.<TodoResponse>builder()
                .result(todoService.createTodo(request))
                .build();
    }

    @GetMapping
    public ApiResponse<PageResponse<TodoResponse>> getTodos(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean completed,
            @PageableDefault(
                    size = 10,
                    sort = "createdAt",
                    direction = Sort.Direction.DESC
            ) Pageable pageable
    ) {
        return ApiResponse.<PageResponse<TodoResponse>>builder()
                .result(todoService.getTodos(keyword, completed, pageable))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<TodoResponse> updateTodo(
            @PathVariable("id") String id,
            @Valid @RequestBody TodoRequest request
    ) {
        return ApiResponse.<TodoResponse>builder()
                .result(todoService.updateTodo(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteTodo(@PathVariable("id") String id) {
        todoService.deleteTodo(id);
        return ApiResponse.<Void>builder()
                .message("Delete todo successfully")
                .build();
    }

    @PatchMapping("/{id}/toggle")
    public ApiResponse<TodoResponse> toggleCompleted(@PathVariable String id) {
        return ApiResponse.<TodoResponse>builder()
                .result(todoService.toggleCompleted(id))
                .build();
    }
}
