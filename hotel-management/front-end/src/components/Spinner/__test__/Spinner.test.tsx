import { render, screen } from "@testing-library/react";
import LoadingSpinner from "..";

describe("LoadingSpinner", () => {
  it("should render a Box component with the correct styles", () => {
    const { container } = render(<LoadingSpinner />);
    const boxElement = screen.getByTestId("loading-spinner-box");

    expect(container).toMatchSnapshot();
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveStyle({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    });
  });
});
