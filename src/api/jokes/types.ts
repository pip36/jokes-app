export interface Joke {
  id: number;
  safe: boolean;
  lang: string;
  category:
    | "Any"
    | "Misc"
    | "Programming"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas"
    | string;
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

export interface GetJokesResponse {
  error: boolean;
  amount: number;
  jokes: (SingleJoke | TwopartJoke)[];
}
