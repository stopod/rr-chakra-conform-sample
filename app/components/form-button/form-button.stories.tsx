import type { Meta, StoryObj } from "@storybook/react";

import { FormButton } from "./form-button";

const meta: Meta<typeof FormButton> = {
  component: FormButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormButton>;

export const Primary: Story = {
  args: {
    children: "送信",
  },
};

export const Big: Story = {
  args: {
    children: "送信",
    size: "2xl",
  },
};

export const Loadding: Story = {
  args: {
    children: "送信",
    loading: true,
  },
};
