import { nanoid } from "nanoid";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ColorSectionInput } from "./color-section-input";
import { Button } from "../../components/button";
import { colorSection } from "../../pooler";
import { HEX_PALETTES } from "../../constants";

type colorInputProps = {
  sections: colorSection[];
  setSections: (sections: colorSection[]) => void;
};

/* style of each column in the input section
columns include: sort icon (w-2), color picker (w-[100px]), stitch count (h-7), delete button (h-7)
with 2-rem margin between each column
*/
const genStyle = "inline-block align-top mr-2";
const sortColStyle = genStyle + " w-5 h-7 align-middle rounded-sm";
const colorPickerColStyle = {
  header: genStyle + " w-[100px] ml-7", // ml-9 to left-align with the color-picker column (skip sort column)
  col: genStyle + " h-7 w-[100px]",
};
const stitchCountColStyle = {
  header: genStyle,
  col: genStyle + " h-7",
};
const deleteColStyle = genStyle + " h-7 aspect-square rounded-sm";

// CSS for large buttons at bottom of input section
const buttonStyle = "text-md py-1 mt-1 w-full";

export const ColorSectionsInput = (props: colorInputProps) => {
  const { sections, setSections } = props;

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

  const handleRandomizeColors = () => {
    const randomIntInRange = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const randomHexPalette =
      HEX_PALETTES[Math.floor(Math.random() * HEX_PALETTES.length)];

    const sections = randomHexPalette.map((hex, i) => {
      return {
        id: nanoid(),
        hex: hex,
        count: randomIntInRange(1, 10),
      };
    });

    setSections(sections);
  };

  const handleShuffleColors = () => {
    const shuffledSections = sections
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setSections(shuffledSections);
  };

  const handleDragSection = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(
        (section) => section.id === active.id
      );
      const newIndex = sections.findIndex((section) => section.id === over.id);

      const updatedSections = arrayMove(sections, oldIndex, newIndex);
      setSections(updatedSections);
    }
  };

  return (
    <div className="input-container">
      <h1>add colors</h1>

      {/* subtitles for each column within color sections */}
      <div className="text-xs">
        <div className={colorPickerColStyle.header}>color</div>
        <div className={stitchCountColStyle.header}>stitch count</div>
      </div>

      {/* draggable color section inputs */}
      <DndContext onDragEnd={handleDragSection}>
        <SortableContext
          items={sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <ColorSectionInput
              section={section}
              handleUpdateColor={handleUpdateColor}
              handleUpdateCount={handleUpdateCount}
              handleRemoveSection={handleRemoveSection}
              // styling for each column within colorsection input
              sortColStyle={sortColStyle}
              colorPickerColStyle={colorPickerColStyle.col}
              stitchCountColStyle={stitchCountColStyle.col}
              deleteColStyle={deleteColStyle}
            ></ColorSectionInput>
          ))}
        </SortableContext>
      </DndContext>

      <Button
        className={buttonStyle}
        display="add color"
        onClick={() => handleAddColor()}
      ></Button>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <Button
        className={buttonStyle}
        display="randomize!"
        onClick={() => handleRandomizeColors()}
      ></Button>
      <Button
        className={buttonStyle}
        display="shuffle colors!"
        onClick={() => handleShuffleColors()}
      ></Button>
    </div>
  );
};
