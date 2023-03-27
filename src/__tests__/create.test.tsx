import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { CreateEventModalForm } from "../pages/createModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act } from "@testing-library/react";

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

test("succesfully adds data to the table", async () => {
  const queryClient = new QueryClient();
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

  await screen.findByText(/successfully created event/i);

  expect(screen.getByText("Dummy Event")).toBeInTheDocument();
});
