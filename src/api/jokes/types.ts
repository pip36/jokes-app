export type Joke = {
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
  type: string;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
};

export type GetJokesResponse = {
  error: boolean;
  amount: number;
  jokes: Joke[];
};
