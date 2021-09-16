package com.sofkau.backend.repository;

import com.sofkau.backend.entity.ToDo;
import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDo,Long> {
}
