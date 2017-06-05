import React from 'react';
import moment from 'moment';

const CountdownTimer = () => {
  let currentHour = moment().hour() > 12 ? moment().hour() - 12 : moment().hour();
  let currentMinute = moment().minute();
  let currentSecond = moment().second();

  let currentYear = moment().year();
  let currentMonth = moment().month();
  let currentDay = moment().date();

  let currentTime = currentMonth + '/' + currentDay + '/' + currentYear + ' || ' + currentHour + ':' + currentMinute + ':' + currentSecond;

  return(
    <li>
      <a>{currentTime}</a>
    </li>
  )
}

export default CountdownTimer;
