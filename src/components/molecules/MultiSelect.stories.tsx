import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MultiSelect, OptionType } from "./MultiSelect";
import type { IdType } from "./MultiSelect";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "molecules/MultiSelect",
  component: MultiSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MultiSelect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MultiSelect> = (args) => {
  const [value, setValue] = useState<IdType[]>([0]);
  const [options, setOptions] = useState<OptionType[]>([
    { id: 0, label: "option 1" },
    { id: 1, label: "option 2" },
  ]);

  const handleCreateItem = (option: OptionType) => {
    setOptions((prev) => [...prev, option]);
    setValue((prev) => [...prev, option.id]);
  };

  return (
    <MultiSelect
      options={options}
      value={value}
      onSelectItem={(id) => setValue((prev) => [...prev, id])}
      onDelete={(id) => setValue((prev) => prev.filter((_id) => _id !== id))}
      onCreateItem={handleCreateItem}
    />
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
