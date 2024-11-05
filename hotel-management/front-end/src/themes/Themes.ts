import { extendTheme } from "@chakra-ui/react";
import { bases } from "./Base/index";
import { components } from "@/themes/Components/Index";

export const theme = extendTheme({
  ...bases,
  components,
  fonts: {
    heading: `"Inter Medium", sans-serif;`,
    body: `"Inter", sans-serif;`,
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "body",
        bg: "background.200",
      },
    },
  },
});

export default theme;
