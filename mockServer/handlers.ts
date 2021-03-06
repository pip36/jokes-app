import { rest, RestRequest } from "msw";
import {
  GetJokeInfoResponse,
  GetJokesResponse,
  NO_RESULTS_ERROR_CODE,
} from "../src/api/jokes/types";
import {
  buildSingleJoke,
  buildTwopartJoke,
  jokeCategories,
  nonExistingJokeText,
  totalJokeCount,
} from "./data/jokes";

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

      const searchTerm = req.url.searchParams.get("contains") || "";

      if (searchTerm === nonExistingJokeText) {
        return res(
          ctx.status(200),
          ctx.json({
            error: true as boolean,
            code: NO_RESULTS_ERROR_CODE,
          } as GetJokesResponse)
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          error: false as boolean,
          amount,
          jokes: new Array(amount).fill("").map((_, i) =>
            i % 2 === 0
              ? buildSingleJoke({
                  category,
                  joke: searchTerm + "Funny Joke - " + i,
                })
              : buildTwopartJoke({
                  category,
                  setup: "Funny Setup - " + i,
                  delivery: searchTerm + "Funny delivery - " + i,
                })
          ),
        } as GetJokesResponse)
      );
    }
  ),
  rest.get<any, GetJokeInfoResponse>(
    "https://v2.jokeapi.dev/info",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          error: false as boolean,
          jokes: {
            totalCount: totalJokeCount,
            categories: jokeCategories,
          },
        })
      );
    }
  ),
];

const safeModeEnabled = (req: RestRequest) =>
  req.url.searchParams.has("safe-mode");
