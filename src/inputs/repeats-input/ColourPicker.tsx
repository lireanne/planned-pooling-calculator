import { useState, useRef, useEffect } from "react";
import { SketchPicker, type ColorResult, type RGBColor } from "react-color";

// Hook to close color picker upon clicking anywhere on screen
const useOutsideClick = (ref: any, callback: Function) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("here");
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};

const ColourPicker = (props: { startingColour: RGBColor }) => {
  const { startingColour } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [colour, setColour] = useState<RGBColor>(startingColour);
  const [pickerVisible, setPickerVisible] = useState(false);

  // Close picker upon clicking anywhere on screen
  useOutsideClick(ref, () => setPickerVisible(false));

  return (
    <div ref={ref} className="inline-block box-border h-full align-middle">
      <button
        className="h-full w-[50px] rounded border"
        style={{
          backgroundColor: `rgb(${colour.r},${colour.g},${colour.b})`,
        }}
        onClick={() => setPickerVisible(!pickerVisible)}
      ></button>
      {pickerVisible && (
        <SketchPicker
          color={colour}
          onChange={(selected: ColorResult) => setColour(selected.rgb)}
        />
      )}
    </div>
  );
};

export default ColourPicker;
