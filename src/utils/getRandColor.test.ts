import { getRandColor } from "~/utils/getRandColor";
import { COLUMN_COLORS } from "~/utils/constants";

describe("getRandColor", () => {
  test("should return a string", () => {
    const result = getRandColor();
    expect(typeof result).toBe("string");
  });

  test("should return a valid color", () => {
    const result = getRandColor();
    expect(result).toMatch(/^#[0-9a-f]{3,6}$/i);
  });

  test("should return a color from COLUMN_COLORS or default to #000", () => {
    const result = getRandColor();
    expect(COLUMN_COLORS.includes(result) || result === "#000").toBe(true);
  });
});
