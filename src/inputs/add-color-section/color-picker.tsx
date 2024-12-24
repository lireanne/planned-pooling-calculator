import { useState, useRef, useEffect } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { colorSection } from "../../pooler";
import { Button } from "../../components/button";

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
  }, [ref, callback]);
};

const ColorPicker = (props: {
  colorSection: colorSection;
  updateColor: Function;
  style?: string;
}) => {
  const { colorSection, updateColor, style } = props;

  const screenRef = useRef<HTMLDivElement | null>(null);

  const [color, setColor] = useState<string>(colorSection.hex);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    updateColor(color);
  }, [color, updateColor]);

  // Close picker upon clicking anywhere on screen
  useOutsideClick(screenRef, () => setPickerVisible(false));

  return (
    <div ref={screenRef} className={style}>
      <Button
        className="h-7 w-full rounded-sm"
        style={{
          backgroundColor: color,
          border: "solid rgba(0, 0, 0, 0.2)",
          borderSizing: "border-box",
        }}
        display=""
        onClick={() => setPickerVisible(!pickerVisible)}
      />
      {pickerVisible && (
        <div className="absolute z-99">
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

export default ColorPicker;
