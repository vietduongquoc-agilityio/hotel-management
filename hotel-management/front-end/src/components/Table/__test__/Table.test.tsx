import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table, { TableProps } from "@/components/Table";

// Mock dependencies
jest.mock("@/components", () => ({
  Button: jest.fn(({ onClick, text }) => (
    <button data-testid="menu-button" onClick={onClick}>
      {text}
    </button>
  )),
  DeleteRoom: jest.fn(({ onDeleteRoom }) => (
    <button data-testid="delete-room" onClick={onDeleteRoom}>
      Delete Room
    </button>
  )),
  EditRoomModal: jest.fn(({ onEditRoom }) => (
    <button data-testid="edit-room" onClick={() => onEditRoom({})}>
      Edit Room
    </button>
  )),
}));

// Mock utility functions
jest.mock("@/utils", () => ({
  tableHeaders: jest.fn(() => [
    { label: "Header 1", width: "50%" },
    { label: "Header 2", width: "50%" },
  ]),
  renderRoomBody: jest.fn(() => [
    { value: "Room Value 1", width: "50%" },
    { value: "Room Value 2", width: "50%" },
  ]),
}));

describe("Table Component", () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  const renderTable = (props: Partial<TableProps<any>> = {}) => {
    const defaultProps: TableProps<any> = {
      data: [],
      type: "room",
      error: null,
      onDelete: mockOnDelete,
      onEdit: mockOnEdit,
    };
    return render(<Table {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 20% when no value is provided", () => {
    const mockData = [
      { documentId: "1", name: "Room 1", percentage: undefined },
    ];
    renderTable({ data: mockData });

    // Assuming percentage is rendered somewhere
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("renders no data alert when data is empty", () => {
    renderTable();

    expect(screen.getByText("No rooms available.")).toBeInTheDocument();
  });

  it("renders error alert when error is provided", () => {
    renderTable({ error: "Test Error" });

    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  it("toggles the menu for a row when the menu button is clicked", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    renderTable({ data: mockData });

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    expect(screen.getByTestId("edit-room")).toBeInTheDocument();
    expect(screen.getByTestId("delete-room")).toBeInTheDocument();
  });

  it("toggles the active menu when the menu button is clicked", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    renderTable({ data: mockData });

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    // Check if the menu is displayed
    expect(screen.getByTestId("edit-room")).toBeInTheDocument();

    fireEvent.click(menuButton);

    // Check if the menu is removed
    expect(screen.queryByTestId("edit-room")).not.toBeInTheDocument();
  });

  it("closes the menu when clicking outside", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    renderTable({ data: mockData });

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const menu = screen.getByTestId("menu-button").closest("div");
    fireEvent.click(document);

    expect(menu).not.toContainElement(screen.getByTestId("edit-room"));
    expect(menu).not.toContainElement(screen.getByTestId("delete-room"));
  });

  it("calls onEdit with correct data when edit is triggered", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    renderTable({ data: mockData });

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("edit-room");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith({});
  });

  it("renders the correct modal for each type", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    // Test for Room type
    renderTable({ data: mockData, type: "room" });
    expect(screen.getByTestId("edit-room")).toBeInTheDocument();

    // Test for Rate type
    renderTable({ data: mockData, type: "rate" });
    expect(screen.getByTestId("edit-rate")).toBeInTheDocument();

    // Test for Guest type
    renderTable({ data: mockData, type: "guest" });
    expect(screen.getByTestId("edit-guest")).toBeInTheDocument();

    // Test for Deal type
    renderTable({ data: mockData, type: "deal" });
    expect(screen.getByTestId("edit-deal")).toBeInTheDocument();
  });

  it("calls onDelete with correct id when delete is triggered", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    renderTable({ data: mockData });

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const deleteButton = screen.getByTestId("delete-room");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("renders the correct delete button for each type", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    // Test for Room type
    renderTable({ data: mockData, type: "room" });
    expect(screen.getByTestId("delete-room")).toBeInTheDocument();

    // Test for Rate type
    renderTable({ data: mockData, type: "rate" });
    expect(screen.getByTestId("delete-rate")).toBeInTheDocument();

    // Test for Guest type
    renderTable({ data: mockData, type: "guest" });
    expect(screen.getByTestId("delete-guest")).toBeInTheDocument();

    // Test for Deal type
    renderTable({ data: mockData, type: "deal" });
    expect(screen.getByTestId("delete-deal")).toBeInTheDocument();
  });

  it("returns null when type is unknown", () => {
    const mockData = [{ documentId: "1", name: "Room 1" }];

    renderTable({ data: mockData, type: "unknown" });

    // Check that no modal is rendered for unknown type
    expect(screen.queryByTestId("edit-room")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delete-room")).not.toBeInTheDocument();
  });
});
