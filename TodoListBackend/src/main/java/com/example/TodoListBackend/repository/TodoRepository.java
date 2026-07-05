package com.example.TodoListBackend.repository;

import com.example.TodoListBackend.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, String> {
    boolean existsByTitle(String title);
    Page<Todo> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Todo> findByCompleted(Boolean completed, Pageable pageable);

    Page<Todo> findByTitleContainingIgnoreCaseAndCompleted(
            String keyword,
            Boolean completed,
            Pageable pageable
    );
}
