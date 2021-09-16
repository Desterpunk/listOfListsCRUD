package com.sofkau.backend.dom;

public class ToDoDTO {
    private Long id;
    private String name;
    private boolean isCompleted;
    private Long toDoListId;

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

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public Long getToDoListId() {
        return toDoListId;
    }

    public void setToDoListId(Long toDoListId) {
        this.toDoListId = toDoListId;
    }
}
