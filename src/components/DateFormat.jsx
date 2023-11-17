import { useState, useEffect } from 'react';

const DateFormat = ({date}) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    //Get todays date
    const today = new Date (Date.now());
    const todayDate = [today.getFullYear(),today.getMonth()+1,today.getDate()];
  
    //Get and formating date from storage
      let dateArray = date.split('-');
      dateArray = dateArray.map(string => {
        if(string[0] === '0'){
          string = string[1];
        }
        return parseInt(string);
      })
  //compare date with today to understan if this date expired
      if(todayDate[0] === dateArray[0] && todayDate[1] === dateArray[1] && todayDate[2] === dateArray[2]){
        setIsExpired(false);
      } else if(todayDate[0] > dateArray[0]){
        setIsExpired(true);
      } else if (todayDate[0] < dateArray[0]) {
        setIsExpired(false);
      } else if (todayDate[0] === dateArray[0]){
        if(todayDate[1] > dateArray[1]){
          setIsExpired(true);
        } else if (todayDate[1] < dateArray[1]){
          setIsExpired(false);
        } else if (todayDate[1] === dateArray[1]){
          if(todayDate[2] > dateArray[2]){
            setIsExpired(true);
          } else if (todayDate[2] < dateArray[2]){
            setIsExpired(false);
          }
        }
      }
  }, [date])

  return (
    <h5 className={isExpired?'expired p-2 ms-auto':'not-expired p-2 ms-auto'}>{date}</h5>
  )
}

export default DateFormat