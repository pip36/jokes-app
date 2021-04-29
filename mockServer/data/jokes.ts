import { Joke, SingleJoke, TwopartJoke } from "../../src/api/jokes/types";
import faker from "faker";

const buildJoke = (): Joke => ({
  id: faker.datatype.number(),
  category: faker.music.genre(),
  flags: {
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  },
  lang: faker.address.countryCode(),
  safe: true,
});

export const buildSingleJoke = (
  overrides: Partial<SingleJoke>
): SingleJoke => ({
  joke: faker.lorem.sentence(),
  type: "single",
  ...buildJoke(),
  ...overrides,
});

export const buildTwopartJoke = (
  overrides: Partial<TwopartJoke>
): TwopartJoke => ({
  setup: faker.lorem.sentence(),
  delivery: faker.lorem.sentence(),
  type: "twopart",
  ...buildJoke(),
  ...overrides,
});
