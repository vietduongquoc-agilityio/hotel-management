import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteRate from "./index";
import { deleteRate } from "../../../../services/rateServices";
import { useToast } from "@chakra-ui/react";
import React from "react";

jest.mock("../../../../services/rateServices", () => ({
  deleteRate: jest.fn(),
}));
jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    ...originalModule,
    useToast: jest.fn(),
  };
});

describe("DeleteRate Component", () => {
  const mockRateId = "rate123";
  const mockOnDeleteRate = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  it("should display the alert dialog when 'Delete' button is clicked", () => {
    render(<DeleteRate rateId={mockRateId} onDeleteRate={mockOnDeleteRate} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Delete Rate")).toBeInTheDocument();
  });

  it("should call handleDelete and show success toast on 'Confirm Delete'", async () => {
    (deleteRate as jest.Mock).mockResolvedValueOnce(true);

    render(<DeleteRate rateId={mockRateId} onDeleteRate={mockOnDeleteRate} />);
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(mockOnDeleteRate).toHaveBeenCalledWith(mockRateId)
    );
    expect(mockToast).toHaveBeenCalledWith({
      title: "Rate deleted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should display error toast and reset loading on delete failure", async () => {
    (deleteRate as jest.Mock).mockRejectedValueOnce(new Error("Delete failed"));

    render(<DeleteRate rateId={mockRateId} onDeleteRate={mockOnDeleteRate} />);
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Failed to delete rate.",
        description: "An error occurred while deleting the rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should close modal on successful deletion", async () => {
    (deleteRate as jest.Mock).mockResolvedValueOnce(true);

    render(<DeleteRate rateId={mockRateId} onDeleteRate={mockOnDeleteRate} />);
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() =>
      expect(screen.queryByText("Delete Rate")).not.toBeInTheDocument()
    );
  });

  it("should close modal when 'Cancel' button is clicked", () => {
    render(<DeleteRate rateId={mockRateId} onDeleteRate={mockOnDeleteRate} />);

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByText("Are you sure you want to delete this rate?")
    ).not.toBeInTheDocument();
  });

  it("should reset loading state after delete operation completes", async () => {
    (deleteRate as jest.Mock).mockRejectedValueOnce(new Error("Delete failed"));

    render(<DeleteRate rateId={mockRateId} onDeleteRate={mockOnDeleteRate} />);
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() =>
      expect(screen.getByText("Failed to delete rate.")).toBeInTheDocument()
    );

    // Ensure loading is reset
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
