package com.sofkau.backend.controller;

import com.sofkau.backend.dom.dto.ToDoDTO;
import com.sofkau.backend.dom.dto.ToDoListDTO;
import com.sofkau.backend.dom.mapper.ToDoListMapper;
import com.sofkau.backend.entity.ToDo;
import com.sofkau.backend.entity.ToDoList;
import com.sofkau.backend.service.ToDoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api")
public class ToDoListController {
    @Autowired
    private ToDoListService service;

    @Autowired
    private ToDoListMapper toDoListMapper;

    @GetMapping("todosList")
    public List<ToDoListDTO> list(){
        return toDoListMapper.toDTOLists((List<ToDoList>) service.list());
    }

    @PostMapping(value = "todoList")
    public ToDoListDTO save(@RequestBody ToDoListDTO toDoListDTO){
       ToDoList toDoList = service.save(toDoListMapper.toEntity(toDoListDTO));
       return toDoListMapper.toDTO(toDoList);
    }

    @PutMapping(value = "todoList")
    public ToDoListDTO update(@RequestBody ToDoListDTO toDoListDTO){
        if (toDoListDTO != null){
            ToDoList toDoList = service.save(toDoListMapper.toEntity(toDoListDTO));
            return toDoListMapper.toDTO(toDoList);
        }
        throw new RuntimeException("No existe ese id");
    }

    @DeleteMapping(value = "{id}/todoList")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "{id}/todoList")
    public ToDoListDTO get(@PathVariable("id") Long id){
        ToDoList toDoList = service.get(id);
        return toDoListMapper.toDTO(toDoList);
    }
}
