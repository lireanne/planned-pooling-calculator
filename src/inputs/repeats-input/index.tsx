import { useState, useEffect, useCallback } from "react";
import ColourPicker from "./ColourPicker";
import StitchCountInput from "./StitchCountInput";
import { Button } from "../../components/Button";
import { nanoid } from "nanoid";

const startingSections = [{}, {}, {}];

export type colorSection = {
  id: string;
  hex: string;
  count: number;
};

const RepeatInput = () => {
  const [sections, setSections] = useState<colorSection[]>([]);

  const addSection = () => {
    const newSection = {
      id: nanoid(),
      hex: "#FFFFFF",
      count: 5,
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateColor = (newHex: string, id: string) => {
    const updatedSections = sections.map((section) => {
      return id === section.id ? { ...section, hex: newHex } : section;
    });
    setSections(updatedSections);
  };

  const handleUpdateCount = (newCount: number, updatedSectionId: string) => {
    const updatedSections = sections.map((section) => {
      return updatedSectionId === section.id
        ? { ...section, count: newCount }
        : section;
    });
    setSections(updatedSections);
  };

  const handleRemoveSection = (id: string) => {
    const remainingSections = sections.filter((section) => id !== section.id);
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
        {sections.map((section) => (
          <div
            key={section.id}
            className="grid grid-cols-[50px_auto_50px] h-4 my-1"
          >
            <ColourPicker
              colorSection={section}
              updateColor={handleUpdateColor}
            />
            <div>
              <StitchCountInput
                colorSection={section}
                updateCount={handleUpdateCount}
              />
            </div>
            <Button
              display="x"
              onClick={() => {
                handleRemoveSection(section.id);
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
