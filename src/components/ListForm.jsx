import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';


const ListForm = ({todos, setToDos}) => {
  
  const [validated, setValidated] = useState(false);
  const [todo, setToDo] = useState({
    id: 1,
    title: '',
    date: '',
    priority: '',
    description: ''
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setToDos([todo, ...todos]);
      setToDo({
        id: 1,
        title: '',
        date: '',
        priority: '',
        description: ''
      });
    }

  };

  const handleChange = (e) => {
    setToDo({...todo,id: uuidv4(), isFinish: false, [e.target.name]: e.target.value});
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name of Event</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name of Event"
            name='title'
            onChange={handleChange}
            value = {todo.title}
          />
          <Form.Control.Feedback type="invalid">
             Please enter the name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='4' controlId="validationCustom01">
          <Form.Label>Select Priority</Form.Label>
            <Form.Select aria-label="Low" name='priority' onChange={handleChange} required value={todo.priority}>
            <option value=''>Choose Priority</option>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
            </Form.Select>
          <Form.Control.Feedback type="invalid">
             Please choose priority.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='4' controlId="validationCustom01">
          <Form.Label>Name of Event</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Deadline"
            name='date'
            onChange={handleChange}
            value = {todo.date}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a deadline.
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} md='6' className='mt-3 mb-3' controlId="validationCustom01">
        <Form.Label>Enter description</Form.Label>
        <Form.Control 
        as="textarea" rows={3} 
        name='description'
         onChange={handleChange} 
         value={todo.description} 
         required/>
        <Form.Control.Feedback type="invalid">
             Please enter the description.
          </Form.Control.Feedback>
      </Form.Group>
      </Row>
      <Button type="submit">Add</Button>
    </Form>
  );
}

export default ListForm