import React, {Fragment, useState, useEffect} from 'react';
import moment from 'moment-timezone';

export function Date({timezone, reset, callback}) {
  const [monthRange, setMonthRange] = useState(moment.tz(timezone).month());
  const [dateRange, setDateRange] = useState(moment.tz(timezone).date());
  const [yearRange, setYearRange] = useState(moment.tz(timezone).year());

  useEffect(() => {
    setMonthRange(moment.tz(timezone).month());
    setDateRange(moment.tz(timezone).date());
    setYearRange(moment.tz(timezone).year());
  }, [timezone]);

  useEffect(() => {
    const local = moment.tz.guess();
    setMonthRange(moment.tz(local).month());
    setDateRange(moment.tz(local).date());
    setYearRange(moment.tz(local).year());
  }, [reset]);
  
  const displayMonth = (monthRange) => moment.tz(timezone).month(monthRange).format('MMM');
  const daysInMonth = (monthRange) => moment.tz(timezone).month(monthRange).daysInMonth();
  const displayDate = (dateRange, monthRange) => moment.tz(timezone).month(monthRange).date(dateRange).format('Do');
  const displayYear = (yearRange) => moment.tz(timezone).year(yearRange).year();

  useEffect(() => {
    callback(yearRange, monthRange, dateRange);
  }, [monthRange, dateRange, yearRange])

  function handleChange(event) {
    const target = event.target;
    switch(target.id) {
      case 'month':
        setMonthRange(target.value);
        break;
      case 'date':
        setDateRange(target.value);
        break;
      case 'year':
        setYearRange(target.value);
        break;
    }
  }

  return (
    <Fragment>
      <div className="is-divider" data-content="DATE"></div>

      <div className="columns is-mobile is-gapless">
        <div className="column">
          <input className="slider is-fullwidth is-circle is-primary tooltip is-tooltip-info is-tooltip-active is-tooltip-right"
                 data-tooltip={displayMonth(monthRange)}
                 value={monthRange}
                 onChange={handleChange}
                 id="month"
                 step="1"
                 min="0"
                 max="11"
                 type="range" />
          <br />

          <input className="slider is-fullwidth is-circle is-primary tooltip is-tooltip-info is-tooltip-active is-tooltip-right"
                 data-tooltip={displayDate(dateRange, monthRange)}
                 value={dateRange}
                 onChange={handleChange}
                 max={daysInMonth(monthRange)}
                 min="1"
                 step="1"
                 id="date"
                 type="range" />
          <br />

          <input className="slider is-fullwidth is-circle is-primary tooltip is-tooltip-info is-tooltip-active is-tooltip-right"
                 data-tooltip={displayYear(yearRange)}
                 value={yearRange}
                 onChange={handleChange}
                 id="year"
                 step="1"
                 min="1950"
                 max="2050"
                 type="range" />
          <br />
        </div>

        <div className="column is-1"></div>
        <div className="column is-1"></div>
      </div>
    </Fragment>
  );
}
