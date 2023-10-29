import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdSettingsBackupRestore } from "react-icons/md";
import Tarea from "./Tarea";
import { useGlobalState } from "../context/context";
import "./ListaTareas.scss";

function ListaTareas({ inputRef, list, onEdit, onDelete, onClearAll, handleTask }) {
  const {
    isEditing, jsonServer
  } = useGlobalState();

  // Focus en el input cuando se clickea editar
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <ul>
      {/* Devuelve la lista de tareas o unica tarea si se esta editando */}
      {list.length>0 && list.map((item) => {
        const { id, completed } = item;
        return (
          <li key={id} className={completed ? `task-completed` : ""}>
            <Tarea task={item} onClick={handleTask}/>
            <div>
              {/* Boton editar/volver(si esta editando) */}
              <button className="btn-edit" onClick={() => onEdit(id)}>
                {isEditing?<MdSettingsBackupRestore/>:<FaEdit />}
              </button>
              {/* Si no esta editando opcion de borrar */}
              {!isEditing && <button className="btn-delete" onClick={() => onDelete(id)}>
                <FaTrash />
              </button>}
            </div>
          </li>
        );
      })}
      {/* //Borrar todo  */}
      {list.length > 1 && !isEditing && !jsonServer && (
        <button className="clear-btn" onClick={() => onClearAll()}>
          Borrar todo
        </button>
      )}
      {/* Tareas completadas */}
      {list.length > 0 && !isEditing && (
        <p>
          {list.length==1?"Completada":"Completadas"}{" "}
          {list.reduce((acc, cv) => {
            if (cv.completed) acc += 1;
            return acc;
          }, 0)}
          /{list.length}
        </p>
      )}
    </ul>
  );
}

export default ListaTareas;
