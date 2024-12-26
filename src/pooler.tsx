import { useState, useEffect } from "react";
import { ColorSectionsInput } from "./inputs/add-color-section/color-sections-input";
import { CanvasStitchCountInput } from "./inputs/canvas-stitch-input";
import { KnittingDirectionToggle } from "./inputs/knitting-direction-toggle";
import Canvas from "./canvas/canvas";
import {
  MIN_STITCHES,
  DEFAULT_STITCHES,
  MAX_STITCHES,
  DEFAULT_KNIT_BACK_AND_FORTH,
  DEFAULT_COLOR_SECTIONS,
  HEX_PALETTES,
} from "./constants";
import { nanoid } from "nanoid";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

// represents a section of the swatch/canvas where a specific color repeats a certain number of stitches
export type colorSection = {
  id: string;
  hex: string;
  count: number;
};

export const Pooler = () => {
  useEffect(() => {
    console.log("Pooler mounted");
  }, []);
  // Color sections to be repeated within the canvas
  const [sections, setSections] = useState<colorSection[]>(() => {
    return DEFAULT_COLOR_SECTIONS.map((section) => ({
      ...section,
      id: nanoid(),
    }));
  });

  useEffect(() => {
    console.log("Pooler updated w/ sections");
  }, [sections]);

  // # of stitches per row represented by # of columns in the canvas
  const [canvasCols, setCanvasCols] = useState(DEFAULT_STITCHES);

  // toggle knitting direction (ie. render pixels back and forth or unidirectionally)
  const [knitBackAndForth, setKnitBackAndForth] = useState(
    DEFAULT_KNIT_BACK_AND_FORTH
  );

  // Ensure canvasCols is within bounds
  const canvasColsWithinBounds =
    canvasCols >= MIN_STITCHES
      ? canvasCols <= MAX_STITCHES
        ? canvasCols
        : MAX_STITCHES
      : MIN_STITCHES;

  // ---- Methods to handle CanvasStitchCountInput changes ----
  const handleCanvasStitchCountChange = (newCols: number) => {
    setCanvasCols(newCols);
  };

  // ---- Methods to handle ColorSectionsInput changes----
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
    <div className="lg:flex grid-rows-2 gap-10">
      <div className="basis-1/4">
        <KnittingDirectionToggle
          knitBackAndForth={knitBackAndForth}
          setKnitBackAndForth={setKnitBackAndForth}
        />
        <CanvasStitchCountInput
          cols={canvasCols}
          handleUpdate={handleCanvasStitchCountChange}
        />
        <ColorSectionsInput
          sections={sections}
          handleAddColor={handleAddColor}
          handleUpdateColor={handleUpdateColor}
          handleUpdateCount={handleUpdateCount}
          handleRemoveSection={handleRemoveSection}
          handleRandomizeColors={handleRandomizeColors}
          handleShuffleColors={handleShuffleColors}
          handleDragSection={handleDragSection}
        />
      </div>
      <div className="h-[85vh]">
        <Canvas
          colorSections={sections}
          cols={canvasColsWithinBounds}
          knitBackAndForth={knitBackAndForth}
        />
      </div>
    </div>
  );
};
