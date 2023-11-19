import { useState, useEffect } from 'react'
import './App.css'
import ListForm from './components/ListForm'
import EventToDo from './components/EventToDo';
import SortSelector from './components/SortSelector';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  const [todos, setToDos] = useState(JSON.parse(localStorage.getItem('items')) ?? []);
  
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
    console.log([...todos].isArray)
    }, [todos])

  const validateListOfTasks = (tasks) => {
    if(tasks){
      const filtered = todos.filter(ele => {
        if(!ele.isFinish){
          return ele;
        }
      })
      return filtered.length === 0 ? <p id='no-task'> No tasks in progress </p> : '';
    } else if (!tasks){
      if(!tasks){
        const filtered = todos.filter(ele => {
          if(ele.isFinish){
            return ele;
          }
        })
        return filtered.length === 0 ? <p id='no-task'> No finished tasks </p> : '';
    }
  }
}



  return (
    <div>
      <ListForm todos={todos} setToDos={setToDos}/>
      <SortSelector todos={todos} setToDos={setToDos}/>
      <Tabs>
    <TabList>
      <Tab>Tasks</Tab>
      <Tab>Finished</Tab>
    </TabList>
    <TabPanel>
      {validateListOfTasks(true)}
      {todos.map(todo => {
        if(!todo.isFinish){
          return <EventToDo todos={todos} setToDos={setToDos} todo={todo}/>
        }
      })}
    </TabPanel>
    <TabPanel>
    {validateListOfTasks(false)}
    {todos.map(todo => {
        if(todo.isFinish){
          return <EventToDo todos={todos} setToDos={setToDos} todo={todo}/>
        }
      })}
    </TabPanel>
  </Tabs>
    </div>
  )
}

export default App
