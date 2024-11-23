import { Field as ChakraField } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  props,
  ref
) {
  const { label, children, helperText, errorText, optionalText, ...rest } =
    props;
  return (
    <ChakraField.Root ref={ref} {...rest}>
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      {children}
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});

export interface ConfromFieldProps
  extends Omit<ChakraField.RootProps, "label"> {
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorId?: string;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const ConfromField = forwardRef<HTMLDivElement, ConfromFieldProps>(
  function ConfromField(props, ref) {
    const {
      id,
      label,
      children,
      helperText,
      errorId,
      errorText,
      optionalText,
      required,
      ...rest
    } = props;
    return (
      <ChakraField.Root ref={ref} required={required} {...rest}>
        {label && (
          <ChakraField.Label htmlFor={id}>
            {label}
            {required && (
              <ChakraField.RequiredIndicator fallback={optionalText} />
            )}
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText id={errorId}>
            {errorText}
          </ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);
