import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss'
import Header from './Header';
import Show from "./Show";
import Empty from './Empty';


export default function Appointment (props) {

const { id, time, interview} = props
  return (
    <>
      <Header time = {time}/>
      {interview ? 
      <>
        <Show key={id} interviewer={interview.interviewer} student={interview.student}/>
      </>
      :
      <>
        <Empty />
      </>


      }
    </>
  )
}