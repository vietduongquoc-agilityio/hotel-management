import { render, screen } from "@testing-library/react";
import Input from "../index";
import { getStyleInput } from "../InputStyle";

jest.mock("../InputStyle", () => ({
  getStyleInput: jest.fn(),
}));

describe("Input Component", () => {
  it("should render with the correct placeholder", () => {
    const { container } = render(
      <Input placeHolder="Test Placeholder" inputType="primary" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should apply styles based on the inputType", () => {
    const mockStyle = { size: "md", variant: "outline" };
    (getStyleInput as jest.Mock).mockReturnValue(mockStyle);

    render(<Input placeHolder="Styled Input" inputType="primary" />);

    // Assert that the getStyleInput function was called with the correct inputType
    expect(getStyleInput).toHaveBeenCalledWith("primary");
  });

  it("should pass other props to the Chakra Input", () => {
    render(
      <Input
        placeHolder="Extra Props Test"
        inputType="primary"
        data-testid="custom-input"
        isDisabled
      />
    );

    const inputElement = screen.getByTestId("custom-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeDisabled();
  });
});
