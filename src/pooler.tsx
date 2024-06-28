import { useState, useEffect, useCallback } from "react";
import ColorsInput from "./inputs/colors-input/index";
import Canvas from "./canvas/canvas";
import { nanoid } from "nanoid";

export type colorSection = {
  id: string;
  hex: string;
  count: number;
};

const defaultColorSections = [
  { id: nanoid(), hex: "#FFFFFF", count: 5 },
  { id: nanoid(), hex: "#FFFFFF", count: 5 },
  { id: nanoid(), hex: "#FFFFFF", count: 5 },
];

/** Component including input to select repeating color sections
 * and canvas to display the planned pooling.
 */
export const Pooler = () => {
  const [sections, setSections] =
    useState<colorSection[]>(defaultColorSections);

  const handleAddColor = () => {
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

  return (
    <div className="planned-pooling-body m-10">
      <ColorsInput
        sections={sections}
        handleAddColor={handleAddColor}
        handleUpdateColor={handleUpdateColor}
        handleUpdateCount={handleUpdateCount}
        handleRemoveSection={handleRemoveSection}
      />
      <Canvas colorsections={sections} />
    </div>
  );
};
