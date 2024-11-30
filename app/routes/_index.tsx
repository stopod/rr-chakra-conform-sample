import { Stack } from "@chakra-ui/react";
import { Link } from "react-router";
import { LinkButton } from "../components/ui/link-button";

export default function Index() {
  return (
    <Stack gap={4} colorPalette={"teal"} m={8}>
      <LinkButton as={Link} to={"/sample-validation"}>
        sample validation
      </LinkButton>

      <LinkButton as={Link} to={"/sample-form"}>
        sample form
      </LinkButton>
    </Stack>
  );
}
