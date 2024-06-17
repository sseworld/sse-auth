import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  buttonText?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  buttonText,
}) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {buttonText || children}
    </button>
  );
};

export default Button;
