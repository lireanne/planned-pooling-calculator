import { useState, useRef, useEffect, useCallback } from "react";
import ColourPicker from "./ColourPicker";
import StitchCountInput from "./StitchCountInput";
import { Button } from "../../components/Button";

const startingSections = [{}, {}, {}];

export type colorSection = {
  hex: string;
  count: number;
};

const RepeatInput = () => {
  const [sections, setSections] = useState<colorSection[]>([]);

  const addSection = () => {
    const newSection = {
      hex: "#FFFFFF",
      count: 5,
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateColor = (newHex: string, index: number) => {
    const updatedSections = sections.map((section, i) => {
      return i === index ? { ...section, hex: newHex } : section;
    });
    setSections(updatedSections);
  };

  const handleUpdateCount = (newCount: number, index: number) => {
    const updatedSections = sections.map((section, i) => {
      return i === index ? { ...section, count: newCount } : section;
    });
    setSections(updatedSections);
  };

  const handleRemoveSection = (index: number) => {
    // TODO: fix so the right item in order of array is deleted
    const remainingSections = sections.filter((_, i) => i !== index);
    setSections(remainingSections);
  };

  useEffect(() => {
    console.log("sections", sections);
  }, [sections]);

  return (
    <div>
      <div className={`grid grid-rows-${startingSections.length + 1}`}>
        <div className="text-sm">
          <p>add colors</p>
        </div>
        {sections.map((section, index) => (
          <div
            key={`color-${index}`}
            className="grid grid-cols-[50px_auto_50px] h-4 my-1"
          >
            <ColourPicker
              hex={section.hex}
              index={index}
              updateColor={handleUpdateColor}
            />
            <div>
              <StitchCountInput
                colorSection={section}
                index={index}
                updateCount={handleUpdateCount}
              />
            </div>
            <Button
              display="x"
              onClick={() => {
                handleRemoveSection(index);
              }}
            ></Button>
          </div>
        ))}
      </div>

      <Button
        className="mt-2 items-right float-right"
        display="add"
        onClick={() => addSection()}
      ></Button>
    </div>
  );
};

const RepeatsInput = () => {
  return <RepeatInput />;
};

export default RepeatsInput;
