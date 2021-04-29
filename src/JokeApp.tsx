import { Typography } from "@material-ui/core";
import { isSingleJoke } from "./api/jokes/types";
import { useJokeSearch } from "./api/jokes/useJokeSearch";

const JokeApp = () => {
  const { response } = useJokeSearch({ category: "Any" });

  return (
    <div>
      <Typography variant="h1">Joke App</Typography>
      <div data-testid="joke-results">
        {response?.jokes.map((joke) => (
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
