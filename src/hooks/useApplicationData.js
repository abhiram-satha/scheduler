import React, { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const {day, days, appointments, interviewers} = state;

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers"),
    ])
      .then((response) => {
        setState((prev) => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }));
      })
  }, []);

  
  function numberOfSpots() {
    
    for(const dayOfWeek of state.days) {
      if(dayOfWeek.name === day) {
        const spotsAvailable = dayOfWeek.spots;
        return spotsAvailable
      }
    }
    
  }

  function bookInterview(id, interview) {
    let spotAvailable = 1;
    if (state.appointments[id]['interview']) {
      spotAvailable = 0;
    } 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
   
    if (!interview.interviewer) {
      throw Error;
    } else {
      return axios
        .put(`/api/appointments/${id}`, { interview })
        .then(()=> {
          setState((prev) => {
            const reminaingSpots = {...prev}
            for (const dayofWeek of reminaingSpots.days) {
              if (dayofWeek.appointments.includes(id)) {
                const newDay = dayofWeek.spots - spotAvailable
                const newDays = {...dayofWeek, spots: newDay}
                let newDaysState = reminaingSpots.days.map(day => day.id === newDays.id ? {...day, spots: newDay} : day)
                
                const newState = {...prev, days: newDaysState, appointments}
                return newState


              }

            }
          })
        }
         
          
          )
    }
  }

  function cancelInterview(id) {
    const appointments = { ...state.appointments };
    const appointment = { ...appointments[id] };

    appointment.interview = null;

    appointments[id] = appointment;

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, { appointment })
      .then(() => {
        setState((prev) => {
          const reminaingSpots = {...prev}
          for (const dayofWeek of reminaingSpots.days) {
            if (dayofWeek.appointments.includes(id)) {
              const newDay = dayofWeek.spots + 1;
              const newDays = {...dayofWeek, spots: newDay}
              let newDaysState = reminaingSpots.days.map(day => day.id === newDays.id ? {...day, spots: newDay} : day)
              
              const newState = {...prev, days: newDaysState, appointments}
              return newState


            }

          }
        })
      });
  }
  return {state, setDay, bookInterview, cancelInterview, numberOfSpots}
}
export default useApplicationData;