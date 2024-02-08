import { useState, useRef, useEffect } from "react";
import ColourPicker from "./ColourPicker";
import StitchCountInput from "./StitchCountInput";
import Button from "../../components/Button";

const startingColors: string[] = ["#000000", "#000000", "#000000"];

const RepeatInput = () => {
  //const { nColours } = props;
  const [nColors, setNumColors] = useState<number>(startingColors.length);

  return (
    <div className="w-56">
      <div className={`grid grid-rows-${startingColors.length + 1}`}>
        <div className="grid grid-cols-[40%_60%]">
          <p>Colour</p>
          <p># of Stitches</p>
        </div>
        {Array.from({ length: nColors }, (_, i) => (
          <div className="grid grid-cols-[40%_60%] mt-1 mb-1">
            <ColourPicker startingColor={startingColors[i]} />
            <div>
              <StitchCountInput startingCount={5} />
            </div>
          </div>
        ))}
      </div>

      <Button
        className="mt-2 items-right float-right"
        text="Add Color"
        onClick={() => setNumColors(nColors + 1)}
      ></Button>
    </div>
  );
};

const RepeatsInput = () => {
  return <RepeatInput />;
};

export default RepeatsInput;
