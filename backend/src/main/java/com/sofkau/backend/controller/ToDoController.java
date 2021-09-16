package com.sofkau.backend.controller;

import com.sofkau.backend.dom.dto.ToDoDTO;
import com.sofkau.backend.dom.mapper.ToDoMapper;
import com.sofkau.backend.entity.ToDo;
import com.sofkau.backend.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api")
public class ToDoController {
    @Autowired
    private ToDoService service;

    @Autowired
    private ToDoMapper toDoMapper;

    @GetMapping(value = "todos")
    public List<ToDoDTO> list(){
        return toDoMapper.toDTOList((List<ToDo>) service.list());
    }

    @PostMapping(value = "todo")
    public ToDoDTO save(@RequestBody ToDoDTO toDoDTO){
        ToDo toDo = service.save(toDoMapper.toEntity(toDoDTO));
        return toDoMapper.toDTO(toDo);
    }

    @PutMapping(value = "todo")
    public ToDoDTO update(@RequestBody ToDoDTO toDoDTO){
        if (toDoDTO.getId() != null){
            ToDo toDo = service.save(toDoMapper.toEntity(toDoDTO));
            return toDoMapper.toDTO(toDo);
        }
        throw new RuntimeException("No existe ese id");
    }

    @DeleteMapping(value = "{id}/todo")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "{id}/todo")
    public ToDoDTO get(@PathVariable("id") Long id){
        ToDo toDo = service.get(id);
        return toDoMapper.toDTO(toDo);
    }
}
