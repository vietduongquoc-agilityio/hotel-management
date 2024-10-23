import { ThemeOverride } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export const fontSizes: ThemeOverride["fontSizes"] = {
  xs: "10px",
  sm: "12px",
  md: "14px",
  lg: "18px",
  xl: "32px",
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "36px",
};

export const Fonts = () => (
  <Global
    styles={`
      
      @font-face {
        font-family: 'inter regular';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('../../assets/fonts/inter-regular.ttf') format('truetype');
      }
      
      @font-face {
        font-family: 'inter medium';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('../../assets/fonts/inter-medium.ttf') format('truetype');
      }

       @font-face {
        font-family: 'inter semibold';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('../../assets/fonts/inter-semibold.ttf') format('truetype');
      }
      `}
  />
);
