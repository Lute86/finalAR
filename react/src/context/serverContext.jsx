import { createContext, useContext, useState } from "react";
import { useGlobalState } from "./context";
import axios from "axios";

const AppContextServer = createContext();

const AppProviderServer = ({ children }) => {
  const {
    API_URL,
    name,
    setName,
    editId,
    setEditId,
    setEditingList,
    isEditing,
    setIsEditing,
    setJsonServer
  } = useGlobalState();

  const [serverDown, setServerDown] = useState(false);
  const [list, setList] = useState([]);
  const [taskModified, setTaskModified] = useState(Boolean);
  const [pinged, setPinged] = useState(false);

  //Recibe todas las tareas y setea la lista de tareas
  async function fetchTasks() {
    try {
      const tasks = await axios.get(`${API_URL}/tasks`);
      if (tasks.data) setList(tasks.data);
      setServerDown(false);
    } catch (error) {
      setList([]);
      setServerDown(true);
      return console.error("No se puede acceder al servidor");
    }
    return;
  }
  //Busca tarea especifica
  async function fetchOneTask(id) {
    let arr = [];
    try {
      const tasks = await axios.get(`${API_URL}/tasks/${id}`);
      if (tasks.data) {
        arr.push(tasks.data);
        setEditingList(arr);
      }
      return tasks.data;
    } catch (error) {
      setList([]);
      setServerDown(true);
      return console.error("Server can't be accesed");
    }
  }
  //Agrega tarea
  async function postTask(body) {
    try {
      const task = await axios.post(`${API_URL}/tasks`, body);
    } catch (error) {
      console.error("Couldn't post task", error);
    }
  }
  //Actualiza tarea
  async function updateTask(body, id) {
    try {
      const task = await axios.put(`${API_URL}/tasks/${id}`, body);
    } catch (error) {
      console.error("Couldn't put task", error);
    }
  }
  //Borra tarea
  async function deleteTask(id) {
    try {
      const task = await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
      console.error("Can't delete task");
    }
  }
  //Borra todas las tareas
  async function deleteAllTasks() {
    try {
      const task = await axios.delete(`${API_URL}/tasks`);
    } catch (error) {
      console.error("Can't delete task");
    }
  }
  //Cuando se envia el formulario
  function handleServerSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      if (/^\s*$/.test(name)) {
        setName("");
        setIsEditing(false);
        return;
      }
      const body = {
        name: name,
        completed: 0,
      };
      updateTask(body, editId);
      setTaskModified(!taskModified);
      setName("");
      setIsEditing(false);
      return;
    }
    if (name === "" || /^\s*$/.test(name)) return;
    const task = { name: name, completed: false };
    postTask(task);
    setTaskModified(!taskModified);
    setName("");
  }
  //Cuando se clickea en la tarea para completar
  async function handleTaskServer(id) {
    const task = await fetchOneTask(id);
    let completed;
    if (task.completed) {
      completed = 0;
    }
    if (!task.completed) {
      completed = 1;
    }
    const body = {
      name: task.name,
      completed: completed,
    };
    updateTask(body, id);
    setTaskModified(!taskModified);
    return;
  }
  //Click en editar
  function handleEditServer(id) {
    reset();
    setEditId(id);
    setIsEditing(true);
    fetchOneTask(id);
  }
  //Click boton editar cuando se esta editando
  function handleIsEditingServer(id) {
    setName("");
    setIsEditing(false);
  }
  //Click borrar tarea
  async function handleDeleteServer(id) {
    await deleteTask(id);
    setTaskModified(!taskModified);
  }
  //Click Borrar Todas
  async function handleDeleteAllServer() {
    const isConfirmed = window.confirm("Seguro que quieres borrar todo?")
    if(isConfirmed){
      await deleteAllTasks();
      setTaskModified(!taskModified);
    }
  }
  //Reset de los estados globales
  function reset() {
    setIsEditing(false);
    setEditingList([]);
    setEditId(null);
    setServerDown(false);
    setName('')
    ping();
    return;
  }
  //Ping
  async function ping() {
    try {
      const ping = await axios.get(`${API_URL}/ping`);
      setPinged(true);
    } catch (error) {
      setPinged(false);
      console.error("No se puede acceder al servidor", error);
    }
  }
  //Check if it is json server
  async function pingJson() {
    try {
      const json = await axios.get(`${API_URL}/jsonServer`);
      if (json.data) setJsonServer(true);
    } catch (error) {
      setJsonServer(false);
    }
  }

  return (
    <AppContextServer.Provider
      value={{
        serverDown,
        setServerDown,
        list,
        setList,
        taskModified,
        setTaskModified,
        pinged,
        setPinged,
        handleDeleteAllServer,
        handleDeleteServer,
        handleEditServer,
        handleIsEditingServer,
        handleServerSubmit,
        handleTaskServer,
        fetchTasks,
        reset,
        pingJson
      }}
    >
      {children}
    </AppContextServer.Provider>
  );
};

const useServerState = () => {
  return useContext(AppContextServer);
};

export { useServerState, AppContextServer, AppProviderServer };
