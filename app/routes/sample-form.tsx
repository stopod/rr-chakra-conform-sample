import { Form } from "react-router";
import { Route } from "./+types/sample-form";
import {
  Input,
  Stack,
  Textarea,
  Button,
  Text,
  Span,
  Heading,
  Mark,
  HStack,
  Box,
  VStack,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "~/components/ui/radio";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "~/components/ui/native-select";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log(formData);
  return formData;
}

export default function FormTry() {
  return (
    <Form action="/sample-form" method="post">
      <Form2 />
    </Form>
  );
}

const Form1 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="name">Name:</label>
      <Input type="text" id="name" name="user_name" />

      <label htmlFor="mail">Email:</label>
      <Input type="email" id="mail" name="user_email" />

      <label htmlFor="msg">Message:</label>
      <Textarea id="msg" name="user_message" />

      <Button type="submit">メッセージを送信</Button>
    </Stack>
  );
};

const Form2 = () => {
  return (
    <Stack gap={8} m={8}>
      <Box>
        <Heading>Payment form</Heading>
        <Text>
          Required fields are followed by
          <Mark aria-label="required" variant={"plain"} fontWeight={"bold"}>
            *
          </Mark>
          .
        </Text>
      </Box>

      <section>
        <Heading>Contact information</Heading>

        <fieldset>
          <legend>Title</legend>
          <RadioGroup name="title">
            <HStack gap={4}>
              <Radio id="title_1" value="A">
                Ace
              </Radio>
              <Radio id="title_2" value="K">
                King
              </Radio>
              <Radio id="title_3" value="Q">
                Queen
              </Radio>
            </HStack>
          </RadioGroup>
        </fieldset>

        <Box>
          <label htmlFor="name">
            <Text>
              Name:
              <Mark aria-label="required" variant={"plain"} fontWeight={"bold"}>
                *
              </Mark>
            </Text>
          </label>
          <Input type="text" id="name" name="username" required />
        </Box>

        <Box>
          <label htmlFor="mail">
            <Text>
              Email:
              <Mark aria-label="required" variant={"plain"} fontWeight={"bold"}>
                *
              </Mark>
            </Text>
          </label>
          <Input type="email" id="mail" name="usermail" required />
        </Box>

        <Box>
          <label htmlFor="pwd">
            <Text>
              Password:
              <Mark aria-label="required" variant={"plain"} fontWeight={"bold"}>
                *
              </Mark>
            </Text>
          </label>
          <Input type="password" id="pwd" name="password" required />
        </Box>
      </section>

      <section>
        <Heading>Payment information</Heading>

        <Box>
          <label htmlFor="card">
            <Text>Card type: </Text>
          </label>
          <NativeSelectRoot>
            <NativeSelectField id="card" name="usercard">
              <option value="visa">Visa</option>
              <option value="mc">Mastercard</option>
              <option value="amex">American Express</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>

        <Box>
          <label htmlFor="number">
            <Text>
              Card number:
              <Mark aria-label="required" variant={"plain"} fontWeight={"bold"}>
                *
              </Mark>
            </Text>
          </label>
          <Input type="tel" id="number" name="cardnumber" required />
        </Box>

        <Box>
          <label htmlFor="expiration">
            <Text>
              Expiration date:
              <Mark aria-label="required" variant={"plain"} fontWeight={"bold"}>
                *
              </Mark>
            </Text>
          </label>
          <Input
            type="text"
            id="expiration"
            name="expiration"
            required
            placeholder="MM/YY"
            pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
          />
        </Box>
      </section>

      <section>
        <Button type="submit">Validate the payment</Button>
      </section>
    </Stack>
  );
};
