import { MouseEventHandler } from "react";

const Button = (props: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  return (
    <button
      className={`text-xs text-violet-500 bg-white 
        rounded-full border-[1px] border-violet-500
        hover:bg-violet-500 hover:text-white
        pl-2 pr-2 pt-1 pb-1 ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
