import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ColorSectionInput } from "./color-section-input";
import { Button } from "../../components/button";
import { colorSection } from "../../pooler";

type colorSectionsInputProps = {
  sections: colorSection[];
  handleAddColor: () => void;
  handleUpdateColor: (newHex: string, id: string) => void;
  handleUpdateCount: (newCount: number, id: string) => void;
  handleRemoveSection: (id: string) => void;
  handleRandomizeColors: () => void;
  handleShuffleColors: () => void;
  handleDragSection: (event: DragEndEvent) => void;
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

export const ColorSectionsInput = (props: colorSectionsInputProps) => {
  const {
    sections,
    handleAddColor,
    handleUpdateColor,
    handleUpdateCount,
    handleRemoveSection,
    handleRandomizeColors,
    handleShuffleColors,
    handleDragSection,
  } = props;

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
              key={section.id}
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
        onClick={handleAddColor}
      ></Button>
      <hr className="h-px my-4 bg-gray-300 border-0"></hr>
      <Button
        className={buttonStyle}
        display="randomize!"
        onClick={handleRandomizeColors}
      ></Button>
      <Button
        className={buttonStyle}
        display="shuffle colors!"
        onClick={handleShuffleColors}
      ></Button>
    </div>
  );
};
