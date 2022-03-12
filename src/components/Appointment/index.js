import React from 'react';
import 'components/Appointment/styles.scss'
import Header from './Header';
import Show from "./Show";
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm'
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

//modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"
const EDIT = "EDIT";

export default function Appointment (props) {

const { id, time, interview, interviewers, bookInterview, cancelInterview} = props




const {mode, transition, back } = useVisualMode(
  interview ? SHOW : EMPTY
)


//interviewer is the interviewerID
function save(name, interviewer) {
  transition(SAVING)
  const interview = {
    student: name,
    interviewer
  };

    bookInterview(id, interview)
    .then(()=> transition(SHOW))
    .catch((error)=> {
      transition(ERROR_SAVE, true)})
}

function onConfirm() {
  transition(DELETING, true)
  cancelInterview(id)
  .then(()=> transition(EMPTY))
  .catch((error)=> transition(ERROR_DELETE, true))
}

function onDelete() {
  transition(CONFIRM)
}

function onEdit(id, name, interviewers) {
  transition(EDIT)
  const interview = {
    student: name,
    interviewers
  };
  bookInterview(id, interview)
    .then(()=> transition(SHOW))
    .catch((error)=> transition(ERROR_SAVE, true))
  
}

  return (
    <>
      <Header time = {time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id = {id}
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
)}
{mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={()=>back(CONFIRM)}/>}
{mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={()=>back(CONFIRM)}/>}
{mode === SAVING && <Status message="Saving"/>}
{mode === DELETING && <Status message="Deleting"/>}
{mode === EDIT && <Form
     student={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onCancel={()=>back(EMPTY) } onSave={save}/>}
{mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={()=>back(SHOW)} onConfirm={onConfirm}/>}
{mode === CREATE && (
  <Form
    interviewers={interviewers} onCancel={()=>back(EMPTY) } onSave={save}
  />
)

}
    </>
  )
}