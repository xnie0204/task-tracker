import Header from './components/Header'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Tasks from './components/Tasks';
import { useState,useEffect, createContext } from "react"
import Footer from './components/Footer'
import About from './components/About'
import AddTask from './components/AddTask';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function App() {
   // display the addTasks components
   const [showAddTasks,setShowAddTasks] = useState(false)

   //setTasks is used to change tasks
   const [tasks, setTasks] = useState([])

   //determine the light mode or dark mode
   const [theme,setTheme] = useState("light")

   //Add Tasks
   const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks,data])
    //console.log(task);
    //Give random number
    // const id = Math.floor(Math.random() * 10000) + 1

    // const newTask = {id, ...task}
    // setTasks([...tasks,newTask])

   }

   //Delete Task
   const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
         method:'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
   }

   // Toggle Reminder
   const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}

    //update
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)
    })

    //convert to json
    const data = await res.json()

    //update UI
    setTasks(tasks.map((task) => task.id === id? {
      ...task,reminder: data.reminder} :task)
    )
   }

    //fetch data
    useEffect(() => {
      const getTasks = async () => {
          const taskFromServer = await fetchTasks()
          setTasks(taskFromServer)
      }

      getTasks()
      //no indecency
  },[])

  //Fetch data 
  const fetchTasks = async () => {
      const res = await fetch("http://localhost:5000/tasks")
      const data = await res.json()

      return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
}

//change the theme
const toggleTheme = () => {
  setTheme((curr) => (curr === "light" ? "dark" : "light"));
}


  return (
    <ThemeContext.Provider value = {{theme, toggleTheme}}>
    <Router>
    <div className='APP' id = {theme}>
    <div className="container">
      <Header onAdd={() => setShowAddTasks(!showAddTasks)}
              showAdd = {showAddTasks}
              theme = {theme}/>
       
       <Routes>
       <Route path='/' element = {
        <>
        {/*       
      If we click the button of 'Add', then it can show the add page */}
      {showAddTasks && 
      <AddTask onAdd = {addTask}/>
      }     
      {tasks.length>0 ?
      <Tasks tasks={tasks}
            onDelete={deleteTask}
            onToggle = {toggleReminder}
            passTheme = {theme} /> : ('No Tasks to show')}
            

        </>
       } />
       
       <Route path='/about' element={<About />}/>
       </Routes>
       <div className='switch'>
        <label>{theme === 'light' ? "Light Mode": "Dark Mode"}</label>
       <ReactSwitch onChange = {toggleTheme} checked = {theme === 'dark'}/>
       </div>
       <Footer/>
    </div>
    </div>
    </Router>
    
    </ThemeContext.Provider>
  );
}

export default App;
