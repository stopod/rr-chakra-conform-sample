import { Input, InputProps } from "@chakra-ui/react";
import { ConfromField, ConfromFieldProps } from "../ui/field";
import { FieldMetadata, getInputProps } from "@conform-to/react";
import { ReactNode } from "react";

type FormFiledTextProps = ConfromFieldProps & {
  inputProps?: InputProps & {
    errorId?: string;
    errorText?: ReactNode;
    invalid?: boolean;
  };
};

export const FormFieldText = (props: FormFiledTextProps) => {
  const { inputProps, ...rest } = props;
  const { id, errorId, errorText, invalid, required, ...inputPropsRest } =
    inputProps || {};

  return (
    <ConfromField
      id={id}
      errorId={errorId}
      errorText={errorText}
      invalid={invalid}
      required={required}
      {...rest}
    >
      <Input id={id} {...inputPropsRest} />
    </ConfromField>
  );
};

export const getInputTypeTextProps = (metadata: FieldMetadata) => {
  const errorId = metadata.errorId;
  const errorText = metadata.errors;
  const invalid = !metadata.valid;
  return {
    errorId,
    errorText,
    invalid,
    ...getInputProps(metadata, { type: "text" }),
  };
};

export const getInputTypeDateProps = (metadata: FieldMetadata) => {
  const errorId = metadata.errorId;
  const errorText = metadata.errors;
  const invalid = !metadata.valid;
  return {
    errorId,
    errorText,
    invalid,
    ...getInputProps(metadata, { type: "date" }),
  };
};
