import { useState, useEffect } from "react";
import axios from "axios";
import { JOKE_API_BASE_URL } from "./config";
import { GetJokesParams, GetJokesResponse } from "./types";

export const useJokeSearch = ({ category }: GetJokesParams) => {
  const [jokesResponse, setJokesResponse] = useState<GetJokesResponse | null>(
    null
  );

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const r = await axios.get(
          JOKE_API_BASE_URL + "/joke/" + category + "?amount=10&safe-mode"
        );
        isMounted && setJokesResponse(r.data);
      } catch (err) {
        // TODO: Error handling
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { response: jokesResponse };
};