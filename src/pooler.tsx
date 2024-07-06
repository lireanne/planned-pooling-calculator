import { useState, useEffect, useRef } from "react";
import { ColorSectionsInput } from "./inputs/color-section-input/index";
import { CanvasStitchCountInput } from "./inputs/canvas-stitch-count/index";
import Canvas from "./canvas/canvas";
import { MININMUM_STITCHES, DEFAULT_STITCHES } from "./constants";
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
    <div className="planned-pooling-body flex flex-row">
      <div className="basis-1/2">
        <ColorSectionsInput sections={sections} setSections={setSections} />
        <CanvasStitchCountInput cols={canvasCols} setCols={setCanvasCols} />
        {canvasCols < MININMUM_STITCHES && (
          <p className="text-xs text-red-500">
            Minimum stitches per row is {MININMUM_STITCHES}
          </p>
        )}
      </div>
      <Canvas
        colorsections={sections}
        cols={canvasCols >= MININMUM_STITCHES ? canvasCols : MININMUM_STITCHES}
      />
    </div>
  );
};
