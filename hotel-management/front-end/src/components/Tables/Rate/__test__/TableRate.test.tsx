import { render, screen, fireEvent } from "@testing-library/react";
import TableRate, { TableRateProps } from "../index";
import { RateData } from "@/interfaces/Rate";

const mockRates: RateData[] = [
  {
    documentId: "rate1",
    roomType: "Single",
    deals: "Early Bird",
    cancellationPolicy: "Flexible",
    dealPrice: "100",
    rate: "Standard",
    totalOfRooms: 10,
    totalOfBooked: 5,
  },
  {
    documentId: "rate2",
    roomType: "Double",
    deals: "Last Minute",
    cancellationPolicy: "Strict",
    dealPrice: "200",
    rate: "Premium",
    totalOfRooms: 8,
    totalOfBooked: 8,
  },
];

const renderTableRate = (props?: Partial<TableRateProps>) => {
  const defaultProps: TableRateProps = {
    rates: mockRates,
    error: null,
    onDeleteRate: jest.fn(),
    onEditRate: jest.fn(),
    ...props,
  };
  return render(<TableRate {...defaultProps} />);
};

describe("TableRate Component", () => {
  test("renders rates correctly", () => {
    renderTableRate();

    expect(screen.getByText("Room type")).toBeInTheDocument();
    expect(screen.getByText("Deals")).toBeInTheDocument();
    expect(screen.getByText("Cancellation policy")).toBeInTheDocument();
    expect(screen.getByText("Deal price")).toBeInTheDocument();

    expect(screen.getByText("Single")).toBeInTheDocument();
    expect(screen.getByText("Double")).toBeInTheDocument();
    expect(screen.getByText("Flexible")).toBeInTheDocument();
    expect(screen.getByText("Strict")).toBeInTheDocument();
  });

  test("displays error message when error exists", () => {
    renderTableRate({ error: "Failed to fetch rates" });

    expect(screen.getByText("Failed to fetch rates")).toBeInTheDocument();
  });

  test("displays 'No rates available' when rates array is empty", () => {
    renderTableRate({ rates: [] });

    expect(screen.getByText("No rates available.")).toBeInTheDocument();
  });

  test("displays availability correctly", () => {
    renderTableRate();

    // Availability calculation
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Full")).toBeInTheDocument();
  });

  test("toggles the menu when button is clicked", () => {
    renderTableRate();

    const menuButton = screen.getAllByText("⋮")[0];
    fireEvent.click(menuButton);

    const editModal = screen.getByText("Edit");
    const deleteButton = screen.getByText("Delete");

    expect(editModal).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("closes the menu when clicking outside", () => {
    renderTableRate();

    const menuButton = screen.getAllByText("⋮")[0];
    fireEvent.click(menuButton);

    const editModal = screen.getByText("Edit");
    expect(editModal).toBeInTheDocument();

    // Simulates clicking outside
    fireEvent.click(document.body);
    expect(editModal).not.toBeInTheDocument();
  });

  test("calls onEditRate when editing a rate", () => {
    const mockOnEditRate = jest.fn();
    renderTableRate({ onEditRate: mockOnEditRate });

    const menuButton = screen.getAllByText("⋮")[0];
    fireEvent.click(menuButton);

    const editModal = screen.getByText("Edit");
    fireEvent.click(editModal);

    expect(mockOnEditRate).toHaveBeenCalledWith(mockRates[0]);
  });

  test("calls onDeleteRate when deleting a rate", () => {
    const mockOnDeleteRate = jest.fn();
    renderTableRate({ onDeleteRate: mockOnDeleteRate });

    const menuButton = screen.getAllByText("⋮")[0];
    fireEvent.click(menuButton);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockOnDeleteRate).toHaveBeenCalledWith(mockRates[0].documentId);
  });
});
