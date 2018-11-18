import React, {Fragment, useState, useEffect} from 'react';
import moment from 'moment-timezone';

export function Timezone({initial, reset, callback}) {
  const [tz, setTz] = useState(initial? initial: moment.tz.guess());

  useEffect(() => {
    callback(tz);
  }, [tz]);

  useEffect(() => {
    setTz(initial);
  }, [initial]);

  useEffect(() => {
    if (reset !== undefined && reset !== null) setTz(moment.tz.guess());
  }, [reset]);

  function isMajorZone(zone) {
    return /Los_Angeles|Denver|Chicago|New_York|London|Zurich|Kolkata|Shanghai|Seoul|Tokyo|Sydney|UTC/.test(zone);
  }

  function handleChange(event) {
    setTz(event.target.value);
  }

  return (
    <div className="control is-expanded has-icons-left">
      <span className="select is-fullwidth is-medium">
        <select value={tz} onChange={handleChange}>
          <option key="frequent" disabled>MAJOR TIMEZONES</option>
          {moment.tz.names().filter(isMajorZone).map(tz => <option key={tz} value={tz}>{tz}</option>)}

          <option key="all" disabled>ALL TIMEZONES</option>
          {moment.tz.names().filter(tz => !isMajorZone(tz)).map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </span>
      <span className="icon is-left">
        <i className="fas fa-globe-americas"></i>
      </span>
    </div>
  );
}
