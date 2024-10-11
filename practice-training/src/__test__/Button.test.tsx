import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Components/Button/Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  test("renders correctly with default props", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" handleClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("background-color: red");
    expect(buttonElement).toHaveStyle("padding: 5px 10px");
    expect(buttonElement).toHaveStyle("border: 1px");
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
      />,
    );

    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("background-color: blue");
    expect(buttonElement).toHaveStyle("padding: 10px 20px");
    expect(buttonElement).toHaveStyle("color: yellow");
    expect(buttonElement).toHaveStyle("border-radius: 8px");
    expect(buttonElement).toHaveStyle("border: 2px");
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
      <Button label="Rounded" handleClick={handleClick} borderRadius={12} />,
    );

    const buttonElement = screen.getByRole("button", { name: /rounded/i });
    expect(buttonElement).toHaveStyle("border-radius: 12px");
  });
  test("renders a button with text", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" handleClick={handleClick} />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("matches the snapshot", () => {
    const handleClick = jest.fn();
    const { asFragment } = render(
      <Button label="Snapshot" handleClick={handleClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test("applies correct padding for size sm", () => {
    const handleClick = jest.fn();
    render(<Button label="Small" size="sm" handleClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /small/i });
    expect(buttonElement).toHaveStyle("padding: 5px 10px");
  });

  test("applies correct padding for size md", () => {
    const handleClick = jest.fn();
    render(<Button label="Medium" size="md" handleClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /medium/i });
    expect(buttonElement).toHaveStyle("padding: 7px 15px");
  });

  test("applies correct padding for size lg", () => {
    const handleClick = jest.fn();
    render(<Button label="Large" size="lg" handleClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /large/i });
    expect(buttonElement).toHaveStyle("padding: 10px 20px");
  });
});
 