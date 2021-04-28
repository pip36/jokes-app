import { Joke } from "../../src/api/jokes/types";
import faker from "faker";

export const buildJoke = (overrides: Partial<Joke>): Joke => ({
  id: faker.datatype.number(),
  category: faker.music.genre(),
  delivery: faker.lorem.sentence(),
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
  setup: faker.lorem.sentence(),
  type: "twopart",
  ...overrides,
});
