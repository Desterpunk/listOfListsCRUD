package com.sofkau.backend.dom.mapper;

import com.sofkau.backend.dom.dto.ToDoDTO;
import com.sofkau.backend.entity.ToDo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ToDoMapper {
    ToDoMapper INSTANCE = Mappers.getMapper(ToDoMapper.class);
    ToDoDTO toDTO(ToDo toDo);
    ToDo toEntity(ToDoDTO toDoDTO);


    default List<ToDoDTO> toDTOList(List<ToDo> toDoList){
        if(toDoList == null) return new ArrayList<>();
        return toDoList.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
