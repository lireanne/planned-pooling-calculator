import { useState, useEffect } from "react";
import { ButtonLight } from "../../components/button";
import { colorSection } from "../../pooler";

// Input component for updating the stitch count of a color section
const StitchCountInput = (props: {
  colorSection: colorSection;
  updateCount: Function;
}) => {
  const { colorSection, updateCount } = props;
  const [count, setCount] = useState<number>(props.colorSection.count);

  useEffect(() => {
    updateCount(count, colorSection.id);
  }, [count]);

  const decreaseCount = () => {
    const newCount = count - 1;
    newCount >= 0 ? setCount(newCount) : setCount(0);
  };

  return (
    <div className="h-6 text-md">
      <span className="mx-2">×</span>
      <span>
        <ButtonLight
          className="h-full aspect-square rounded-l-sm border border-violet-500"
          display="-"
          data-action="decrement"
          onClick={() => decreaseCount()}
        />
        <input
          type="number"
          className="h-full w-[40px] text-center border-y box-content border-violet-500"
          value={count}
          onKeyDown={(e) => {
            ["ArrowUp", "+"].includes(e.key) && setCount(count + 1);
            ["ArrowDown", "-"].includes(e.key) && decreaseCount();
          }}
        ></input>
        <ButtonLight
          className="h-full aspect-square rounded-r-sm border border-violet-500"
          display="+"
          data-action="increment"
          onClick={() => setCount(count + 1)}
        />
      </span>

      <span className="mx-2">stitches</span>
    </div>
  );
};

export default StitchCountInput;
