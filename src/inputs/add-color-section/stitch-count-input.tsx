import { useState, useEffect } from "react";
import { ButtonLight } from "../../components/button";
import { colorSection } from "../../pooler";

// Input component for updating the stitch count of a color section
const StitchCountInput = (props: {
  colorSection: colorSection;
  updateCountToPooler: (newCount: number, id: string) => void;
  style?: string;
}) => {
  const { colorSection, updateCountToPooler, style } = props;
  const [count, setCount] = useState<number>(props.colorSection.count);

  useEffect(() => {
    updateCountToPooler(count, colorSection.id);
  }, [count, colorSection.id]);

  const decreaseCount = () => {
    const newCount = count - 1;
    newCount >= 0 ? setCount(newCount) : setCount(0);
  };

  return (
    <div className={style}>
      <ButtonLight
        className="w-7 aspect-square rounded-l-sm align-top"
        display="-"
        data-action="decrement"
        onClick={() => decreaseCount()}
      />
      <input
        type="number"
        className="h-full text-center border-y align-top"
        value={count}
        onChange={(e) => {
          setCount(parseInt(e.target.value));
        }}
        onKeyDown={(e) => {
          ["ArrowUp", "+"].includes(e.key) && setCount(count + 1);
          ["ArrowDown", "-"].includes(e.key) && decreaseCount();
        }}
      />
      <ButtonLight
        className="w-7 aspect-square rounded-r-sm align-top"
        display="+"
        data-action="increment"
        onClick={() => setCount(count + 1)}
      />
    </div>
  );
};

export default StitchCountInput;
