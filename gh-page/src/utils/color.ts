import { rgbToHex } from "@mui/system";

export function colorStringToHex(color: string) {
  if (color.includes("rgb")) color = rgbToHex(color);

  color = color.replace("#", "");
  if (color.length === 3) color = color + color;
  return color;
}
