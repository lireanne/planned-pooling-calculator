import ColorPicker from "./color-picker";
import StitchCountInput from "./stitch-count-input";
import { DeleteButton } from "../../components/button";
import { DragSortIcon } from "../../components/icon";
import { colorSection } from "../../pooler";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type colorSectionInputProps = {
  section: colorSection;
  handleUpdateColor: (newHex: string, id: string) => void;
  handleUpdateCount: (newCount: number, id: string) => void;
  handleRemoveSection: (id: string) => void;
  colorPickerColStyle?: string;
  stitchCountColStyle?: string;
  deleteColStyle?: string;
  sortColStyle?: string;
};

/** Input component for updating a single color section
 * (updating color, stitch count, and delete section) */
export const ColorSectionInput = (props: colorSectionInputProps) => {
  const {
    section,
    handleUpdateColor,
    handleUpdateCount,
    handleRemoveSection,
    colorPickerColStyle,
    stitchCountColStyle,
    deleteColStyle,
    sortColStyle,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id: section.id });

  return (
    <div
      key={section.id}
      className="whitespace-nowrap flex-no-wrap mb-1"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div
        className={sortColStyle}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <DragSortIcon className="h-full"></DragSortIcon>
      </div>
      <ColorPicker
        colorSection={section}
        updateColor={handleUpdateColor}
        style={colorPickerColStyle}
      />
      <StitchCountInput
        colorSection={section}
        updateCount={handleUpdateCount}
        style={stitchCountColStyle}
      />
      <DeleteButton
        className={deleteColStyle}
        display="×"
        onClick={() => {
          handleRemoveSection(section.id);
        }}
      ></DeleteButton>
    </div>
  );
};
