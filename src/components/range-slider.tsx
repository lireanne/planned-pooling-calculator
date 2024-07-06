import { FormEvent } from "react";

interface rangeSliderProps {
  min: number;
  max: number;
  value: number;
  onInput: (e: FormEvent<HTMLInputElement>) => void;
}

export const RangeSlider = (props: rangeSliderProps) => {
  const { min, max, value } = props;
  return (
    <div>
      <input
        className="w-full accent-violet-500"
        type="range"
        value={value}
        min={min}
        max={max}
        onInput={props.onInput}
      />
      <div className="-mt-2 flex w-full justify-between">
        <span className="text-xs">{min}</span>
        <span className="text-xs">{max}</span>
      </div>
    </div>
  );
};
