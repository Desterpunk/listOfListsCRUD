package com.sofkau.backend.service;

import com.sofkau.backend.entity.ToDoList;
import com.sofkau.backend.repository.ToDoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToDoListService {
    @Autowired
    private ToDoListRepository toDoListRepository;

    public Iterable<ToDoList> list(){
        return toDoListRepository.findAll();
    }

    public ToDoList save(ToDoList toDoList){
        return toDoListRepository.save(toDoList);
    }

    public ToDoList get(Long id){
        return toDoListRepository.findById(id).orElseThrow();
    }

    public void delete(Long id){
        toDoListRepository.delete(get(id));
    }
}
