/** Given a hex string, get its luma (brightness) values.
 * @output Number between 0..255 from dark to light.
 * https://www.w3.org/TR/AERT/#color-contrast
 */
const getHexBrightness = (hex: string): number => {
  if (hex.length !== 7 || hex.charAt(0) !== "#") {
    console.error("hex code must follow #RRGGBB format");
  }

  const h = hex.substring(1); // strip #
  const rgb = parseInt(h, 16); // convert to ecimal;
  const [r, g, b] = [
    (rgb >> 16) & 0xff, // extract red
    (rgb >> 8) & 0xff, // extract green
    (rgb >> 0) & 0xff, // extract blue
  ];

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma;
};

/** Return boolean on if a hex code converts to a bright color
 * where bright is defined as luma value > 220.
 */
export const hexIsLight = (hex: string): boolean => {
  const luma = getHexBrightness(hex);
  return luma > 220;
};
