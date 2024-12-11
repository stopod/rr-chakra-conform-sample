import { Box, Button, Fieldset, Heading, HStack, Input, Mark, Stack, Text, Textarea } from "@chakra-ui/react";
import { Form } from "react-router";
import { NativeSelectField, NativeSelectRoot } from "~/components/ui/native-select";
import { Radio, RadioGroup } from "~/components/ui/radio";
import { Route } from "./+types/sample-form";
// import "./layout/sample-form.css";
import { ConfromField, Field } from "~/components/ui/field";
import { z } from "zod";
import { getFieldsetProps, getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

const schema = z.object({
  name: z.string({ required_error: "必須です-1" }),
  title: z.string({ required_error: "必須です-2" }),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log(formData);
  return formData;
}

export default function FormTry() {
  const [form, fields] = useForm({
    constraint: getZodConstraint(schema),
    shouldRevalidate: "onInput",
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
  });

  // useEffect(() => {
  //   const email = document.getElementById("mail") as HTMLInputElement;
  //   if (email) {
  //     const handleInput = (event: Event) => {
  //       if (email.validity.typeMismatch) {
  //         console.log(email.validationMessage);
  //         email.setCustomValidity("メールアドレスを入力してください。");
  //       } else {
  //         email.setCustomValidity("");
  //       }
  //     };

  //     email.addEventListener("input", handleInput);

  //     return () => {
  //       email.removeEventListener("input", handleInput);
  //     };
  //   }
  // }, []);

  // useEffect(() => {
  //   const form = document.querySelector("form") as HTMLFormElement;
  //   const email = document.getElementById("mail") as HTMLInputElement;
  //   const emailError = document.querySelector("#mail + span.error")!;

  //   const handleInput = (event: Event) => {
  //     if (email.validity.valid) {
  //       emailError.textContent = "";
  //       emailError.className = "error";
  //     } else {
  //       showError();
  //     }
  //   };

  //   const handleSubmit = (event: Event) => {
  //     if (!email.validity.valid) {
  //       showError();
  //       event.preventDefault();
  //     }
  //   };

  //   const showError = () => {
  //     if (email.validity.valueMissing) {
  //       emailError.textContent = "You need to enter an email address.";
  //     } else if (email.validity.typeMismatch) {
  //       emailError.textContent = "Entered value needs to be an email address.";
  //     } else if (email.validity.tooShort) {
  //       emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  //     }
  //     emailError.className = "error active";
  //   };

  //   email.addEventListener("input", handleInput);
  //   form.addEventListener("submit", handleSubmit);

  //   return () => {
  //     email.removeEventListener("input", handleInput);
  //     form.removeEventListener("submit", handleSubmit);
  //   };
  // }, []);

  return (
    <Form action="/sample-form" method="post" {...getFormProps(form)}>
      <Stack gap={4} m={8}>
        <ConfromField
          id={fields.name.id}
          errorId={fields.name.errorId}
          label={"name"}
          required
          invalid={!fields.name.valid}
          errorText={fields.name.errors}
        >
          <Input {...getInputProps(fields.name, { type: "text" })} />
        </ConfromField>

        <Fieldset.Root invalid={!fields.title.valid} {...getFieldsetProps(fields.title)}>
          <Fieldset.Legend>Title</Fieldset.Legend>
          <Fieldset.Content>
            <RadioGroup name="title">
              <HStack gap={4}>
                <Radio value="A" invalid={!fields.title.valid}>
                  Ace
                </Radio>
                <Radio value="K" invalid={!fields.title.valid}>
                  King
                </Radio>
                <Radio value="Q" invalid={!fields.title.valid}>
                  Queen
                </Radio>
              </HStack>
            </RadioGroup>
          </Fieldset.Content>
          <Fieldset.ErrorText>{fields.title.errors}</Fieldset.ErrorText>
        </Fieldset.Root>

        <Button type="submit">submit</Button>
      </Stack>
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

const Form3 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="email">Email:</label>
      <Input type="email" id="email" name="email" />

      <label htmlFor="search">Search:</label>
      <Input type="search" id="search" name="search" />

      <label htmlFor="tel">Tel:</label>
      <Input type="tel" id="tel" name="tel" />

      <label htmlFor="url">Url:</label>
      <Input type="url" id="url" name="url" />

      <label htmlFor="datetime-local">Datetime-local:</label>
      <Input type="datetime-local" name="datetime" id="datetime" />

      <label htmlFor="month">Month:</label>
      <Input type="month" name="month" id="month" />

      <label htmlFor="time">Time:</label>
      <Input type="time" name="time" id="time" />

      <label htmlFor="week">Week:</label>
      <Input type="week" name="week" id="week" />

      <label htmlFor="color">Color:</label>
      <Input type="color" name="color" id="color" />

      <Button type="submit">Submit</Button>
    </Stack>
  );
};

const Form4 = () => {
  return (
    <Stack gap={4} m={8}>
      {/* テキストエリア */}
      <label htmlFor="textarea">Textarea:</label>
      <Textarea id="textarea" name="textarea" />

      {/* いつものセレクトボックス */}
      <label htmlFor="simple">SimpleSelect:</label>
      <NativeSelectRoot>
        <NativeSelectField id="simple" name="simple" defaultValue={"さくらんぼ"}>
          <option>バナナ</option>
          <option>さくらんぼ</option>
          <option>レモン</option>
        </NativeSelectField>
      </NativeSelectRoot>

      {/* グループ化されたセレクトボックス */}
      <label htmlFor="groups">GroupSelect:</label>
      <NativeSelectRoot>
        <NativeSelectField id="groups" name="groups" defaultValue={"さくらんぼ"}>
          <optgroup label="果物">
            <option>バナナ</option>
            <option>さくらんぼ</option>
            <option>レモン</option>
          </optgroup>
          <optgroup label="野菜">
            <option>人参</option>
            <option>茄子</option>
            <option>馬鈴薯</option>
          </optgroup>
        </NativeSelectField>
      </NativeSelectRoot>

      {/* 複数選択可能なセレクトボックス */}
      <label htmlFor="multi">MultiSelect:</label>
      <NativeSelectRoot>
        <NativeSelectField id="multi" name="multi" multiple>
          <optgroup label="果物">
            <option>バナナ</option>
            <option>さくらんぼ</option>
            <option>レモン</option>
          </optgroup>
          <optgroup label="野菜">
            <option>人参</option>
            <option>茄子</option>
            <option>馬鈴薯</option>
          </optgroup>
        </NativeSelectField>
      </NativeSelectRoot>

      {/* 自動補完されるセレクトボックス、入力が可能 */}
      <label htmlFor="myFruit">好きな果物は何ですか？</label>
      <Input type="text" name="myFruit" id="myFruit" list="mySuggestion" />
      <datalist id="mySuggestion">
        <option>リンゴ</option>
        <option>バナナ</option>
        <option>ブラックベリー</option>
        <option>ブルーベリー</option>
        <option>レモン</option>
        <option>ライチ</option>
        <option>桃</option>
        <option>梨</option>
      </datalist>

      {/* 自動補完されるセレクトボックス、古いブラウザ対応版 */}
      <label htmlFor="myFruit2">好きな果物は何ですか？（代替手段付き）</label>
      <Input type="text" id="myFruit2" name="fruit" list="fruitList" />
      <datalist id="fruitList">
        <label htmlFor="suggestion">または果物を選択</label>
        <NativeSelectRoot>
          <NativeSelectField id="suggestion" name="altFruit">
            <option>リンゴ</option>
            <option>バナナ</option>
            <option>ブラックベリー</option>
            <option>ブルーベリー</option>
            <option>レモン</option>
            <option>ライチ</option>
            <option>桃</option>
            <option>梨</option>
          </NativeSelectField>
        </NativeSelectRoot>
      </datalist>

      <label htmlFor="meter">meter</label>
      <meter min="0" max="100" value="75" low={33} high={66} optimum={0} id="meter">
        75
      </meter>

      <label htmlFor="progress">progress</label>
      <progress max="100" value="75" id="progress">
        75/100
      </progress>

      <Button type="submit">Submit</Button>
    </Stack>
  );
};

const Form5 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="choose">banana と cherry のどちらが好き?</label>
      <Input id="choose" name="i-like" required />
      <Button type="submit">Submit</Button>
    </Stack>
  );
};

const Form6 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="choose">banana と cherry のどちらが好き?</label>
      <Input id="choose" name="i-like" required pattern="[Bb]anana|[Cc]herry" />
      <Button type="submit">Submit</Button>
    </Stack>
  );
};

const Form7 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="len">len:</label>
      <Input id="len" name="len" minLength={2} maxLength={10} />
      <Button type="submit">Submit</Button>
    </Stack>
  );
};

const Form8 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="num">num:</label>
      <Input type="number" id="num" name="num" min={2} max={10} step={0.1} />

      <Button type="submit">Submit</Button>
    </Stack>
  );
};

const Form9 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="mail">メールアドレスを教えてください:</label>
      <Input type="email" id="mail" name="mail" />

      <Button type="submit">Submit</Button>
    </Stack>
  );
};

const Form10 = () => {
  return (
    <Stack gap={4} m={8}>
      <label htmlFor="mail">
        <span>メールアドレスを入力してください。</span>
        <Input type="email" id="mail" name="mail" required minLength={8} />
        <span className="error" aria-live="polite"></span>
      </label>

      <Button type="submit">Submit</Button>
    </Stack>
  );
};
