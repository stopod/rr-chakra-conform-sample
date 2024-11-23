import type { Meta, StoryObj } from "@storybook/react";

import { FormFieldText } from "./";
import { Box } from "@chakra-ui/react";

const meta: Meta<typeof FormFieldText> = {
  component: FormFieldText,
  tags: ["autodocs"],
  decorators: (Story) => (
    <Box w={"1/2"}>
      <Story />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof FormFieldText>;

export const Optional: Story = {
  args: {
    label: "任意",
    helperText: "任意項目だよ",
  },
};

export const Required: Story = {
  args: {
    label: "必須",
    inputProps: {
      required: true,
    },
  },
};

export const ReadOnly: Story = {
  args: {
    label: "読み取り専用",
    readOnly: true,
    inputProps: {
      value: "読み取り専用",
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "非活性",
    disabled: true,
    inputProps: {
      value: "非活性",
    },
  },
};

export const Error: Story = {
  args: {
    label: "エラー",
    inputProps: {
      errorId: "errorId",
      errorText: ["エラーだよ"],
      invalid: true,
    },
  },
};
