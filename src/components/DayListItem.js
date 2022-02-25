import React from 'react';
import 'components/DayListItem.scss'
const classNames = require('classnames')

export default function DayListItem(props) {

  const {key, name, spots, setDay, selected} = props;
  
  const formatSpots = (spots) => {
    if(spots > 1) {
      return `${spots} spots remaining`
    } else if (spots === 1) {
      return `1 spot remaining`
    } else {
      return 'no spots remaining'
    }
  }

  const remaingSpots = formatSpots(spots)


  const dayClass = classNames(
    'day-list__item',
    {
      'day-list__item--selected': selected,
      'day-list__item--full': spots === 0
    }
  )


  return (
    <li className={dayClass} key={key} onClick={setDay} selected={selected}>
        <h2 className='text-regular'>{name}</h2>
        <h3 className="text--light">{remaingSpots}</h3>
    </li>
  );
};