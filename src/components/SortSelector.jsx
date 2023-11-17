import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function SortSelector({todos, setToDos}) {

  const SelectHandler = (e) => {
    const option = e.target.value;

    if(option === 'Priority'){
      const sorted = [...todos];
      sorted.sort((elementA, elementB) => sortByPriority (elementA, elementB));
      setToDos(sorted);
    } else if (option === 'Deadline'){
      const sorted =  [...todos].sort((elementA, elementB) => sortByDate (elementA, elementB));
      setToDos(sorted);
    }

  }

  const sortByPriority = (elementA, elementB) => {
    if(elementA.priority === 'High' && elementB.priority !== 'High'){
      return -1;
    } else if (elementB.priority === 'High' && elementA.priority !== 'High'){
      return 1;
    } else if (elementA.priority === 'Medium' && elementB.priority !== 'Medium'){
      return -1;
    } else if (elementB.priority === 'Medium' && elementA.priority !== 'Medium'){
      return 1;
    } else if (elementA.priority === 'Low' && elementB.priority !== 'Low'){
      return -1;
    } else if (elementB.priority === 'Low' && elementA.priority !== 'Low'){
      return 1;
    } else if (elementA.priority === elementB.priority){
      console.log('1');
      sortByDate(elementA, elementB);
    }
}

const sortByDate = (elementA, elementB) => {
const arrayDate = [elementA.date,elementB.date]

  let dateArray = elementA.date.split('-');
  dateArray = parserIntDate(dateArray);
  console.log(dateArray);
  let todayDate = elementB.date.split('-');
  todayDate = parserIntDate(todayDate);
  console.log(todayDate);

  if(todayDate[0] === dateArray[0] && todayDate[1] === dateArray[1] && todayDate[2] === dateArray[2]){
    sortByAddingDate(elementA, elementB);

  } else if(todayDate[0] > dateArray[0]){
    return -1;
  } else if (todayDate[0] < dateArray[0]) {
    return 1;
    
  } else if (todayDate[0] === dateArray[0]){
    if(todayDate[1] > dateArray[1]){
      return -1;
      
    } else if (todayDate[1] < dateArray[1]){
      return 1;
      
    } else if (todayDate[1] === dateArray[1]){
      if(todayDate[2] > dateArray[2]){
        return -1;
        
      } else if (todayDate[2] < dateArray[2]){
        return 1;
       
          }
      }  
    }      
  console.log(eventList.eventsList);
}

const parserIntDate = (dateArray) => {
    dateArray = dateArray.map(string => {
    if(string[0] === '0'){
      string = string[1];
    }
    return parseInt(string);
  })
  return dateArray;
}



  return (
    <FormGroup as={Col} md="6" className='mt-3 mb-3'>
    <Form.Select aria-label="Default select example" onChange={SelectHandler}>
      <option value=''>Sort by</option>
      <option value="Priority">Priority</option>
      <option value="Deadline">Deadline</option>
    </Form.Select>
    </FormGroup>
  );
}

export default SortSelector