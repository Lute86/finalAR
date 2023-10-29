import React, { useRef } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import ListaTareas from "./ListaTareas";
import { useGlobalState } from "../context/context";
import "./TareaFormulario.scss";

function TareaFormulario({
  onSubmit,
  taskList,
  editingList,
  handleEdit,
  handleIsEditing,
  handleDelete,
  handleClearAll,
  handleTask,
}) {
  
  const { name, setName, isEditing } = useGlobalState();
  const inputRef = useRef(null);

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <div>
        <input
          className="todo-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Inserte tarea"
          ref={inputRef}
        />
        <button type="submit" className="submit-btn">
          <LuSendHorizonal />
        </button>
      </div>
      {/* Llamar a ListaTareas segun la necesidad, lista completa o lista a editar */}
      {!isEditing && (
        <ListaTareas
          inputRef={inputRef}
          list={taskList}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
          handleTask={handleTask}
        />
      )}
      {isEditing && (
        <ListaTareas
          inputRef={inputRef}
          list={editingList}
          onEdit={handleIsEditing}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      )}
    </form>
  );
}

export default TareaFormulario;
