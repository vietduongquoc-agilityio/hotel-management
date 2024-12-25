import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LabelRate, { LabelRateProps } from "../";

// Mock AddRateModal to simulate user interaction
jest.mock("@/components", () => ({
  AddRateModal: jest.fn(({ onAddRate, onClose }) => (
    <button
      data-testid="add-rate-modal-button"
      onClick={() => {
        onAddRate({ roomType: "Deluxe", rate: 100 });
        onClose();
      }}
    >
      Add Rate
    </button>
  )),
}));

describe("LabelRate Component", () => {
  const mockOnAddRate = jest.fn();
  const mockWidth = "100%";

  const renderComponent = (props: Partial<LabelRateProps> = {}) => {
    return render(
      <LabelRate onAddRate={mockOnAddRate} width={mockWidth} {...props} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders LabelRate component correctly", () => {
    renderComponent();
    expect(screen.getByTestId("add-rate-modal-button")).toBeInTheDocument();
  });

  it("calls onAddRate with the correct data when a rate is added", () => {
    renderComponent();
    const button = screen.getByTestId("add-rate-modal-button");

    fireEvent.click(button);

    expect(mockOnAddRate).toHaveBeenCalledTimes(1);
    expect(mockOnAddRate).toHaveBeenCalledWith({
      roomType: "Deluxe",
      rate: 100,
    });
  });

  it("renders with the correct width", () => {
    renderComponent();
    const box = screen.getByTestId("add-rate-modal-button").parentElement;

    expect(box).toHaveStyle(`width: ${mockWidth}`);
  });
});
