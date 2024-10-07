import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Components/Pages/Form";

describe("Form Component", () => {
  test("renders with default props", () => {
    const mockSubmit = jest.fn();
    render(<Form onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("submits form data correctly", () => {
    const mockSubmit = jest.fn();
    render(<Form onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  test("requires email and password fields", () => {
    const mockSubmit = jest.fn();
    render(<Form onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/email/i)).toBeInvalid();
    expect(screen.getByLabelText(/password/i)).toBeInvalid();
  });
});
