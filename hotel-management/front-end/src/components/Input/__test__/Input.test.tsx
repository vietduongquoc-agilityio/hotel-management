import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "../index";
import { getStyleInput } from "../InputStyle";

jest.mock("../InputStyle", () => ({
  getStyleInput: jest.fn(),
}));

describe("Input Component", () => {
  it("should render with the correct placeholder", () => {
    render(<Input placeHolder="Test Placeholder" inputType="default" />);
    const inputElement = screen.getByPlaceholderText("Test Placeholder");
    expect(inputElement).toBeInTheDocument();
  });

  it("should apply styles based on the inputType", () => {
    const mockStyle = { size: "md", variant: "outline" };
    (getStyleInput as jest.Mock).mockReturnValue(mockStyle);

    render(<Input placeHolder="Styled Input" inputType="default" />);
    const inputElement = screen.getByPlaceholderText("Styled Input");

    // Assert that the getStyleInput function was called with the correct inputType
    expect(getStyleInput).toHaveBeenCalledWith("first");

    // Ensure that Chakra UI's Input received the correct styles
    expect(inputElement).toHaveAttribute("size", mockStyle.size);
    expect(inputElement).toHaveAttribute("variant", mockStyle.variant);
  });

  it("should pass other props to the Chakra Input", () => {
    render(
      <Input
        placeHolder="Extra Props Test"
        inputType="default"
        data-testid="custom-input"
        isDisabled
      />
    );

    const inputElement = screen.getByTestId("custom-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeDisabled();
  });
});
