import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./index";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

// Mock icons
const mockRoomIcon = "room-icon.svg";
const mockLogoIcon = "logo-icon.svg";
const mockRateIcon = "rate-icon.svg";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<Router>{ui}</Router>);
};

describe("Sidebar Component", () => {
  test("renders the logo, room, and rate icons with correct alt text", () => {
    const { getByAltText } = renderWithRouter(
      <Sidebar room={mockRoomIcon} logo={mockLogoIcon} rate={mockRateIcon} />
    );

    // Check if the logo is rendered
    const logoElement = getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("src", mockLogoIcon);

    // Check if the room icon is rendered
    const roomElement = getByAltText("Room");
    expect(roomElement).toBeInTheDocument();
    expect(roomElement).toHaveAttribute("src", mockRoomIcon);

    // Check if the rate icon is rendered
    const rateElement = getByAltText("Rate");
    expect(rateElement).toBeInTheDocument();
    expect(rateElement).toHaveAttribute("src", mockRateIcon);
  });

  test("renders correct text for Room and Rate links", () => {
    const { getByText } = renderWithRouter(
      <Sidebar room={mockRoomIcon} logo={mockLogoIcon} rate={mockRateIcon} />
    );

    // Check if the Room link has the correct text
    const roomText = getByText("Room");
    expect(roomText).toBeInTheDocument();

    // Check if the Rate link has the correct text
    const rateText = getByText("Rate");
    expect(rateText).toBeInTheDocument();
  });

  test("renders correct navigation links", () => {
    const { getByText } = renderWithRouter(
      <Sidebar room={mockRoomIcon} logo={mockLogoIcon} rate={mockRateIcon} />
    );

    // Check if the Room link navigates to "/"
    const roomLink = getByText("Room").closest("a");
    expect(roomLink).toHaveAttribute("href", "/");

    // Check if the Rate link navigates to "/"
    const rateLink = getByText("Rate").closest("a");
    expect(rateLink).toHaveAttribute("href", "/");
  });
});
