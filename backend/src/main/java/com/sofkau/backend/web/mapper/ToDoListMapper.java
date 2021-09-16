package com.sofkau.backend.web.mapper;

import com.sofkau.backend.web.dto.ToDoListDTO;
import com.sofkau.backend.entity.ToDoList;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ToDoListMapper {
    ToDoMapper INSTANCE = Mappers.getMapper(ToDoMapper.class);
    ToDoListDTO toDTO(ToDoList toDoList);
    ToDoList toEntity(ToDoListDTO toDoListDTO);

    default List<ToDoListDTO> toDTOLists(List<ToDoList> toDoLists){
        if(toDoLists == null) return new ArrayList<>();
        return toDoLists.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
