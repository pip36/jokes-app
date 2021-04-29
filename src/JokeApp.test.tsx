import { render, screen } from "@testing-library/react";
import JokeApp from "./JokeApp";

test("Displays main heading", () => {
  render(<JokeApp />);

  const heading = screen.getByRole("heading", { name: "Joke App" });

  expect(heading).toBeInTheDocument();
});
