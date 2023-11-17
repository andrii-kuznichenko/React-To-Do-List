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
    }, [todos])



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
      {todos.map(todo => {
        if(!todo.isFinish){
          return <EventToDo todos={todos} setToDos={setToDos} todo={todo}/>
        }
      })}
    </TabPanel>
    <TabPanel>
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
