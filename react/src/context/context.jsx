import { createContext, useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [taskList, setTaskList] = useLocalStorage("task-list", []);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [choice, setChoice] = useLocalStorage("choice", "listaLocal");
  const [editingList, setEditingList] = useState([]);
  const [jsonServer, setJsonServer] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "Debes ingresar una tarea",
    type: "alert",
  });

  //hooks server
  const API_URL = "http://localhost:4001";

  //Funciones
  function reset() {
    setIsEditing(null);
    setEditId(null);
    setEditingList([]);
    setName("");
  }
  //alert message
  function showAlert() {
    setAlert({ ...alert, show: true });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 700);
  }
  //Enviar formulario => TareaFormulario
  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      if (/^\s*$/.test(name)) {
        setName("");
        setIsEditing(false);
        return;
      }
      setTaskList(
        taskList.map((item) => {
          if (item.id === editId && name != "") {
            return { ...item, name: name, completed: false };
          } else if (item.id === editId) return { ...item, completed: false };
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      return;
    }
    if (name === "" || /^\s*$/.test(name)) return showAlert();
    const task = { id: new Date().getTime(), name: name, completed: false };
    setTaskList([...taskList, task]);
    setName("");
  }
  //Click en boton editar cuando esta la lista de tareas
  function handleEdit(id) {
    let arr = [];
    setEditingList([]);
    setEditId(id);
    setIsEditing(true);
    const edit = taskList.find((item) => item.id == id);
    arr.push(edit);
    setEditingList(arr);
  }
  //Click en boton editar cuando se esta editando
  function handleIsEditing(id) {
    setName("");
    setIsEditing(false);
  }
  //Borrar tarea
  function handleDelete(id) {
    setTaskList(taskList.filter((item) => item.id != id));
    if (isEditing) setIsEditing(false);
  }
  //Borrar todas las tareas
  function handleClearAll() {
    const isConfirmed = window.confirm("Seguro que quieres borrar todo?");
    if (isConfirmed) setTaskList([]);
    return;
  }
  //Click en nombre de tarea en lista para completar
  function handleTask(id) {
    setTaskList(
      taskList.map((item) => {
        if (item.id == id) return { ...item, completed: !item.completed };
        return item;
      })
    );
  }

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        taskList,
        setTaskList,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        choice,
        setChoice,
        jsonServer,
        setJsonServer,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleIsEditing,
        editingList,
        setEditingList,
        handleTask,
        API_URL,
        handleClearAll,
        reset,
        alert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//Nombre personalizado del hook useContext
const useGlobalState = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalState };
