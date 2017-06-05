import React from 'react';
import moment from 'moment';

const CountdownTimer = () => {
  let currentHour = moment().hour() > 12 ? moment().hour() - 12 : moment().hour();
  let currentMinute = moment().minute() < 10 ? '0' + moment().minute() : moment().minute();;
  let currentSecond = moment().second() < 10 ? '0' + moment().second() : moment().second();
  let timeOfDay = moment().hour() > 12 ? 'PM' : 'AM';

  let currentYear = moment().year();
  let currentMonth = moment().month();
  let currentDay = moment().date();

  let currentTime = currentMonth + '/' + currentDay + '/' + currentYear + ' || ' + currentHour + ':' + currentMinute + ':' + currentSecond + ' ' + timeOfDay;

  return(
    <li>
      <a>{currentTime}</a>
    </li>
  )
}

export default CountdownTimer;
