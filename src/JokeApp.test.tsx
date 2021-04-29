import { render, screen, within } from "@testing-library/react";
import { totalJokeCount } from "../mockServer/data/jokes";
import JokeApp from "./JokeApp";

test("Displays main heading", async () => {
  render(<JokeApp />);

  const heading = screen.getByRole("heading", { name: /Joke App/i });

  expect(heading).toBeInTheDocument();
});

test("When application loads, 10 jokes are displayed from the 'Any' category", async () => {
  render(<JokeApp />);

  const jokesWithAnyCategory = await within(
    screen.getByTestId("joke-results")
  ).findAllByText(/Category: Any/i);

  expect(jokesWithAnyCategory.length).toEqual(10);
});

test("Joke's type should be displayed", async () => {
  render(<JokeApp />);

  const singleJokes = await within(
    screen.getByTestId("joke-results")
  ).findAllByText(/Type: Single/i);

  const twopartJokes = await within(
    screen.getByTestId("joke-results")
  ).findAllByText(/Type: Twopart/i);

  expect(singleJokes.length).toEqual(5);
  expect(twopartJokes.length).toEqual(5);
});

test("Jokes of type 'single' should be displayed", async () => {
  render(<JokeApp />);

  const singleJokes = await within(
    screen.getByTestId("joke-results")
  ).findAllByText(/Funny Joke/i);

  expect(singleJokes.length).toEqual(5);
});

test("Jokes of type 'twopart' should be displayed", async () => {
  render(<JokeApp />);

  const jokeSetupText = await within(
    screen.getByTestId("joke-results")
  ).findAllByText(/Funny Setup/i);

  const jokeDeliveryText = await within(
    screen.getByTestId("joke-results")
  ).findAllByText(/Funny Delivery/i);

  expect(jokeSetupText.length).toEqual(5);
  expect(jokeDeliveryText.length).toEqual(5);
});

test("Total number of jokes available on the api should be displayed", async () => {
  render(<JokeApp />);

  const jokeCountDisplay = await screen.findByText(
    `Now with ${totalJokeCount} jokes!`,
    { exact: false }
  );

  expect(jokeCountDisplay).toBeInTheDocument();
});
