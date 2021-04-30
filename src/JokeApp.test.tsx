import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { nonExistingJokeText, totalJokeCount } from "../mockServer/data/jokes";
import JokeApp from "./JokeApp";
import { render } from "./testUtils";

test("Displays main heading", async () => {
  render(<JokeApp />);

  const heading = await screen.findByRole("heading", { name: /Joke App/i });

  expect(heading).toBeInTheDocument();
});

test("When application loads, 10 jokes are displayed from the 'Any' category", async () => {
  render(<JokeApp />);

  const jokesWithAnyCategory = await within(
    await screen.findByTestId("joke-results")
  ).findAllByText(/Category: Any/i);

  expect(jokesWithAnyCategory.length).toEqual(10);
});

test("Joke's type should be displayed", async () => {
  render(<JokeApp />);

  const singleJokes = await within(
    await screen.findByTestId("joke-results")
  ).findAllByText(/Type: Single/i);

  const twopartJokes = await within(
    await screen.findByTestId("joke-results")
  ).findAllByText(/Type: Twopart/i);

  expect(singleJokes.length).toEqual(5);
  expect(twopartJokes.length).toEqual(5);
});

test("Jokes of type 'single' should be displayed", async () => {
  render(<JokeApp />);

  const singleJokes = await within(
    await screen.findByTestId("joke-results")
  ).findAllByText(/Funny Joke/i);

  expect(singleJokes.length).toEqual(5);
});

test("Jokes of type 'twopart' should be displayed", async () => {
  render(<JokeApp />);

  const jokeSetupText = await within(
    await screen.findByTestId("joke-results")
  ).findAllByText(/Funny Setup/i);

  const jokeDeliveryText = await within(
    await screen.findByTestId("joke-results")
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

test("Can filter jokes based on the category", async () => {
  render(<JokeApp />);

  const inputDisplayingAny = await screen.findByDisplayValue("Any");
  expect(inputDisplayingAny).toBeInTheDocument();

  userEvent.click(await screen.findByLabelText(/Category/i));
  userEvent.click(await screen.findByText(/Programming/i));

  const inputDisplayingProgramming = await screen.findByDisplayValue(
    "Programming"
  );
  expect(inputDisplayingProgramming).toBeInTheDocument();

  const jokesWithProgrammingCategory = await within(
    await screen.findByTestId("joke-results")
  ).findAllByText(/Category: Programming/i);

  expect(jokesWithProgrammingCategory.length).toEqual(10);
});

test("Can search jokes by text", async () => {
  render(<JokeApp />);

  const searchBox = await screen.findByLabelText(/Search/i);

  userEvent.type(searchBox, "dave");

  const jokesContainingDave = await within(
    await screen.findByTestId("joke-results")
  ).findAllByText(/dave/i);

  expect(jokesContainingDave.length).toEqual(10);
});

test("When no search results are found a helpful message is displayed", async () => {
  render(<JokeApp />);

  const searchBox = await screen.findByLabelText(/Search/i);

  userEvent.type(searchBox, nonExistingJokeText);

  const noResultsMessage = await screen.findByText(
    /Sorry! No matching jokes found/i
  );

  expect(noResultsMessage).toBeInTheDocument();
});
