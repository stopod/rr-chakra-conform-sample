import {
  Container,
  HStack,
  Input,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ConfromField } from "app/components/ui/field";

import { Form, redirect, type MetaFunction } from "react-router";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Route } from "../+types.root";

import {
  NativeSelectField,
  NativeSelectRoot,
} from "app/components/ui/native-select";

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

export async function loader(): Promise<Prefecture[]> {
  const res = await fetch(
    "https://apis.apima.net/k2srm05wzm1pdl3xk0sv/v1/prefectures/"
  );

  const data: Prefecture[] = await res.json();
  return data;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  console.log(submission.payload);
  return redirect("/");
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const options = loaderData
    ? loaderData.map((item) => ({ value: item.id, label: item.name }))
    : undefined;

  return (
    <Form method="post" {...getFormProps(form)}>
      <Container>
        <VStack gap={6} mt={5}>
          <HStack w={"full"}>
            <ConfromField
              label="性"
              required
              id={fields.lastName.id}
              errorId={fields.lastName.errorId}
              errorText={fields.lastName.errors}
              invalid={!!fields.lastName.errors?.length}
            >
              <Input
                placeholder="性"
                variant="outline"
                {...getInputProps(fields.lastName, { type: "text" })}
              />
            </ConfromField>

            <ConfromField
              label="名"
              required
              id={fields.firstName.id}
              errorId={fields.firstName.errorId}
              errorText={fields.firstName.errors}
              invalid={!!fields.firstName.errors?.length}
            >
              <Input
                placeholder="名"
                variant="outline"
                {...getInputProps(fields.firstName, { type: "text" })}
              />
            </ConfromField>
          </HStack>

          <ConfromField
            label="生年月日"
            required
            id={fields.birthday.id}
            errorId={fields.birthday.errorId}
            errorText={fields.birthday.errors}
            invalid={!!fields.birthday.errors?.length}
          >
            <Input
              placeholder="生年月日"
              variant="outline"
              {...getInputProps(fields.birthday, { type: "date" })}
            />
          </ConfromField>

          <ConfromField
            label="都道府県"
            required
            id={fields.prefecture.id}
            errorId={fields.prefecture.errorId}
            errorText={fields.prefecture.errors}
            invalid={!!fields.prefecture.errors?.length}
          >
            <NativeSelectRoot>
              <NativeSelectField {...getSelectProps(fields.prefecture)}>
                {options.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </ConfromField>

          <Button colorPalette={"teal"} type="submit">
            登録
          </Button>
        </VStack>
      </Container>
    </Form>
  );
}
