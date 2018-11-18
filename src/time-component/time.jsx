import React, {Fragment, useState, useEffect} from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';

export function Time({timezone, date, reset, callback}) {
  const isAM = (timezone) => moment.tz(timezone).format('A') === 'AM'? true: false;
  const getHours = (timezone) => moment.tz(timezone).hours();
  const getMinutes = (timezone) => moment.tz(timezone).minutes();
  const toRange = (hour, min) => (hour * 60 + min) % 720;
  const toHour = (range) => Math.floor(range / 60);
  const toMinute = (range) => range % 60;
  const time = (range) => moment().hour(toHour(range)).minute(toMinute(range)).format('hh:mm');

  function offset() {
    if (date) {
      const hour = toHour(range);
      const minute = toMinute(range);
      const s = `${date.year}-${parseInt(date.month) + 1}-${date.date} ${hour}:${minute} ${am? 'AM': 'PM'}`;
      const m = moment(s, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DDTHH:mm');
      const offset = moment.tz(m, timezone).format('ZZ');
      //console.log(s,m,offset);
      return offset;
    }
  }

  const [range, setRange] = useState(toRange(getHours(timezone), getMinutes(timezone)));
  const [am, setAM] = useState(isAM(timezone));

  useEffect(() => {
    setRange(toRange(getHours(timezone), getMinutes(timezone)));
    setAM(isAM(timezone));
  }, [timezone, reset])

  useEffect(() => {
    callback(toHour(range), toMinute(range), am)
  }, [range, am]);

  function handleChange(event) {
    const target = event.target;
    switch(target.type) {
      case 'checkbox':
        setAM(target.checked);
        break;
      case 'range':
        setRange(target.value);
        break;
    }
  }

  return (
    <Fragment>
      <div className="is-divider" data-content="TIME"></div>
      <br />

      <input className={classNames('slider is-fullwidth is-large is-circle tooltip is-tooltip-info is-tooltip-active', {'is-warning': am})}
             data-tooltip={time(range) + ' ' + (am? 'AM': 'PM') + ' (' + offset() + ')'}
             value={range}
             onChange={handleChange}
             min="0"
             max="719"
             step="1"
             type="range" />

      <div className="field">
        <input id="am" type="checkbox" className="switch is-rtl is-warning" checked={am} onChange={handleChange} />
        <label htmlFor="am">{am? 'AM': 'PM'}</label>
      </div>
    </Fragment>
  );
}
