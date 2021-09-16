package com.sofkau.backend.dom.mapper;

import com.sofkau.backend.dom.dto.ToDoListDTO;
import com.sofkau.backend.entity.ToDoList;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ToDoListMapper {
    ToDoListMapper INSTANCE = Mappers.getMapper(ToDoListMapper.class);
    ToDoListDTO toDTO(ToDoList toDoList);
    ToDoList toEntity(ToDoListDTO toDoListDTO);

    default List<ToDoListDTO> toDTOLists(List<ToDoList> toDoLists){
        if(toDoLists == null) return new ArrayList<>();
        return toDoLists.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
