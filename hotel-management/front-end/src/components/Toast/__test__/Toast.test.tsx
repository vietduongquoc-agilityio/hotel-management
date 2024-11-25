import { renderHook, act } from "@testing-library/react";
import { useToast } from "@chakra-ui/react";
import Toast from "..";

jest.mock("@chakra-ui/react", () => ({
  useToast: jest.fn(),
}));

describe("Toast", () => {
  const mockUseToast = jest.fn();

  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => mockUseToast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useToast with correct parameters for info toast", () => {
    const { result } = renderHook(() => Toast());

    act(() => {
      result.current.showToast("Info message", "info");
    });

    expect(result).toMatchSnapshot();
    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Info message",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  });

  it("should call useToast with correct parameters for success toast", () => {
    const { result } = renderHook(() => Toast());

    act(() => {
      result.current.showToast("Success message", "success");
    });

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Success message",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  });

  it("should call useToast with correct parameters for warning toast", () => {
    const { result } = renderHook(() => Toast());

    act(() => {
      result.current.showToast("Warning message", "warning");
    });

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Warning message",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  });

  it("should call useToast with correct parameters for error toast", () => {
    const { result } = renderHook(() => Toast());

    act(() => {
      result.current.showToast("Error message", "error");
    });

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Error message",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  });
});
