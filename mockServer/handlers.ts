import { rest, RestRequest } from "msw";
import { GetJokesResponse } from "../src/api/jokes/types";
import { buildJoke } from "./data/jokes";

export const handlers = [
  rest.get<any, GetJokesResponse>(
    "https://v2.jokeapi.dev/joke/:category",
    (req, res, ctx) => {
      if (!safeModeEnabled(req)) {
        return res(ctx.status(500));
      }

      const { category } = req.params;
      const amount = req.url.searchParams.get("amount") || "";

      return res(
        ctx.status(200),
        ctx.json({
          error: false as boolean,
          amount: parseInt(amount, 10),
          jokes: new Array(amount).fill("").map((x) => buildJoke({ category })),
        })
      );
    }
  ),
];

const safeModeEnabled = (req: RestRequest) =>
  req.url.searchParams.get("safe-mode");
