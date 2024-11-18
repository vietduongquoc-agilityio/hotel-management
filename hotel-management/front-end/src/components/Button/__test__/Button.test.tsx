import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { getStyleButton } from "../ButtonStyle";
import Button, { buttonType } from "../index";

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("Button Component", () => {
  const buttonTypes: buttonType[] = [
    "first",
    "nextButton",
    "paginationButton",
    "cancelButton",
    "deleteButton",
  ];

  it("should render the button with correct text", () => {
    renderWithChakra(<Button text="Test Button" buttonType="first" />);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("should apply the correct styles based on the buttonType", () => {
    buttonTypes.forEach((type) => {
      const style = getStyleButton(type);
      renderWithChakra(<Button text={type} buttonType={type} />);
      const button = screen.getByText(type);

      // Verify styles
      Object.entries(style).forEach(([key, value]) => {
        if (value) {
          expect(button).toHaveStyle(`${key}: ${value}`);
        }
      });
    });
  });

  it("should apply hover styles for nextButton", () => {
    renderWithChakra(<Button text="Next" buttonType="nextButton" />);
    const button = screen.getByText("Next");

    expect(button).toHaveStyle("color: grey.500");
    expect(button).toHaveStyle("border: 1px solid #667085");
    expect(button).toHaveStyle("background-color: blue.100;");
  });

  it("should handle dynamic props passed to the Button component", () => {
    renderWithChakra(
      <Button text="Custom Button" buttonType="deleteButton" size="lg" />
    );
    const button = screen.getByText("Custom Button");
    expect(button).toHaveAttribute("data-size", "lg");
  });
});
