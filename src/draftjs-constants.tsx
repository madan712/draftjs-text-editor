import React from "react";
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";

type ControlType = {
  icon: React.ReactElement;
  name: string;
};

export const inlineControls: ControlType[] = [
  {
    icon: <FaBold title="bold" />,
    name: "BOLD",
  },
  {
    icon: <FaItalic title="italic" />,
    name: "ITALIC",
  },
  {
    icon: <FaUnderline title="underline" />,
    name: "UNDERLINE",
  },
  {
    icon: <FaCode title="code" />,
    name: "CODE",
  },
];

export const blockControls: ControlType[] = [
  {
    icon: <FaHeading title="H1" />,
    name: "header-one",
  },
  {
    icon: <FaListUl title="unordered list" />,
    name: "unordered-list-item",
  },
  {
    icon: <FaListOl title="ordered list" />,
    name: "ordered-list-item",
  },
];
