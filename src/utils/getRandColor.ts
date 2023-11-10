import { COLUMN_COLORS } from "~/utils/constants";

export const getRandColor = () => {
  return (
    COLUMN_COLORS[Math.floor(Math.random() * COLUMN_COLORS.length)] ?? "#000"
  );
};
