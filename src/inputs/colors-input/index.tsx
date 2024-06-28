import ColorPicker from "./color-picker";
import StitchCountInput from "./stitch-count-input";
import { Button } from "../../components/button";
import { colorSection } from "../../pooler";

const startingSections = [{}, {}, {}];

type repeatInputProps = {
  sections: colorSection[];
  handleAddColor: Function;
  handleUpdateColor: Function;
  handleUpdateCount: Function;
  handleRemoveSection: Function;
};

const ColorsInput = (props: repeatInputProps) => {
  const {
    sections,
    handleAddColor,
    handleUpdateColor,
    handleUpdateCount,
    handleRemoveSection,
  } = props;

  return (
    <div>
      <div className={`grid grid-rows-${startingSections.length + 1}`}>
        <div className="text-sm">
          <p>add colors</p>
        </div>
        {sections.map((section) => (
          <div
            key={section.id}
            className="grid grid-cols-[50px_auto_50px] h-4 my-1"
          >
            <ColorPicker
              colorSection={section}
              updateColor={handleUpdateColor}
            />
            <div>
              <StitchCountInput
                colorSection={section}
                updateCount={handleUpdateCount}
              />
            </div>
            <Button
              display="x"
              onClick={() => {
                handleRemoveSection(section.id);
              }}
            ></Button>
          </div>
        ))}
      </div>

      <Button
        className="mt-2 items-right float-right"
        display="add"
        onClick={() => handleAddColor()}
      ></Button>
    </div>
  );
};

export default ColorsInput;
