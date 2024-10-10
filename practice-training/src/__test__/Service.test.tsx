import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loginUser } from "../Services/UserService";

const mock = new MockAdapter(axios);

describe("loginUser service", () => {
  afterEach(() => {
    mock.reset();
  });

  test("should return data when login is successful", async () => {
    const mockResponse = { data: { custom_attributes: "value" } };
    mock
      .onPost("https://66f122ec41537919154fae44.mockapi.io/albums/user")
      .reply(200, { data: mockResponse });

    const result = await loginUser("test@example.com", "password");
    expect(result).toEqual({ data: mockResponse });
  });

  test("should return empty data when login response is empty", async () => {
    mock
      .onPost("https://66f122ec41537919154fae44.mockapi.io/albums/user")
      .reply(200, {});

    const result = await loginUser("test@example.com", "password");
    expect(result).toEqual({ data: {} });
  });

  test("should return empty data when login response is empty", async () => {
    mock
      .onPost("https://66f122ec41537919154fae44.mockapi.io/albums/user")
      .reply(200, {});

    const result = await loginUser("test@example.com", "password");
    expect(result).toEqual({ data: {} });
  });

  test("should throw error when login fails", async () => {
    mock
      .onPost("https://66f122ec41537919154fae44.mockapi.io/albums/user")
      .reply(500);

    await expect(loginUser("test@example.com", "password")).rejects.toThrow(
      "Login Fail",
    );
  });

  test("should throw error for unknown error type", async () => {
    const error = new Error("Some random error");
    jest.spyOn(axios, "post").mockRejectedValueOnce(error);

    await expect(loginUser("test@example.com", "password")).rejects.toThrow(
      "Unexpected error.",
    );
  });
});
