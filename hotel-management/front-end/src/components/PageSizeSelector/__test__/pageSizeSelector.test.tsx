import { render, screen, fireEvent } from "@testing-library/react";
import PageSizeSelector from "..";

describe("PageSizeSelector Component", () => {
  const mockOnPageSizeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(
      <PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the select dropdown with the correct default value", () => {
    render(<PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("10");
  });

  it("renders all the page size options", () => {
    render(<PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);

    expect(options[0]).toHaveValue("8");
    expect(options[0]).toHaveTextContent("8");

    expect(options[1]).toHaveValue("10");
    expect(options[1]).toHaveTextContent("10");

    expect(options[2]).toHaveValue("12");
    expect(options[2]).toHaveTextContent("12");

    expect(options[3]).toHaveValue("15");
    expect(options[3]).toHaveTextContent("15");
  });

  it("calls the onPageSizeChange callback with the correct value when a new page size is selected", () => {
    render(<PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "12" } });

    expect(mockOnPageSizeChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageSizeChange).toHaveBeenCalledWith(12);
  });

  it("updates the selected value when props change", () => {
    const { rerender } = render(
      <PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("10");

    rerender(<PageSizeSelector pageSize={15} onPageSizeChange={mockOnPageSizeChange} />);
    expect(selectElement).toHaveValue("15");
  });

  it("displays the select dropdown with the correct styling", () => {
    render(<PageSizeSelector pageSize={10} onPageSizeChange={mockOnPageSizeChange} />);
  });
});
