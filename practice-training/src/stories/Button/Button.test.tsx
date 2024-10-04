import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders correctly with default props", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" handleClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("background-color: red");
    expect(buttonElement).toHaveStyle("padding: 5px 10px");
    expect(buttonElement).toHaveStyle("border: none");
    expect(buttonElement).toHaveStyle("color: white");
  });

  test("applies custom props", () => {
    const handleClick = jest.fn();
    render(
      <Button
        label="Submit"
        handleClick={handleClick}
        backgroundColor="blue"
        size="lg"
        borderRadius={8}
        color="yellow"
      />
    );

    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("background-color: blue");
    expect(buttonElement).toHaveStyle("padding: 10px 20px");
    expect(buttonElement).toHaveStyle("color: yellow");
    expect(buttonElement).toHaveStyle("border-radius: 8px");
    expect(buttonElement).toHaveStyle("border: none");
  });

  test("calls handleClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" handleClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies border-radius correctly", () => {
    const handleClick = jest.fn();
    render(
      <Button label="Rounded" handleClick={handleClick} borderRadius={12} />
    );

    const buttonElement = screen.getByRole("button", { name: /rounded/i });
    expect(buttonElement).toHaveStyle("border-radius: 12px");
  });
});
