import React from "react";
import type { FC } from "react";
import IconPark, { IconType } from "@icon-park/react/es/all";
import "@icon-park/react/styles/index.css";

const DEFAULT_COLOR = "#483528";

type IconTheme = "outline" | "filled";

interface IconProps {
  className?: string;
  type: IconType;
  theme?: IconTheme;
  size?: number | string;
  fill?: string;
}

export const Icon: FC<IconProps> = ({
  className,
  type,
  theme = "outline",
  size,
  fill = DEFAULT_COLOR,
}) => {
  // const defaultColor = theme === "outline" ? color : [color, color];
  return (
    <IconPark
      className={className}
      type={type}
      theme={theme}
      size={size}
      fill={fill}
    />
  );
};
