import { ButtonHTMLAttributes } from "react";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // Allow parent component to pass in additional css
  display?: string;
  style?: object;
}

export const Button = (props: buttonProps) => {
  return (
    <button
      className={`${props.className}
        text-sm text-violet-500 bg-white
        rounded-sm border border-violet-500
        hover:bg-violet-500 hover:text-white`}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.display}
    </button>
  );
};

export const ButtonLight = (props: buttonProps) => {
  return (
    <button
      className={`${props.className}
        text-sm text-white bg-violet-400
        border border-violet-500
        hover:text-white hover:bg-violet-500`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.display}
    </button>
  );
};

export const DeleteButton = (props: buttonProps) => {
  return (
    <button
      className={`
        text-sm text-red-400 bg-white
        rounded-sm border border-red-400
        hover:bg-red-500 hover:text-white ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.display}
    </button>
  );
};
