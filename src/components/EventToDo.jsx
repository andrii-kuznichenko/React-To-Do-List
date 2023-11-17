import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import DateFormat from './DateFormat';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const EventToDo = ({todos, setToDos, todo}) => {
   const [isUpdate, setIsUpdate] = useState(false);
   const [updateToDo, setUpdateToDo] = useState(todo);

   const ChangePriority = (id) => {
    const newToDos = todos.map(ele => {
      if(ele.id === id){
        ele.priority === 'High'
                  ? ele.priority = 'Medium' : ele.priority === 'Medium'
                    ? ele.priority = 'Low' : ele.priority === 'Low'
                      ? ele.priority = 'High' : "Low"
      }
      return ele;
    })
    setToDos(newToDos);
   }

   const DeleteHandler = (id) => {
    const newToDos = todos.filter(ele => ele.id !== id);
    setToDos(newToDos);
   }

   const UpdateHandler = (todo) => {
    if(isUpdate){
      const newToDos = todos.map(element => {
        if(todo.id === element.id){
          element.title = updateToDo.title;
          element.date = updateToDo.date;
          element.description = updateToDo.description; 
        }
        return element;
      })
      setToDos(newToDos);
    }
    setIsUpdate(!isUpdate);
   }

   const FinishTask = (id) => {
    const newToDo = todos.map(ele => {
      if(ele.id === id){
        ele.isFinish = !ele.isFinish;
      }
      return ele;
    })
    setToDos(newToDo);
   }



  return (
    <ListGroup>
        <div className='container-cards'>
        <Card className='mt-3 w-sm-100' key={todo.id}>
          {isUpdate ? (
               <>
               <Card.Header>
            <Stack direction="horizontal" gap={3}>
            <Button variant={todo.priority === 'High'
                  ? "danger" : todo.priority === 'Medium'
                    ? "warning" : todo.priority === 'Low'
                      ? "secondary" : "light"} 
                      className="p-2" onClick={() => ChangePriority(todo.id)}>
                  {todo.priority} 
                  </Button>
                  <Form.Control
                    type="date"
                    placeholder="Deadline"
                    name='date'
                    value = {updateToDo.date}
                    onChange={((e) => setUpdateToDo({...updateToDo, [e.target.name]: e.target.value}))}
                    />
            </Stack> 
                 </Card.Header>    
            <Card.Body>
               <Card.Title className='text-start'>
                    <Form.Control
                type="text"
                placeholder="Name of Event"
                name='title'
                value = {updateToDo.title}
                onChange={((e) => setUpdateToDo({...updateToDo, [e.target.name]: e.target.value}))}/>
          </Card.Title>
               <Card.Text className='text-start'>
               <Form.Control 
                  as="textarea" rows={3} 
                  name='description'
                  value={updateToDo.description} 
                  onChange={((e) => setUpdateToDo({...updateToDo, [e.target.name]: e.target.value}))}
                  />
               </Card.Text>
               <Stack direction="horizontal" gap={3}>
               <Button variant="link" onClick={(() => DeleteHandler(todo.id))}>Delete</Button>
               <Button variant="link" onClick={() => UpdateHandler(todo)}>Accept Changes</Button>
               </Stack>
             </Card.Body>
               </>
          ) : (
            <>
            <Card.Header>
            <Stack direction="horizontal" gap={3}>
            <Button variant={todo.priority === 'High'
                  ? "danger" : todo.priority === 'Medium'
                    ? "warning" : todo.priority === 'Low'
                      ? "secondary" : "light"} 
                      className="p-2" onClick={() => ChangePriority(todo.id)}>
                  {todo.priority} 
                  </Button>
              <DateFormat date={todo.date}/> 
            </Stack> 
                 </Card.Header>    
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  checked={todo.isFinish?true:false}
                  onChange={((e) => setUpdateToDo({...updateToDo, [e.target.name]: e.target.value}))}
                  onClick={() => FinishTask(todo.id)}
                />
               <Card.Title className='text-start'><h2>{todo.isFinish?<del>{todo.title}</del>:todo.title}</h2></Card.Title>
               </Stack>
               <Card.Text className='text-start'>{todo.description}</Card.Text>
               <Stack direction="horizontal" gap={3}>
               <Button variant="link" onClick={(() => DeleteHandler(todo.id))}>Delete</Button>
               <Button variant="link" onClick={(() => UpdateHandler(todo))}>Update</Button>
               </Stack>
             </Card.Body>
             </>
          )}

          
          </Card>
          </div>
          
  </ListGroup>
  )
}

export default EventToDo