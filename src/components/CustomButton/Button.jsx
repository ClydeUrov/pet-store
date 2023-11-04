import React from 'react'
import style from './Button.module.scss'


const Button = ({ type, text, onClickHandler, isDisabled, buttonSize }) => {
  const buttonClassName = isDisabled ? style.btnDisabled : style.button;
  const buttonStyle = {
    width: buttonSize === "large" ? "85%" : "",
    padding: buttonSize === "padding" || "cancel" ? '9px 36px' : null,
    backgroundColor: buttonSize === "cancel" ? "#fff" : null,
    color: buttonSize === "cancel" ? "#ffad4d" : null,
  };
  return (
    <button type={type} className={buttonClassName} style={buttonStyle} onClick={() => onClickHandler()} disabled={isDisabled}>
      {text}
    </button>
  )
}

export default Button
