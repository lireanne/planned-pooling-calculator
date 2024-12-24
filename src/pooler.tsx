import { useState } from "react";
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
} from "./constants";
import { nanoid } from "nanoid";

// represents a section of the swatch/canvas where a specific color repeats a certain number of stitches
export type colorSection = {
  id: string;
  hex: string;
  count: number;
};

export const Pooler = () => {
  // Color sections to be repeated within the canvas
  const [sections, setSections] = useState<colorSection[]>(
    DEFAULT_COLOR_SECTIONS.map((section) => ({ ...section, id: nanoid() }))
  );

  // # of stitches per row represented by # of columns in the canvas
  const [canvasCols, setCanvasCols] = useState(DEFAULT_STITCHES);

  const [knitBackAndForth, setKnitBackAndForth] = useState(
    DEFAULT_KNIT_BACK_AND_FORTH
  );

  const canvasColsWithinBounds =
    canvasCols >= MIN_STITCHES
      ? canvasCols <= MAX_STITCHES
        ? canvasCols
        : MAX_STITCHES
      : MIN_STITCHES;

  return (
    <div className="lg:flex grid-rows-2 gap-10">
      <div className="basis-1/4">
        <KnittingDirectionToggle
          knitBackAndForth={knitBackAndForth}
          setKnitBackAndForth={setKnitBackAndForth}
        />
        <CanvasStitchCountInput cols={canvasCols} setCols={setCanvasCols} />
        <ColorSectionsInput sections={sections} setSections={setSections} />
      </div>
      <div className="h-[90vh]">
        <Canvas
          colorSections={sections}
          cols={canvasColsWithinBounds}
          knitBackAndForth={knitBackAndForth}
        />
      </div>
    </div>
  );
};
