import React, {Fragment, useState, useEffect} from 'react';
import moment from 'moment-timezone';

export function Result({timezone, sourceTz, sourceTime, sourceDate}) {
  const [displayDate, setDisplayDate] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [displayAM, setDisplayAM] = useState(null);
  const [displayOffset, setDisplayOffset] = useState(null);

  useEffect(() => {
    //console.log(timezone, sourceTz);
    //console.log(sourceDate, sourceTime);
    if (sourceTime && sourceDate) {
      const {hour, minute, isAM} = sourceTime;
      const {year, month, date} = sourceDate;
      const s = `${year}-${parseInt(month) + 1}-${date} ${hour}:${minute} ${isAM? 'AM': 'PM'}`;
      const m = moment(s, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DDTHH:mm')
      const offset = moment.tz(m, sourceTz).format('ZZ');
      const c = m + offset;
      //console.log(c, sourceTz, '->', timezone);
      //console.log(moment.tz(c, timezone).format('Do MMMM hh:mm A ZZ'));

      setDisplayDate(moment.tz(c, timezone).format('Do MMMM YYYY'));
      setDisplayTime(moment.tz(c, timezone).format('hh:mm'));
      setDisplayAM(moment.tz(c, timezone).format(' A'));
      setDisplayOffset(moment.tz(c, timezone).format('( ZZ )'));
    }
  }, [timezone, sourceTz, sourceTime, sourceDate]);

  return (
    <div className="timeline is-rtl">
      <div className="timeline-item is-info">
        <div className="timeline-marker is-info"></div>
        <div className="timeline-content">
          <p className="heading">{displayDate}</p>
          <p className="title">{displayTime}<span className="subtitle">{displayAM}</span></p>
          <p className="subtitle">{displayOffset}</p>
        </div>
      </div>
    </div>
  );
}
