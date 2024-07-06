import { useState } from "react";
import { ColorSectionsInput } from "./inputs/add-color-section/index";
import { CanvasStitchCountInput } from "./inputs/canvas-stitch-input";
import { FlatCircularToggle } from "./inputs/flat-vs-circular-toggle";
import Canvas from "./canvas/canvas";
import {
  MIN_STITCHES,
  DEFAULT_STITCHES,
  MAX_STITCHES,
  KNIT_BACK_AND_FORTH,
} from "./constants";
import { nanoid } from "nanoid";

// represents a section of the swatch/canvas where a specific color repeats a certain number of stitches
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

export const Pooler = () => {
  // Color sections to be repeated within the canvas
  const [sections, setSections] =
    useState<colorSection[]>(defaultColorSections);

  // # of stitches per row represented by # of columns in the canvas
  const [canvasCols, setCanvasCols] = useState(DEFAULT_STITCHES);

  const [knitBackAndForth, setKnitBackAndForth] = useState(KNIT_BACK_AND_FORTH);

  const canvasColsWithinBounds =
    canvasCols >= MIN_STITCHES
      ? canvasCols <= MAX_STITCHES
        ? canvasCols
        : MAX_STITCHES
      : MIN_STITCHES;

  return (
    <div className="lg:flex grid-rows-2 gap-10">
      <div className="basis-1/4">
        <FlatCircularToggle
          knitBackAndForth={knitBackAndForth}
          setKnitBackAndForth={setKnitBackAndForth}
        />
        <CanvasStitchCountInput cols={canvasCols} setCols={setCanvasCols} />
        <ColorSectionsInput sections={sections} setSections={setSections} />
      </div>
      <div className="h-[80vh]">
        <Canvas
          colorSections={sections}
          cols={canvasColsWithinBounds}
          knitBackAndForth={knitBackAndForth}
        />
      </div>
    </div>
  );
};
