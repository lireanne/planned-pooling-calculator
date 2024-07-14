import { nanoid } from "nanoid";
import { colorSection } from "./pooler";

export const DEFAULT_STITCHES = 60;
export const MAX_STITCHES = 150;
export const MIN_STITCHES = 20;
export const DEFAULT_KNIT_BACK_AND_FORTH = true; // default knitting direction

export const DEFAULT_COLOR_SECTIONS = [
  {
    hex: "#B9E3B6",
    count: 4,
  },
  {
    hex: "#70A37F",
    count: 4,
  },
  {
    hex: "#41658A",
    count: 6,
  },
  {
    hex: "#414073",
    count: 9,
  },
  {
    hex: "#4C3957",
    count: 8,
  },
];

export const HEX_PALETTES = [
  ["#79B473", "#70A37F", "#41658A", "#414073", "#4C3957"],
  ["#fef6e4", "#8bd3dd", "#f582ae", "#f3d2c1"],
  ["#55423d", "#e78fb3", "#ffc0ad", "#9656a1", "#fff3ec", "#271c19"],
  ["#faeee7", "#ff8ba7", "#ffc6c7", "#c3f0ca", "#fffffe"],
  ["#fffffe", "#ffd803", "#e3f6f5", "#bae8e8"],
  ["#0f0e17", "#ff8906", "#f25f4c", "#e53170", "#fffffe"],
  ["#232946", "#eebbc3", "#fffffe", "#b8c1ec", "#d4d8f0"],
  ["#f9f4ef", "#8c7851", "#eaddcf", "#f25042", "#fffffe"],
  ["#004643", "#f9bc60", "#abd1c6", "#e16162", "#e8e4e6"],
  ["#eff0f3", "#ff8e3c", "#fffffe", "#d9376e"],
  ["#f8f5f2", "#078080", "#f45d48", "#fffffe"],
  ["#fec7d7", "#d9d4e7", "#a786df", "#f9f8fc", "#fffffe"],
  ["#fffffe", "#6246ea", "#d1d1e9", "#e45858"],
  ["#f2f7f5", "#faae2b", "#ffa8ba", "#fa5246", "#00473e"],
  ["#16161a", "#7f5af0", "#72757e", "#2cb67d", "#fffffe", "#242629"],
  ["#fffffe", "#3da9fc", "#90b4ce", "#ef4565", "#d8eefe"],
  ["#fffffe", "#00ebc7", "#ff5470", "#fde24f", "#f2f4f6"],
  ["#fffffe", "#4fc4cf", "#994ff3", "#fbdd74", "#f2eef5", "#f6efef"],
];
