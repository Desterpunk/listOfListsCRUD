package com.sofkau.backend.repository;

import com.sofkau.backend.entity.ToDoList;
import org.springframework.data.repository.CrudRepository;

public interface ToDoListRepository extends CrudRepository<ToDoList,Long> {
}
