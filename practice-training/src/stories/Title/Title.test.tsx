// import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "./Title";

describe("Title Component", () => {
  test("renders correctly with default props", () => {
    const { getByText } = render(<Title titleText="Welcome Back" />);

    const titleElement = getByText("Welcome Back!");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle("color: rgb(84, 82, 82)");
    expect(titleElement.parentElement).toHaveStyle("flex-direction: row");
    expect(titleElement.parentElement).toHaveStyle("gap: 0.25rem");
  });

  test("applies custom spacing, direction, and color", () => {
    const { getByText } = render(
      <Title
        spacing={2}
        direction="column"
        color="blue"
        titleText="Custom Title"
      />
    );

    const titleElement = getByText("Custom Title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle("color: blue");
    expect(titleElement.parentElement).toHaveStyle("flex-direction: column");
    expect(titleElement.parentElement).toHaveStyle("gap: 0.5rem");
  });

  test("matches the snapshot", () => {
    const { asFragment } = render(<Title titleText="Snapshot Title" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
