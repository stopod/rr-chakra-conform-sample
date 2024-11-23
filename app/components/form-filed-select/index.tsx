import { NativeSelectFieldProps } from "@chakra-ui/react";
import { FieldMetadata, getSelectProps } from "@conform-to/react";
import { ReactNode } from "react";
import { ConfromField, ConfromFieldProps } from "../ui/field";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";

type FormFieldSelectProps = ConfromFieldProps & {
  selectProps?: NativeSelectFieldProps & {
    errorId: string;
    errorText: ReactNode;
    invalid: boolean;
  };
};

export const FormFieldSelect = (props: FormFieldSelectProps) => {
  const { children, selectProps, ...rest } = props;
  const { id, errorId, errorText, invalid, ...selectPropsRest } =
    selectProps || {};

  return (
    <ConfromField
      id={id}
      errorId={errorId}
      errorText={errorText}
      invalid={invalid}
      {...rest}
    >
      <NativeSelectRoot>
        <NativeSelectField {...selectPropsRest}>{children}</NativeSelectField>
      </NativeSelectRoot>
    </ConfromField>
  );
};

export const getSelectFormProps = (metadata: FieldMetadata) => {
  const errorId = metadata.errorId;
  const errorText = metadata.errors;
  const invalid = !metadata.valid;
  return {
    errorId,
    errorText,
    invalid,
    ...getSelectProps(metadata),
  };
};
