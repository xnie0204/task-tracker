import { FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete,onToggle,passTheme}) => {
  return (
    <div className= {`task ${task.reminder ? 'reminder' : ''} `
    } onDoubleClick={()=>onToggle(task.id)}
    style = {{background: passTheme === "light"? "#f4f4f4": "#182524"}}>
      {console.log(passTheme)}
        <h3 style = {{color: passTheme === "light"? "black": "white"}}> 
            {task.text}
            {/* This is 'x' */}
            <FaTimes style = {{color:'red',cursor:'pointer'}}
            onClick= {()=> onDelete(task.id)}/>
            </h3>
        <p style = {{color: passTheme === "light"? "black": "white"}}>{task.day}</p>

    </div>
  )
}

export default Task