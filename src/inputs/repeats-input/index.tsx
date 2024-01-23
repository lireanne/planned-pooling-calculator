import ColourPicker from "./ColourPicker";
import StitchCountInput from "./StitchCountInput";
import { type RGBColor } from "react-color";

const startingColours: RGBColor[] = [
  {
    r: 0,
    g: 0,
    b: 0,
  },
];

const RepeatInput = () => {
  return (
    <>
      <div>
        <p>Add sections of repeating colours:</p>
        <div className="h-6 m-2">
          <ColourPicker startingColour={startingColours[0]} />
          <StitchCountInput startingCount={5} />
        </div>
      </div>
    </>
  );
};

const RepeatsInput = () => {
  return <RepeatInput />;
};

export default RepeatsInput;
