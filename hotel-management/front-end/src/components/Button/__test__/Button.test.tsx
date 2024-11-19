import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Button from "../";
import { themeColor } from "@/themes/Base/colors";
import React from "react";

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

  it("applies the correct styles for disabled button", () => {
    const { container } = render(
      <Button
        buttonType="disabled"
        text="Disabled Button"
        onClick={() => {}}
      />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Disabled Button/i);
    expect(button).toHaveStyle(`background-color: ${themeColor.colors.gray[100]}`);
    expect(button).toHaveStyle(`color: ${themeColor.colors.gray[400]}`);
    expect(button).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it("applies the correct styles for pagination button", () => {
    const { container } = render(
      <Button buttonType="pagination" text="1" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/1/i);
    expect(button).toHaveStyle("border: 1px solid #ffffff");
    expect(button).toHaveStyle("height: 40px");
    expect(button).toHaveStyle("width: 40px");
    expect(container).toMatchSnapshot();
  });

  it("applies the correct styles for secondary button", () => {
    const { container } = render(
      <Button
        buttonType="secondary"
        text="Secondary Button"
        onClick={() => {}}
      />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Secondary Button/i);
    expect(button).toHaveStyle(`background-color: ${themeColor.colors.gray[200]}`);
    expect(button).toHaveStyle(`color: ${themeColor.colors.gray[700]}`);
    expect(button).toHaveStyle(`border: 1px solid ${themeColor.colors.gray[400]}`);
    expect(container).toMatchSnapshot(); // Snapshot test for the secondary button
  });

  it("applies the correct styles for error button", () => {
    const { container } = render(
      <Button buttonType="error" text="Error Button" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Error Button/i);
    expect(button).toHaveStyle(`background-color: ${themeColor.colors.red[500]}`);
    expect(button).toHaveStyle(`color: ${themeColor.colors.white}`);
    expect(button).toHaveStyle("font-weight: bold");
    expect(container).toMatchSnapshot();
  });

  it("applies additional styles passed through ButtonProps", () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });
});
