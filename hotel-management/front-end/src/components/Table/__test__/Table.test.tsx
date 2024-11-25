import { render, screen } from "@testing-library/react";
import Table from "../index";
import { RateData, RoomData } from "@/interfaces";

describe("Table Component", () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  const roomData: RoomData[] = [
    {
      documentId: "1",
      roomNumber: "101",
      bedType: "Single",
      roomFloor: "1",
      roomFacility: "Air Conditioning",
      roomStatus: "Available",
    },
  ];

  const rateData: RateData[] = [
    {
      documentId: "1",
      roomType: "Deluxe",
      deals: "Summer Deal",
      cancellationPolicy: "Free Cancellation",
      dealPrice: "200",
      rate: "200",
      totalOfRooms: 10,
      totalOfBooked: 5,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers for rooms", () => {
    const { container } = render(
      <Table
        data={roomData}
        type="room"
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Room number")).toBeInTheDocument();
    expect(screen.getByText("Bed type")).toBeInTheDocument();
    expect(screen.getByText("Room floor")).toBeInTheDocument();
    expect(screen.getByText("Room facility")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders table headers for rates", () => {
    const { container } = render(
      <Table
        data={rateData}
        type="rate"
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Room type")).toBeInTheDocument();
    expect(screen.getByText("Deals")).toBeInTheDocument();
    expect(screen.getByText("Cancellation policy")).toBeInTheDocument();
    expect(screen.getByText("Deal price")).toBeInTheDocument();
    expect(screen.getByText("Rate")).toBeInTheDocument();
    expect(screen.getByText("Availability")).toBeInTheDocument();
  });

  it("displays an error message when error is provided", () => {
    render(
      <Table
        data={[]}
        type="room"
        error="Failed to fetch data"
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("displays no items message when data is empty", () => {
    render(
      <Table
        data={[]}
        type="rate"
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText("No rates available.")).toBeInTheDocument();
  });
});
