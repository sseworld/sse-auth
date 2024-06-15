import React from "react";

const Button = ({ onClick, children, className, buttonText }) => {

  return (
    <button type="button" onClick={onClick} className={className}>
      {buttonText || children}
    </button>
  );
};

export default Button;
