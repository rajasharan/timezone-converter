import React, {Fragment, useState} from 'react';
import ReactDom from 'react-dom';
import moment from 'moment-timezone';

import {Timezone} from './src/timezone-component/timezone.jsx'
import {Time} from './src/time-component/time.jsx'
import {Date} from './src/date-component/date.jsx'
import {Result} from './src/result-component/result.jsx'

function Root() {
  const [sourceTz, setSourceTz] = useState(moment.tz.guess());
  const [sourceTime, setSourceTime] = useState(null);
  const [sourceDate, setSourceDate] = useState(null);
  const [destTz, setDestTz] = useState('UTC');
  const [reset, setReset] = useState(false);

  function sourceTzChanged(value) {
    console.log(value);
    setSourceTz(value);
  }

  function destTzChanged(value) {
    console.log(value);
    setDestTz(value);
  }

  function time(hour, minute, isAM) {
    //console.log(hour, minute, isAM);
    setSourceTime({hour, minute, isAM});
  }

  function date(year, month, date) {
    //console.log(year, month, date);
    setSourceDate({year, month, date});
  }

  function today() {
    //console.log(moment.tz.guess(), moment.tz(moment.tz.guess()).format());
    setReset(!reset);
  }

  return (
    <div className="columns is-tablet">
      <div className="column is-1"></div>

      <div className="column is-5">
        <div className="box" id="from">
          <Timezone initial={sourceTz} reset={reset} callback={sourceTzChanged}></Timezone>
          <Time timezone={sourceTz} date={sourceDate} reset={reset} callback={time}></Time>
          <Date timezone={sourceTz} reset={reset} callback={date}></Date>
          <button className="button is-fullwidth" onClick={today}><span>TODAY</span><span className="icon"><i className="fa fa-sync"></i></span></button>
        </div>
      </div>

      <div className="column is-4">
        <div className="box" id="to">
          <Timezone initial={destTz} callback={destTzChanged}></Timezone>
          <Result timezone={destTz} sourceTz={sourceTz} sourceTime={sourceTime} sourceDate={sourceDate}></Result>
        </div>
      </div>
    </div>
  );
}

ReactDom.render(<Root />, document.getElementById('app'));
