import { useGlobalState } from '../context/context';
import './Tarea.scss'

function Tarea({task, onClick}) {
  const { isEditing } = useGlobalState();

  return (
    <>
      {/* Se marca como completada la tarea al clickear y se pinta verde */}
      {!isEditing && <span onClick={()=>onClick(task.id)} className={task.completed ? 'line-through' : '' }>{task.name}</span>}
      {/* En edicion cambia color de texto a rojo */}
      {isEditing && <span className='task-editing'>{task.name}</span>}
    </>
  )
}

export default Tarea