import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../Page/Login/LoginPage";
import { loginUser } from "../Services/UserService";
import React from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Giữ lại tất cả các import khác
  useNavigate: jest.fn(),
}));

jest.mock("../Services/UserService");

describe("LoginPage", () => {
  beforeEach(() => {
    (loginUser as jest.Mock).mockResolvedValue({
      data: { custom_attributes: "value" },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("enables submit button when form is valid", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    expect(screen.getByRole("button", { name: /login/i })).not.toBeDisabled();
  });

  test("disables submit button when form is invalid", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  test("shows success message on successful login", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText("Login successful!")).toBeInTheDocument(),
    );
  });

  test("shows error message on failed login", async () => {
    (loginUser as jest.Mock).mockResolvedValue({ data: {} });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(
        screen.getByText("Login failed. Please check your login information."),
      ).toBeInTheDocument(),
    );
  });

  test("matches the snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
