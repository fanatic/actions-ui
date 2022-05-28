import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders actions ui text", () => {
  render(<App />);
  const linkElement = screen.getByText(/actions ui/i);
  expect(linkElement).toBeInTheDocument();
});
