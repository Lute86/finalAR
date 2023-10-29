import React, { useEffect } from "react";
import { useGlobalState } from "../../context/context";
import "./Server.scss";
import TareaFormulario from "../../components/TareaFormulario";
import { useServerState } from "../../context/serverContext";

function Server() {
  const { editingList } = useGlobalState();
  const {
    serverDown,
    list,
    setList,
    taskModified,
    pinged,
    handleDeleteAllServer,
    handleDeleteServer,
    handleEditServer,
    handleIsEditingServer,
    handleServerSubmit,
    handleTaskServer,
    fetchTasks,
    reset,
    pingJson
  } = useServerState();

  //Actualiza la lista de tareas
  useEffect(() => {
    reset();
    //Armar la lista
    fetchTasks();
    pingJson();
  }, [taskModified]);

  return (
    <section className="server-container">
      {/* lista vacia y el servidor no esta caido */}
      {!pinged && !serverDown && <div>Buscando tareas....</div>}
      {/* Servidor caido */}
      {serverDown && <div>Servidor desconectado</div>}
      {/* Ping hecho, servidor funcional, lista vacia o llena */}
      {pinged && !serverDown && (
        <TareaFormulario
          onSubmit={handleServerSubmit}
          taskList={list}
          setTaskList={setList}
          editingList={editingList}
          handleEdit={handleEditServer}
          handleIsEditing={handleIsEditingServer}
          handleDelete={handleDeleteServer}
          handleClearAll={handleDeleteAllServer}
          handleTask={handleTaskServer}
        />
      )}
    </section>
  );
}

export default Server;
