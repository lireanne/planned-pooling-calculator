import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

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

const ColourPicker = (props: { startingColor: string }) => {
  const { startingColor } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>(startingColor);
  const [pickerVisible, setPickerVisible] = useState(false);

  // Close picker upon clicking anywhere on screen
  useOutsideClick(ref, () => setPickerVisible(false));

  return (
    <div ref={ref} className="inline-block h-6 align-middle">
      <button
        className="h-full w-5/6 rounded-xl border box-content"
        style={{
          backgroundColor: color,
        }}
        onClick={() => setPickerVisible(!pickerVisible)}
      ></button>
      {pickerVisible && (
        <div className="z-99">
          <HexColorPicker
            color={color}
            onChange={(selected: string) => setColor(selected)}
          />
        </div>
      )}
    </div>
  );
};

export default ColourPicker;
