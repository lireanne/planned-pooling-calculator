import Switch from "react-switch";

/* Allows user to toggle between flat & circular knitting.
 * Flat = knitting back and forth in rows.
 * Circular = knitting in the round.
 *
 * If knitting flat, each row of the canvas will alternate between
 * displaying colors left-to-right and right-to-left.
 * If knitting circular, each row will display colors in the same direction.
 */
export const KnittingDirectionToggle = (props: {
  knitBackAndForth: boolean;
  setKnitBackAndForth: Function;
}) => {
  const { knitBackAndForth, setKnitBackAndForth } = props;

  return (
    <div className="input-container">
      <p className="mb-2">knitting direction</p>
      <label className="flex relative justify-beginning">
        {/*  label text is read out to people with reduced sight who use screen 
        readers and enables users to click on the text to toggle the switch. */}
        <span className="text-sm mr-2 align-center">Flat</span>
        <Switch
          className="align-center"
          onChange={() => setKnitBackAndForth(!knitBackAndForth)}
          checked={!knitBackAndForth}
          onColor="#8b5cf6"
          offColor="#8b5cf6"
          checkedIcon={false}
          uncheckedIcon={false}
          height={18}
          width={80}
        ></Switch>
        <span className="text-sm ml-2 align-center">Circular</span>
      </label>
    </div>
  );
};
