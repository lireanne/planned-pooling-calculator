import { useState, useRef, useEffect } from "react";
import { ChromePicker, ColorResult } from "react-color";

// Hook to close color picker upon clicking anywhere on screen
const useOutsideClick = (ref: any, callback: Function) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};

const ColourPicker = (props: { startingColor: string }) => {
  const { startingColor } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>(startingColor);
  const [pickerVisible, setPickerVisible] = useState(false);

  // Close picker upon clicking anywhere on screen
  useOutsideClick(ref, () => setPickerVisible(false));

  return (
    <div ref={ref} className="h-4 mr-1">
      <button
        className="h-full w-full rounded-sm box-content align-top"
        style={{
          backgroundColor: color,
        }}
        onClick={() => setPickerVisible(!pickerVisible)}
      ></button>
      {pickerVisible && (
        <div className="z-99">
          <ChromePicker
            color={color}
            onChange={(selected: ColorResult) => setColor(selected.hex)}
          />
        </div>
      )}
    </div>
  );
};

export default ColourPicker;
