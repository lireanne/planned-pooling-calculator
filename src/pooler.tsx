import { useState, useEffect, useRef } from "react";
import { ColorSectionsInput } from "./inputs/color-section-input/index";
import { CanvasStitchCountInput } from "./inputs/canvas-stitch-count/index";
import Canvas from "./canvas/canvas";
import { MIN_STITCHES, DEFAULT_STITCHES } from "./constants";
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

export const Pooler = () => {
  // Color sections to be repeated within the canvas
  const [sections, setSections] =
    useState<colorSection[]>(defaultColorSections);

  // # of stitches per row represented by # of columns in the canvas
  const [canvasCols, setCanvasCols] = useState(DEFAULT_STITCHES);

  return (
    <div className="lg:flex grid-rows-2 gap-10">
      <div className="basis-1/4">
        <CanvasStitchCountInput cols={canvasCols} setCols={setCanvasCols} />
        <ColorSectionsInput sections={sections} setSections={setSections} />
      </div>
      <div className="h-[80vh] border-l border-t">
        <Canvas
          colorsections={sections}
          cols={canvasCols >= MIN_STITCHES ? canvasCols : MIN_STITCHES}
        />
      </div>
    </div>
  );
};
