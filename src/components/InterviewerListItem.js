import React, {useState} from 'react';
import 'components/InterviewerListItem.scss';

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const {key, id, name, avatar, selected, setInterviewer} = props;

  const interviewClass = classNames(
    'interviewers__item',
    {'interviewers__item--selected': selected}
  );

  return (
    <li className={interviewClass} onClick={setInterviewer}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
       {selected && name}
    </li>
  )


};