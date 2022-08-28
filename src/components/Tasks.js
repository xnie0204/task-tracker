
import Task from './Task'
const Tasks = ({tasks, onDelete, onToggle}) => {

  return (
  
    <>
    {
      //each task need unique key
      tasks.map((task,index) => (
        <Task key = {index} 
              task = {task} 
              onDelete = {onDelete}
              onToggle = {onToggle}/>
      ))
    }

    </>
  )
}

export default Tasks
