import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  

  const interviewerList = interviewers.map((interview) => (
    <InterviewerListItem
      key={interview.id}
      id={interview.id}
      name={interview.name}
      avatar={interview.avatar}
      selected={interview.id === value}
      setInterviewer={() => onChange(interview.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewerList}</ul>
    </section>
  );
}

