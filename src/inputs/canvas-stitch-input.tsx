import { MIN_STITCHES, MAX_STITCHES } from "../constants";
import { RangeSlider } from "../components/range-slider";

/** Input component for setting the number of stitches per row in the canvas */
export const CanvasStitchCountInput = (props: {
  cols: number;
  handleUpdate: (cols: number) => void;
}) => {
  const { cols, handleUpdate } = props;

  return (
    <div className="input-container">
      <h1>swatch size</h1>
      <div className="mb-4 w-full">
        <div className="text-xs">stitches per row</div>
        <input
          type="number"
          value={cols}
          onChange={(e) => handleUpdate(parseInt(e.target.value))}
          className="w-full rounded-sm p-1"
        />

        {cols < MIN_STITCHES && (
          <p className="warning-message">
            Minimum stitches per row is {MIN_STITCHES}
          </p>
        )}

        {cols > MAX_STITCHES && (
          <p className="warning-message">
            Maximum stitches per row is {MAX_STITCHES}
          </p>
        )}
      </div>

      <RangeSlider
        min={MIN_STITCHES}
        max={MAX_STITCHES}
        value={cols}
        onInput={(e) => handleUpdate(parseInt(e.currentTarget.value))}
      />
    </div>
  );
};
