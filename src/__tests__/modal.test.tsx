import { CreateEventModalForm } from "../pages/createModal";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Create Event Modal Form Field Validation Test", () => {
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

/*import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CreateEventModalForm } from "../pages/createModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer } from "react-toastify";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("CreateEventModalForm", () => {
  test("successfully fills in fields and shows toast message on success", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateEventModalForm isOpen={true} onCancel={() => {}} />
        <ToastContainer />
      </QueryClientProvider>
    );

    axios.post.mockImplementation(() =>
      Promise.resolve({ data: { success: true } })
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Dummy Event" },
    });

    fireEvent.change(screen.getByLabelText(/type/i), {
      target: { value: "generic" },
    });

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2022-01-01" },
    });

    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: "2022-01-02" },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Dummy event description" },
    });

    fireEvent.click(screen.getByText(/create event/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/events", {
        title: "Dummy Event",
        type: "generic",
        startDate: "2022-01-01",
        endDate: "2022-01-02",
        description: "Dummy event description",
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText(/event created successfully/i)
      ).toBeInTheDocument();
    });
  });
});
*/

/*import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { CreateEventModalForm } from "../pages/createModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act } from "@testing-library/react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

describe("CreateEventModalForm", () => {
  const server = setupServer(
    rest.post("http://localhost:3001/events", (req, res, ctx) => {
      return res(ctx.json({ id: "abc123", ...req.body }));
    })
  );

  beforeAll(() => {
    server.listen();
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
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("successfully adds data to the table", async () => {
    const queryClient = new QueryClient();
    const postSpy = jest.spyOn(axios, "post");
    postSpy.mockResolvedValue({ data: {} });
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <CreateEventModalForm isOpen={true} onCancel={() => {}} />
        </QueryClientProvider>
      );
    });

    await act(async () => {
      const titleInput = screen.getByLabelText(/title/i);
      fireEvent.change(titleInput, { target: { value: "Dummy Event" } });

      const typeInput = screen.getByLabelText(/type/i);
      fireEvent.change(typeInput, { target: { value: "generic" } });

      const startDateInput = screen.getByLabelText(/start date/i);
      fireEvent.change(startDateInput, { target: { value: "2022-01-01" } });

      const endDateInput = screen.getByLabelText(/end date/i);
      fireEvent.change(endDateInput, { target: { value: "2022-01-02" } });

      const descriptionInput = screen.getByLabelText(/description/i);
      fireEvent.change(descriptionInput, {
        target: { value: "Dummy event description" },
      });

      const submitButton = screen.getByText(/Create event/i);
      fireEvent.click(submitButton);
    });

    // Make sure the axios post function was called with the right parameters
    expect(postSpy).toHaveBeenCalledWith("http://localhost:3001/events", {
      title: "Dummy Event",
      type: "generic",
      startDate: "2022-01-01",
      endDate: "2022-01-02",
      description: "Dummy event description",
    });
  });
});
*/
/*
A unit test to see if onload the table is getting filled in with the correct data and if
the table is filled in with the correct data.
A unit test to see if filling in the fields in the modal will succeed (with a toast
message on success).*/
