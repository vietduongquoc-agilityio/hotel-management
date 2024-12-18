import { render, screen } from "@testing-library/react";
import { themeColor } from "@/themes/Base/colors";
import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import React from "react";
import Button from "..";

// Wrapper component for tests to include ChakraProvider with the custom theme
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider theme={themeColor}>{children}</ChakraProvider>
);

describe("Button Component", () => {
  it("renders the button with the correct text", () => {
    const { container } = render(
      <Button buttonType="primary" text="Click Me" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    expect(container).toMatchSnapshot();
  });

  it("applies the correct styles for surface button", () => {
    render(<Button buttonType="surface" text="1" onClick={() => {}} />, {
      wrapper: Wrapper,
    });
    const button = screen.getByText(/1/i);
    expect(button).toHaveStyle("border: 1px solid #ffffff");
    expect(button).toHaveStyle("height: 40px");
    expect(button).toHaveStyle("width: auto");
  });

  it("applies additional styles passed through ButtonProps", () => {
    render(
      <Button
        buttonType="primary"
        text="Styled Button"
        onClick={() => {}}
        size="lg"
        variant="solid"
      />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Styled Button/i);
    expect(button).toHaveClass("chakra-button");
  });
});
