import React, { useRef, useEffect } from "react";
import { colorSection } from "../inputs/repeats-input";
import { start } from "repl";

const Canvas = (props: any) => {
  // test value
  const test: colorSection[] = [
    {
      id: "85s66d706fSa9-kb-aJBh",
      hex: "#c97b7b",
      count: 4,
    },
    {
      id: "Kv7QMhdk5x2zhsULsWqOT",
      hex: "#2d904f",
      count: 3,
    },
  ];

  // TODO: make # of cols adjustable, and adapt # of rows accordingly
  const gridSettings = {
    cols: 10,
    rows: 10,
    gridSize: 10,
  };

  const getGridHexValues = (colorSections: colorSection[]) => {
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
    const nRemainingGrids = nGrids - (completeRepeats.length + 1);
    if (nRemainingGrids > 0) {
      const remainingGrids = repeatedGrids.slice(0, nRemainingGrids);
      return [...completeRepeats, ...remainingGrids];
    }

    return completeRepeats;
  };

  const gridHexValues = getGridHexValues(test);

  const getGridHexValue = (row: number, col: number): string => {
    return gridHexValues[row * gridSettings.cols + col];
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext("2d");

    if (context) {
      const { cols, rows, gridSize } = gridSettings;

      context.strokeStyle = "white";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hex = getGridHexValue(c, r);
          context.fillStyle = hex;

          context.lineWidth = 1;
          context.strokeRect(r * gridSize, c * gridSize, gridSize, gridSize);
          context.fillRect(r * gridSize, c * gridSize, gridSize, gridSize);
        }
      }
    }
  }, []);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
