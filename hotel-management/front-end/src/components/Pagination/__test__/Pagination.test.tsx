import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../index";

describe("Pagination Component", () => {
  const mockSetCurrentPage = jest.fn();

  const defaultProps = {
    currentPage: 1,
    setCurrentPage: mockSetCurrentPage,
    pageSize: 5,
    pageCount: 5,
  };

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
  });

  it("renders 'Previous' button correctly", () => {
    render(<Pagination {...defaultProps} />);

    const previousButton = screen.getByText("< Previous");
    expect(previousButton).not.toBeDisabled();
  });

  it("disables the 'Previous' button on the first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const previousButton = screen.getByText("< Previous");
    expect(previousButton).toBeDisabled();
  });

  it("renders 'Next' button correctly", () => {
    render(<Pagination {...defaultProps} />);

    const nextButton = screen.getByText("Next >");
    expect(nextButton).not.toBeDisabled();
  });

  it("disables the 'Next' button on the last page", () => {
    render(<Pagination {...defaultProps} currentPage={defaultProps.pageCount} />);

    const nextButton = screen.getByText("Next >");
    expect(nextButton).toBeDisabled();
  });

  it("renders the correct number of page buttons", () => {
    render(<Pagination {...defaultProps} />);

    const pageButtons = screen.getAllByRole("button", { name: /^\d+$/ });
    expect(pageButtons.length).toBe(defaultProps.pageCount);

    pageButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(`${index + 1}`);
    });
  });

  it("renders '...' when there are more pages before or after the visible range", () => {
    const propsWithMorePages = {
      ...defaultProps,
      currentPage: 3,
      pageCount: 10,
    };
    render(<Pagination {...propsWithMorePages} />);

    // Check for the '...' before or after the page numbers
    const dotsStart = screen.queryByText("...");
    const dotsEnd = screen.queryByText("...");

    expect(dotsStart).toBeInTheDocument();
    expect(dotsEnd).toBeInTheDocument();
  });

  it("applies correct variant and styles for current page button", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const currentPageButton = screen.getByText("1");
    expect(currentPageButton).toHaveAttribute("variant", "surface");
    expect(currentPageButton).toHaveStyle("background-color: blue.100");
    expect(currentPageButton).toHaveStyle("color: blue.500");
  });

  it("calls setCurrentPage with the correct page number when a page button is clicked", () => {
    render(<Pagination {...defaultProps} />);

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it("calls setCurrentPage with the previous page when 'Previous' is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const previousButton = screen.getByText("< Previous");
    fireEvent.click(previousButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("calls setCurrentPage with the next page when 'Next' is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const nextButton = screen.getByText("Next >");
    fireEvent.click(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
  });
});
