import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteRoom from "./DeleteRoom";
import { deleteRoom } from "../../../../services/roomService";

// Mock the deleteRoom service
jest.mock("../../../../services/roomService", () => ({
  deleteRoom: jest.fn(),
}));

describe("DeleteRoom Component", () => {
  const mockRoomId = "room123";
  const mockOnDeleteRoom = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the alert dialog when the 'Delete' button is clicked", () => {
    render(<DeleteRoom roomId={mockRoomId} onDeleteRoom={mockOnDeleteRoom} />);

    // Open the dialog
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Check if the dialog content is present
    expect(screen.getByText("Delete Room")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this room?")
    ).toBeInTheDocument();
  });

  it("should call handleDelete and display loading spinner on 'Confirm Delete'", async () => {
    (deleteRoom as jest.Mock).mockResolvedValueOnce(true);

    render(<DeleteRoom roomId={mockRoomId} onDeleteRoom={mockOnDeleteRoom} />);

    // Open the dialog and click Confirm Delete
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    // Loading spinner should appear
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Verify the delete function and spinner disappear
    await waitFor(() =>
      expect(mockOnDeleteRoom).toHaveBeenCalledWith(mockRoomId)
    );
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should show error message on delete failure", async () => {
    (deleteRoom as jest.Mock).mockRejectedValueOnce(new Error("Delete failed"));

    render(<DeleteRoom roomId={mockRoomId} onDeleteRoom={jest.fn()} />);
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() =>
      expect(screen.getByText("Failed to delete room.")).toBeInTheDocument()
    );
  });

  it("should close modal when cancel is clicked", () => {
    render(<DeleteRoom roomId={mockRoomId} onDeleteRoom={jest.fn()} />);

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByText("Are you sure you want to delete this room?")
    ).not.toBeInTheDocument();
  });

  it("should reset loading state after delete operation", async () => {
    (deleteRoom as jest.Mock).mockRejectedValueOnce(new Error("Delete failed"));

    render(<DeleteRoom roomId={mockRoomId} onDeleteRoom={mockOnDeleteRoom} />);

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() =>
      expect(screen.getByText("Failed to delete room.")).toBeInTheDocument()
    );

    // Ensure loading state has been reset
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should close the dialog after successful deletion", async () => {
    (deleteRoom as jest.Mock).mockResolvedValueOnce(true);

    render(<DeleteRoom roomId={mockRoomId} onDeleteRoom={mockOnDeleteRoom} />);

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() =>
      expect(
        screen.queryByText("Are you sure you want to delete this room?")
      ).not.toBeInTheDocument()
    );
  });
});
