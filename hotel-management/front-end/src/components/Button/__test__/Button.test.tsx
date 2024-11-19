import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Button from "../"; 


const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

describe("Button Component", () => {
  it("renders the button with the correct text", () => {
    render(<Button buttonType="primary" text="Click Me" onClick={() => {}} />, {
      wrapper: Wrapper,
    });
    const button = screen.getByText(/Click Me/i);
    expect(button).toBeInTheDocument();
  });

  it("applies the correct styles for primary button", () => {
    render(
      <Button buttonType="primary" text="Primary Button" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Primary Button/i);
    expect(button).toHaveStyle("background-color: #3182ce");
    expect(button).toHaveStyle("color: white");  
    expect(button).toHaveStyle("font-weight: bold");  
  });

  it("applies the correct styles for disabled button", () => {
    render(
      <Button buttonType="disabled" text="Disabled Button" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Disabled Button/i);
    expect(button).toHaveStyle("background-color: #f7fafc"); 
    expect(button).toHaveStyle("color: #cbd5e0"); 
    expect(button).toBeDisabled();
  });

  it("applies the correct styles for pagination button", () => {
    render(
      <Button buttonType="pagination" text="1" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/1/i);
    expect(button).toHaveStyle("border: 1px solid #ffffff");  
    expect(button).toHaveStyle("height: 40px");  
    expect(button).toHaveStyle("width: 40px");  
  });

  it("applies the correct styles for secondary button", () => {
    render(
      <Button buttonType="secondary" text="Secondary Button" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Secondary Button/i);
    expect(button).toHaveStyle("background-color: #edf2f7");  
    expect(button).toHaveStyle("color: #4a5568");  
    expect(button).toHaveStyle("border: 1px solid #858d9d");  
  });

  it("applies the correct styles for error button", () => {
    render(
      <Button buttonType="error" text="Error Button" onClick={() => {}} />,
      { wrapper: Wrapper }
    );
    const button = screen.getByText(/Error Button/i);
    expect(button).toHaveStyle("background-color: #e53e3e");  
    expect(button).toHaveStyle("color: white");  
    expect(button).toHaveStyle("font-weight: bold");  
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
    expect(button).toHaveClass("chakra-button");  // Ensures Chakra UI styles are applied
    expect(button).toHaveClass("chakra-button--lg");  // Ensures 'lg' size is applied
  });
});
