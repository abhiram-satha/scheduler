import React from "react";
import "components/Button.scss";
const classNames = require('classnames');

export default function Button(props) {


   const {confirm, danger, disabled, onClick} = props;

   const buttonStyle = classNames('button', {
      'button--confirm': confirm, 
      'button--danger': danger
   });

   return (

   <button 
      className={buttonStyle} 
      disabled={disabled} 
      onClick={onClick}
   >
      {props.children}
   </button>


   );
}
