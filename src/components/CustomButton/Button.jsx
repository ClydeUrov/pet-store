import React from 'react'
import style from './Button.module.scss'


const Button = ({ text, onClickHandler, isDisabled, buttonSize }) => {
  const buttonClassName = isDisabled === true ? style.btnDisabled : style.button;
  const buttonStyle = {
    width: buttonSize === "large" ? "85%" : "",
  };
  return (
    <button className={buttonClassName} style={buttonStyle} onClick={() => onClickHandler()} disabled={isDisabled}>
      {text}
    </button>
  )
}

export default Button
