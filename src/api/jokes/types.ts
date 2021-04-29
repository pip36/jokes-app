export interface Joke {
  id: number;
  safe: boolean;
  lang: string;
  category: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
}

export interface SingleJoke extends Joke {
  type: "single";
  joke: string;
}

export interface TwopartJoke extends Joke {
  type: "twopart";
  setup: string;
  delivery: string;
}

export const isSingleJoke = (
  joke: SingleJoke | TwopartJoke
): joke is SingleJoke => joke.type === "single";

export interface GetJokesParams {
  amount?: number;
  category: string;
  contains?: string;
}

export const NO_RESULTS_ERROR_CODE = 106;
export interface GetJokesResponse {
  error: boolean;
  amount?: number;
  code?: typeof NO_RESULTS_ERROR_CODE;
  jokes?: (SingleJoke | TwopartJoke)[];
}

export interface GetJokeInfoResponse {
  // Only a partial response, unused fields have been omitted
  error: boolean;
  jokes: {
    totalCount: number;
    categories: string[];
  };
}
