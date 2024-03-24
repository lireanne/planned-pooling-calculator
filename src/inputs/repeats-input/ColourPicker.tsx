import { useState, useRef, useEffect } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { colorSection } from "./index";

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

const ColourPicker = (props: {
  colorSection: colorSection;
  // hex: string;
  updateColor: Function;
}) => {
  const { colorSection, updateColor } = props;

  const screenRef = useRef<HTMLDivElement | null>(null);

  const [color, setColor] = useState<string>(colorSection.hex);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    updateColor(color);
  }, [color]);

  // Close picker upon clicking anywhere on screen
  useOutsideClick(screenRef, () => setPickerVisible(false));

  return (
    <div ref={screenRef} className="h-4 mr-1">
      <button
        className="h-full w-full rounded-sm border align-top"
        style={{
          background: color,
          border: "solid rgba(0, 0, 0, 0.2)",
        }}
        onClick={() => setPickerVisible(!pickerVisible)}
      ></button>
      {pickerVisible && (
        <div className="z-99">
          <ChromePicker
            color={color}
            onChange={(selected: ColorResult) => {
              setColor(selected.hex);
              updateColor(color, colorSection.id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ColourPicker;
