package com.sofkau.backend.dom;

import com.sofkau.backend.entity.ToDo;

import java.util.ArrayList;
import java.util.List;

public class ToDoListDTO {
    private Long id;
    private String name;
    private List<ToDo> toDoList = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ToDo> getToDoList() {
        return toDoList;
    }

    public void setToDoList(List<ToDo> toDoList) {
        this.toDoList = toDoList;
    }
}
