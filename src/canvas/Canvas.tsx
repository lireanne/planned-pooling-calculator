import React, { useRef, useEffect } from "react";
import { colorSection } from "../pooler";
import { hexIsLight } from "../utils";

const Canvas = (props: { colorsections: colorSection[] }) => {
  const { colorsections } = props;

  // TODO: make # of cols adjustable, and adapt # of rows accordingly
  const gridSettings = {
    cols: 10,
    rows: 10,
    gridSize: 20,
  };

  /** Return an array of hex values mapped to each of the grid cells*/
  const getGridHexValues = (colorSections: colorSection[]): string[] => {
    const nGrids = gridSettings.cols * gridSettings.rows;

    // Array of hex values per each repeat of colorSections
    const repeatedGrids = colorSections.reduce((acc, section) => {
      const { count, hex } = section;
      const x = Array<string>(count).fill(hex);
      return acc.concat(x);
    }, [] as string[]);

    // Get max # of times the colorSections can repeat within the grid
    const nRepeats = Math.floor(nGrids / repeatedGrids.length);
    const completeRepeats = Array(nRepeats).fill(repeatedGrids).flat();

    // Check if there are remaining grids left after all possible repeats
    const nRemainingGrids = nGrids - completeRepeats.length;
    if (nRemainingGrids > 0) {
      const remainingGrids = repeatedGrids.slice(0, nRemainingGrids);
      return [...completeRepeats, ...remainingGrids];
    }

    return completeRepeats;
  };

  const gridHexValues = getGridHexValues(colorsections);

  const getGridHexValue = (row: number, col: number): string => {
    return gridHexValues[row * gridSettings.cols + col];
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("colorsections:", colorsections);
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext("2d");

    if (context) {
      const { cols, rows, gridSize } = gridSettings;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hex = getGridHexValue(c, r);

          hexIsLight(hex)
            ? (context.strokeStyle = "lightgrey")
            : (context.strokeStyle = "white");

          context.fillStyle = hex;
          context.lineWidth = 1;
          context.strokeRect(r * gridSize, c * gridSize, gridSize, gridSize);
          context.fillRect(r * gridSize, c * gridSize, gridSize, gridSize);
        }
      }
    }
  }, [colorsections]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
