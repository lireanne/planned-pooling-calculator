import { nanoid } from "nanoid";
import ColorPicker from "./color-picker";
import StitchCountInput from "./stitch-count-input";
import { Button, DeleteButton } from "../../components/button";
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
    <div className="input-container">
      <p>add colors</p>

      {sections.map((section, i) => (
        <div
          key={section.id}
          className="w-full my-1 whitespace-nowrap flex-no-wrap"
        >
          <ColorPicker
            colorSection={section}
            updateColor={handleUpdateColor}
            showPlaceholderText={i === 0}
          />
          <StitchCountInput
            colorSection={section}
            updateCount={handleUpdateCount}
            showPlaceholderText={i === 0}
          />
          <DeleteButton
            className={`align-top h-7 aspect-square rounded-sm mx-1 ${
              // Add margin-top to first element to accomodate placeholder text
              i === 0 && "mt-4"
            }`}
            display="×"
            onClick={() => {
              handleRemoveSection(section.id);
            }}
          ></DeleteButton>
        </div>
      ))}
      <Button
        className="text-md py-1 mt-1 w-full"
        display="add"
        onClick={() => handleAddColor()}
      ></Button>
    </div>
  );
};
