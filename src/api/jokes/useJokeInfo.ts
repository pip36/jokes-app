import { useState, useEffect } from "react";
import axios from "axios";
import { JOKE_API_BASE_URL } from "./config";
import { GetJokeInfoResponse } from "./types";

export const useJokeInfo = () => {
  const [
    jokeInfoResponse,
    setJokeInfoResponse,
  ] = useState<GetJokeInfoResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const r = await axios.get(JOKE_API_BASE_URL + "/info");
        isMounted && setJokeInfoResponse(r.data);
      } catch (err) {
        // TODO: Error handling
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { jokeInfoResponse };
};
