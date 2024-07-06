/** Input component for setting the number of stitches per row in the canvas */
export const CanvasStitchCountInput = (props: {
  cols: number;
  setCols: (cols: number) => void;
}) => {
  const { cols, setCols } = props;

  return (
    <div>
      <div>
        <p>swatch size</p>
      </div>

      <div>
        <span>stitches per row: </span>
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value))}
          className="border border-gray-300 rounded-md p-1"
        />
      </div>
    </div>
  );
};
