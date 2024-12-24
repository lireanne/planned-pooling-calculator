import { MIN_STITCHES, MAX_STITCHES } from "../constants";
import { RangeSlider } from "../components/range-slider";

/** Input component for setting the number of stitches per row in the canvas */
export const CanvasStitchCountInput = (props: {
  cols: number;
  setCols: (cols: number) => void;
}) => {
  const { cols, setCols } = props;

  return (
    <div className="input-container">
      <h1>swatch size</h1>
      <div className="mb-4 w-full">
        <div className="text-xs">stitches per row</div>
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value))}
          className="w-full border border-violet-500 rounded-sm p-1"
        />

        {cols < MIN_STITCHES && (
          <p className="text-xs text-red-500">
            Minimum stitches per row is {MIN_STITCHES}
          </p>
        )}

        {cols > MAX_STITCHES && (
          <p className="text-xs text-red-500">
            Maximum stitches per row is {MAX_STITCHES}
          </p>
        )}
      </div>

      <RangeSlider
        min={MIN_STITCHES}
        max={MAX_STITCHES}
        value={cols}
        onInput={(e) => setCols(parseInt(e.currentTarget.value))}
      />
    </div>
  );
};
