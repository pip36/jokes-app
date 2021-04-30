import { render as testingLibraryRender } from "@testing-library/react";
import JokesProvider from "./api/jokes/JokesProvider";

export const render = (el: JSX.Element) =>
  testingLibraryRender(<JokesProvider>{el}</JokesProvider>);
