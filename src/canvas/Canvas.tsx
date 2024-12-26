import { useRef, useEffect } from "react";
import { colorSection } from "../pooler";
import { hexIsLight } from "../utils";

type canvasProps = {
  colorSections: colorSection[];
  cols: number;
  knitBackAndForth?: boolean; // optional prop to toggle back-and-forth knitting
};

/** Using a grid to represent a knitted swatch, where the color of each cell
 * is determined by the given colorSections prop.
 */
const Canvas = (props: canvasProps) => {
  const { colorSections, cols, knitBackAndForth } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get the full repeat of colorSections as an array of hex values
  const fullRepeat = colorSections.reduce((acc, section) => {
    const { count, hex } = section;
    const x = count ? Array<string>(count).fill(hex) : [];
    return acc.concat(x);
  }, [] as string[]);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext("2d");

    if (context) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Given the user-specified number of columns (as stitches per row),
      // calculate the size of each grid cell and the total number of rows
      const cellWidth = Math.floor(canvas.width / cols);
      const cellHeight = Math.floor((cellWidth / 4) * 5); // 5:4 aspect ratio for a knitted stitch
      const rows = Math.floor(canvas.height / cellHeight);

      const drawCell = (col: number, row: number, hex: string) => {
        hexIsLight(hex)
          ? (context.strokeStyle = "lightgray")
          : (context.strokeStyle = "white");

        context.fillStyle = hex;
        context.lineWidth = 0.5;

        context.beginPath();
        context.rect(
          // Add 0.5 to prevent anti-aliasing https://stackoverflow.com/a/8696641
          col * cellWidth + 0.5,
          row * cellHeight + 0.5,
          cellWidth,
          cellHeight
        );
        context.fill();
        context.stroke();
      };

      let tracker = 0; // Track current position in the fullRepeat array

      let shouldReverseCurrentRow = false;

      // Iterate through each grid cell and fill in the corresponding color
      // starting from the bottom-right corner (per knitting convention)
      for (let r = rows - 1; r >= 0; r--) {
        if (shouldReverseCurrentRow) {
          for (let c = 0; c < cols; c++) {
            const hex = fullRepeat[tracker];
            tracker = tracker === fullRepeat.length - 1 ? 0 : tracker + 1;
            drawCell(c, r, hex);
          }
        } else {
          for (let c = cols - 1; c >= 0; c--) {
            const hex = fullRepeat[tracker];
            tracker = tracker === fullRepeat.length - 1 ? 0 : tracker + 1;
            drawCell(c, r, hex);
          }
        }

        // If backAndForth is enabled, next row should be reversed
        knitBackAndForth &&
          (shouldReverseCurrentRow = !shouldReverseCurrentRow);
      }
    }
  }, [colorSections, cols, knitBackAndForth, fullRepeat]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
