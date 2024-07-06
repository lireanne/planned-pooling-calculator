import { nanoid } from "nanoid";
import ColorPicker from "./color-picker";
import StitchCountInput from "./stitch-count-input";
import { Button, ButtonLight } from "../../components/button";
import { colorSection } from "../../pooler";

const startingSections = [{}, {}, {}];

type colorInputProps = {
  sections: colorSection[];
  setSections: (sections: colorSection[]) => void;
};

export const ColorSectionsInput = (props: colorInputProps) => {
  const { sections, setSections } = props;

  const handleAddColor = () => {
    const newSection = {
      id: nanoid(),
      hex: "#FFFFFF",
      count: 5,
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateColor = (newHex: string, id: string) => {
    const updatedSections = sections.map((section) => {
      return id === section.id ? { ...section, hex: newHex } : section;
    });
    setSections(updatedSections);
  };

  const handleUpdateCount = (newCount: number, updatedSectionId: string) => {
    const updatedSections = sections.map((section) => {
      return updatedSectionId === section.id
        ? { ...section, count: newCount }
        : section;
    });
    setSections(updatedSections);
  };

  const handleRemoveSection = (id: string) => {
    const remainingSections = sections.filter((section) => id !== section.id);
    setSections(remainingSections);
  };

  return (
    <div>
      <div className={`grid grid-rows-${startingSections.length + 1}`}>
        <div className="text-md">
          <p>add colors</p>
        </div>
        {sections.map((section) => (
          <div
            key={section.id}
            className="grid grid-cols-[80px_250px_auto] h-6 my-1.5"
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
              className="w-4"
              display="x"
              onClick={() => {
                handleRemoveSection(section.id);
              }}
            ></Button>
          </div>
        ))}
      </div>

      <Button
        className="mt-2 items-right float-right p-1 aspect-square h-6"
        display="+"
        onClick={() => handleAddColor()}
      ></Button>
    </div>
  );
};
