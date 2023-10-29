import React, {useEffect} from "react";
import "./ServerlessList.scss";
import TareaFormulario from "../../components/TareaFormulario";
import { useGlobalState } from "../../context/context";
import { useNavigate } from 'react-router-dom';

function ServerlessList() {
  const {
    handleSubmit,
    handleEdit,
    handleIsEditing,
    handleDelete,
    taskList,
    setTaskList,
    editingList,
    handleClearAll,
    handleTask,
    setJsonServer,
    reset
  } = useGlobalState();
  const navigate = useNavigate();

  useEffect(()=>{
    setJsonServer(false)
  },[])

  useEffect(()=>{
    reset()
  }, [navigate])

  return (
    <section className="serverless-container">
      <TareaFormulario
        onSubmit={handleSubmit}
        taskList={taskList}
        setTaskList={setTaskList}
        editingList={editingList}
        handleEdit={handleEdit}
        handleIsEditing={handleIsEditing}
        handleDelete={handleDelete}
        handleClearAll={handleClearAll}
        handleTask={handleTask}
      />
    </section>
  );
}

export default ServerlessList;
