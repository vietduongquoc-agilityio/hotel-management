import { render, screen } from "@testing-library/react";
import LabelRate, { LabelRateProps } from "../";
import AddRateModal from "@/components/Modal/RateModal/Add";

jest.mock("@/components/Modal/RateModal/Add", () => {
  return jest.fn(() => <div data-testid="add-rate-modal">AddRateModal</div>);
});

describe("LabelRate Component", () => {
  const mockOnAddRate = jest.fn();

  const defaultProps: LabelRateProps = {
    onAddRate: mockOnAddRate,
    width: "400px",
  };

  it("should render without errors", () => {
    render(<LabelRate {...defaultProps} />);
    const container = screen.getByTestId("add-rate-modal");
    expect(container).toBeInTheDocument();
  });

  it("should render the AddRateModal component", () => {
    render(<LabelRate {...defaultProps} />);
    const modalElement = screen.getByTestId("add-rate-modal");
    expect(modalElement).toBeInTheDocument();
  });

  it("should pass the onAddRate callback to AddRateModal", () => {
    render(<LabelRate {...defaultProps} />);
    expect(AddRateModal).toHaveBeenCalledWith(
      expect.objectContaining({
        onAddRate: mockOnAddRate,
      }),
      {}
    );
  });

  it("should apply the correct width to the Box container", () => {
    render(<LabelRate {...defaultProps} />);
    const container = screen.getByTestId("add-rate-modal").parentElement; // Parent of AddRateModal is the Box
    expect(container).toHaveStyle(`width: ${defaultProps.width}`);
  });
});
