import { CreateEventModalForm } from "../pages/createModal";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Create Event Modal Form", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("displays an error message when the title is not provided", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateEventModalForm isOpen={true} onCancel={() => {}} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Create"));

    const validationMessage = await screen.findByText("Please input title");
    expect(validationMessage).toBeInTheDocument();
  });

  test("displays an error message when the type is not selected", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateEventModalForm isOpen={true} onCancel={() => {}} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Create"));

    const validationMessage = await screen.findByText("Please select a type");
    expect(validationMessage).toBeInTheDocument();
  });

  test("displays an error message when the type is not selected", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateEventModalForm isOpen={true} onCancel={() => {}} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Create"));

    const validationMessage = await screen.findByText(
      "Please select a start date"
    );
    expect(validationMessage).toBeInTheDocument();
  });

  test("displays an error message when the end date is not selected", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateEventModalForm isOpen={true} onCancel={() => {}} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Create"));

    const validationMessage = await screen.findByText(
      "Please select an end date"
    );
    expect(validationMessage).toBeInTheDocument();
  });
});
