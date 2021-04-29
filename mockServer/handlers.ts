import { rest, RestRequest } from "msw";
import { GetJokesResponse } from "../src/api/jokes/types";
import { buildSingleJoke, buildTwopartJoke } from "./data/jokes";

export const handlers = [
  rest.get<any, GetJokesResponse>(
    "https://v2.jokeapi.dev/joke/:category",
    (req, res, ctx) => {
      if (!safeModeEnabled(req)) {
        return res(ctx.status(500));
      }

      const { category } = req.params;
      const amount = parseInt(req.url.searchParams.get("amount") || "0", 10);

      if (!amount) {
        return res(ctx.status(500));
      }

      return res(
        ctx.status(200),
        ctx.json({
          error: false as boolean,
          amount,
          jokes: new Array(amount).fill("").map((_, i) =>
            i % 2 === 0
              ? buildSingleJoke({ category, joke: "Funny Joke - " + i })
              : buildTwopartJoke({
                  category,
                  setup: "Funny Setup - " + i,
                  delivery: "Funny delivery - " + i,
                })
          ),
        })
      );
    }
  ),
];

const safeModeEnabled = (req: RestRequest) =>
  req.url.searchParams.has("safe-mode");
