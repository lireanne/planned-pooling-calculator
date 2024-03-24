import { useState, useEffect } from "react";
import { ButtonLight } from "../../components/Button";
import { colorSection } from "./index";

const StitchCountInput = (props: {
  colorSection: colorSection;
  updateCount: Function;
}) => {
  const { colorSection, updateCount } = props;
  const [count, setCount] = useState<number>(props.colorSection.count);

  useEffect(() => {
    updateCount(count, colorSection.id);
  }, [count]);

  return (
    <div className="h-4 text-xs">
      <span>×</span>
      <span className="h-4 px-1">
        <ButtonLight
          className="h-full aspect-square rounded-l-sm border border-violet-500"
          display="-"
          data-action="decrement"
          onClick={() => setCount(count - 1)}
        />
        <input
          type="number"
          className="h-full w-[40px] text-center border-y border-violet-500"
          value={count}
          onKeyDown={(e) => {
            ["ArrowUp", "+"].includes(e.key) && setCount(count + 1);
            ["ArrowDown", "-"].includes(e.key) && setCount(count - 1);
          }}
        ></input>
        <ButtonLight
          className="h-full aspect-square rounded-r-sm border border-violet-500"
          display="+"
          data-action="increment"
          onClick={() => setCount(count + 1)}
        />
      </span>

      <span>stitches</span>
    </div>
  );
};

export default StitchCountInput;
