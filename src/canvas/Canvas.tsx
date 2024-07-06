import React, { useRef, useLayoutEffect, useEffect } from "react";
import { colorSection } from "../pooler";
import { hexIsLight } from "../utils";

type canvasProps = {
  colorsections: colorSection[];
  cols: number;
};

/** Using a grid to represent a knitted swatch, where the color of each cell
 * is determined by the given colorSections prop.
 */
const Canvas = (props: canvasProps) => {
  const { colorsections, cols } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Return an array of hex values mapped to each of the grid cells
  const getAllGridHexValues = (
    colorSections: colorSection[],
    totalGrids: number
  ): string[] => {
    // Array of hex values per each repeat of colorSections
    const repeatedGrids = colorSections.reduce((acc, section) => {
      const { count, hex } = section;
      const x = Array<string>(count).fill(hex);
      return acc.concat(x);
    }, [] as string[]);

    // Get max # of times the colorSections can repeat within the grid
    const nRepeats = Math.floor(totalGrids / repeatedGrids.length);
    const completeRepeats = Array(nRepeats).fill(repeatedGrids).flat();

    // Check if there are remaining grids left after all possible repeats
    const nRemainingGrids = totalGrids - completeRepeats.length;
    if (nRemainingGrids > 0) {
      const remainingGrids = repeatedGrids.slice(0, nRemainingGrids);
      return [...completeRepeats, ...remainingGrids];
    }

    return completeRepeats;
  };

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext("2d");

    if (context) {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;

      // Given the user-specified number of columns (as stitches per row),
      // calculate the size of each grid cell and the total number of rows
      const gridWidth = Math.floor(canvas.width / cols);
      const gridHeight = (gridWidth / 4) * 5; // 5:4 aspect ratio for a knitted stitch
      const rows = Math.floor(canvas.height / gridHeight);

      const allGridHexValues = getAllGridHexValues(colorsections, rows * cols);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Get the hex value of the current grid cell from the allGridHexValues array
          const hex = allGridHexValues[r * cols + c];

          hexIsLight(hex)
            ? (context.strokeStyle = "lightgrey")
            : (context.strokeStyle = "white");

          context.fillStyle = hex;
          context.lineWidth = 1;
          context.strokeRect(
            c * gridWidth,
            r * gridHeight,
            gridWidth,
            gridHeight
          );
          context.fillRect(
            c * gridWidth,
            r * gridHeight,
            gridWidth,
            gridHeight
          );
        }
      }
    }
  }, [colorsections, cols]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
