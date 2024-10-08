import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../Components/Input/input";
import "@testing-library/jest-dom/extend-expect";

describe("Input Component", () => {
  const mockOnChange = jest.fn();

  test("renders correctly with label and default placeholder", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <Input label="Test Label" type="text" value="" onChange={mockOnChange} />,
    );

    expect(getByLabelText("Test Label")).toBeInTheDocument();
    expect(getByPlaceholderText("Text")).toBeInTheDocument();
  });

  test("renders with provided placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input
        label="Test Label"
        type="text"
        value=""
        onChange={mockOnChange}
        placeholder="Custom Placeholder"
      />,
    );

    expect(getByPlaceholderText("Custom Placeholder")).toBeInTheDocument();
  });

  test("calls onChange handler when value changes", () => {
    const { getByLabelText } = render(
      <Input label="Test Label" type="text" value="" onChange={mockOnChange} />,
    );

    fireEvent.change(getByLabelText("Test Label"), {
      target: { value: "New Value" },
    });
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: "New Value" } }),
    );
  });

  test("applies correct styles based on props", () => {
    const { getByLabelText } = render(
      <Input
        label="Test Label"
        type="text"
        value=""
        onChange={mockOnChange}
        backgroundColor="lightblue"
        size="sm"
        borderRadius={10}
        color="red"
        direction="row"
      />,
    );

    const inputElement = getByLabelText("Test Label")
      .nextSibling as HTMLInputElement;

    expect(inputElement).toHaveStyle("background-color: lightblue");
    expect(inputElement).toHaveStyle("padding: 5px"); // For size "sm"
    expect(inputElement).toHaveStyle("border-radius: 10px");
    expect(inputElement).toHaveStyle("color: red");
    expect(inputElement.parentElement).toHaveStyle("flex-direction: row");
  });

  test("Matches the snapshot", () => {
    const { asFragment } = render(
      <Input
        label="Test label"
        type="text"
        value=" "
        onChange={mockOnChange}
        color="white"
        direction="row"
        borderRadius={5}
        size="md"
        backgroundColor="black"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
