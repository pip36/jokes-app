import { Typography } from "@material-ui/core";
import { isSingleJoke } from "./api/jokes/types";
import { useJokeInfo } from "./api/jokes/useJokeInfo";
import { useJokeSearch } from "./api/jokes/useJokeSearch";

const JokeApp = () => {
  const { jokeSearchResponse } = useJokeSearch({ category: "Any" });
  const { jokeInfoResponse } = useJokeInfo();

  return (
    <div>
      <Typography variant="h1">Joke App</Typography>
      <Typography variant="h2">
        Now with {jokeInfoResponse?.jokes.totalCount} jokes!
      </Typography>
      <div data-testid="joke-results">
        {jokeSearchResponse?.jokes.map((joke) => (
          <div key={joke.id}>
            <Typography>Category: {joke.category}</Typography>
            <Typography>Type: {joke.type}</Typography>
            {isSingleJoke(joke) ? (
              <Typography>{joke.joke}</Typography>
            ) : (
              <>
                <Typography>{joke.setup}</Typography>
                <Typography>{joke.delivery}</Typography>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JokeApp;
