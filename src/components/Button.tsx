import { ButtonHTMLAttributes } from "react";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // Allow parent component to pass in additional css
  display: string;
}

const Button = (props: buttonProps) => {
  return (
    <button
      className={`${props.className}
        text-sm text-violet-500 bg-white box-content
        rounded-sm border border-violet-500
        hover:bg-violet-500 hover:text-white
        p-1 ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.display}
    </button>
  );
};

const ButtonLight = (props: buttonProps) => {
  return (
    <button
      className={`${props.className}
        text-white bg-violet-300
        box-content border-violet-500
        hover:text-white hover:bg-violet-400`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.display}
    </button>
  );
};

export { Button, ButtonLight };
