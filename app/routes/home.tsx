import { Container, HStack, VStack } from "@chakra-ui/react";
import { getFormProps, getSelectProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ConfromField } from "app/components/ui/field";

import { Form, redirect, type MetaFunction } from "react-router";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import type { Route } from "../routes/+types/home";

import {
  NativeSelectField,
  NativeSelectRoot,
} from "app/components/ui/native-select";
import {
  FormFieldText,
  getInputTypeDateProps,
  getInputTypeTextProps,
} from "~/components/form-filed-text";
import {
  FormFieldSelect,
  getSelectFormProps,
} from "~/components/form-filed-select";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

const schema = z.object({
  firstName: z.string({ required_error: "名は必須です" }),
  lastName: z.string({ required_error: "性は必須です" }),
  birthday: z.date({ required_error: "誕生日は必須です" }),
  prefecture: z.string(),
});

type Prefecture = {
  id: number;
  code: string;
  name: string;
  area_id: number;
  created_ad: string;
  updated_at: string;
};

export async function loader() {
  const res = await fetch(
    "https://apis.apima.net/k2srm05wzm1pdl3xk0sv/v1/prefectures/"
  );

  const data: Prefecture[] = await res.json();
  return data;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return { lastResult: submission.reply() };
  }

  if (submission.payload.prefecture === "選んでください") {
    return {
      lastResult: submission.reply({
        fieldErrors: {
          prefecture: ["選んでください"],
        },
      }),
    };
  }

  console.log(submission.payload);
  return { lastResult: submission.reply() };
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const options = loaderData.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Form method="post" {...getFormProps(form)}>
      <Container>
        <VStack gap={6} mt={5}>
          <HStack w={"full"}>
            <FormFieldText
              label="姓"
              required
              inputProps={{
                ...getInputTypeTextProps(fields.lastName),
              }}
            />

            <FormFieldText
              label="名"
              required
              inputProps={{
                ...getInputTypeTextProps(fields.firstName),
              }}
            />
          </HStack>

          <FormFieldText
            label="生年月日"
            required
            inputProps={{
              ...getInputTypeDateProps(fields.birthday),
            }}
          />

          <FormFieldSelect
            label="都道府県"
            required
            selectProps={{
              ...getSelectFormProps(fields.prefecture),
            }}
          >
            <option>選んでください</option>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </FormFieldSelect>

          <Button colorPalette={"teal"} type="submit">
            登録
          </Button>
        </VStack>
      </Container>
    </Form>
  );
}
