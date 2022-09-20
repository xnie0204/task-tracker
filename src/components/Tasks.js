
import Task from './Task'
const Tasks = ({tasks, onDelete, onToggle,passTheme}) => {

  return (
    console.log(passTheme),
  
    <>
    {
      //each task need unique key
      tasks.map((task,index) => (
        <Task key = {index} 
              task = {task} 
              onDelete = {onDelete}
              onToggle = {onToggle}
              passTheme = {passTheme}
              
              />
      ))
    }

    </>
  )
}

export default Tasks
