import { useState, KeyboardEventHandler } from "react";
import { Button, ButtonLight } from "../../components/Button";

const StitchCountInput = (props: { startingCount: number }) => {
  const { startingCount } = props;
  const [count, setCount] = useState<number>(startingCount);

  const handleKeyPress: KeyboardEventHandler = (e) => {
    if (["ArrowUp", "+"].includes(e.key)) {
      setCount(count + 1);
    }

    if (["ArrowDown", "-"].includes(e.key)) {
      setCount(count - 1);
    }
  };

  return (
    <div className="h-4 text-xs">
      <span>
        ×
        <input
          type="number"
          className="h-full w-[50px] border px-1 mx-1 border-gray-400 rounded-sm"
          value={count}
          onKeyDown={(e) => handleKeyPress(e)}
          onChange={() => console.log(count)}
        ></input>
        stitches
      </span>

      <ButtonLight
        className="h-full aspect-square ml-1"
        display="-"
        data-action="increment"
        onClick={() => setCount(count + 1)}
      />
      <ButtonLight
        className="h-full aspect-square ml-1"
        display="+"
        data-action="increment"
        onClick={() => setCount(count + 1)}
      />
    </div>
  );
};

export default StitchCountInput;
