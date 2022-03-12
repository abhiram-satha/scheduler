export function getAppointmentsForDay(state, day) { 
  const filteredDates = state.days.filter(weekday => weekday.name === day)
  if (filteredDates.length === 0) {
    return [];
  }
  const appointment = filteredDates[0].appointments;
  const appointmentArray = [];

  appointment.map(appointmentID => appointmentArray.push(state.appointments[appointmentID]))


  return appointmentArray;
}

export function getInterviewersForDay(state, day) { 
  const filteredDates = state.days.filter(weekday => weekday.name === day)
  if (filteredDates.length === 0) {
    return [];
  }
  
  const interview = filteredDates[0].interviewers;
  const interviewArray = [];

  interview.map(interviewID => interviewArray.push(state.interviewers[interviewID]))


  return interviewArray;
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