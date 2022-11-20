import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useModal } from "@hooks";
import { Button } from "@components/atoms";

import { Modal } from "./Modal";

export default {
  title: "templates/Modal",
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const modal = useModal();

  const handleClick = () => {
    modal.putContent("this is an example");
    modal.show();
  };
  return (
    <div className="flex">
      <Button
        onClick={handleClick}
        className="rounded-md border-2 border-solid border-primary-800 bg-primary-400 p-2 text-primary-800"
      >
        Open Example Modal
      </Button>
    </div>
  );
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
