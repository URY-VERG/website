import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders navbar brand", () => {
  render(<App />);
  expect(screen.getByText(/annadata/i)).toBeInTheDocument();
});

test("cart count increases when adding item", async () => {
  render(<App />);

  userEvent.click(screen.getByRole("link", { name: /shop/i }));
  userEvent.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);

  expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent("Cart (1)");
});

test("learning page has video embed", async () => {
  render(<App />);

  userEvent.click(screen.getByRole("link", { name: /learning/i }));
  // iframe title is set to active resource title
  const iframe = await screen.findByTitle(/organic farming basics/i);
  expect(iframe).toBeInTheDocument();
});
