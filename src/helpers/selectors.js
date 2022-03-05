export function getAppointmentsForDay(state, day) { 
  const filteredDates = state.days.filter(weekday => weekday.name === day)
  if (filteredDates.length === 0) {
    return [];
  }
  // console.log(filteredDates)
  const appointment = filteredDates[0].appointments;
  const appointmentArray = [];

  appointment.map(appointmentID => appointmentArray.push(state.appointments[appointmentID]))

  // console.log(appointmentArray)
  return appointmentArray;
}


export function getInterview(state, interview) {

  if(!interview) {
    return null;
  }

  let interviewerID = interview.interviewer;
  
  let interViewObject = {
    student: interview.student,
    interviewer: state.interviewers[interviewerID]
  }

  return interViewObject;
}