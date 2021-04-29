import { Typography, TextField, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { isSingleJoke } from "./api/jokes/types";
import { useJokeInfo } from "./api/jokes/useJokeInfo";
import { useJokeSearch } from "./api/jokes/useJokeSearch";

const JokeApp = () => {
  const [category, setCategory] = useState("Any");
  const { jokeSearchResponse } = useJokeSearch({ category });
  const { jokeInfoResponse } = useJokeInfo();

  if (!jokeInfoResponse) return null;

  return (
    <div>
      <Typography variant="h1">Joke App</Typography>
      <Typography variant="h2">
        Now with {jokeInfoResponse?.jokes.totalCount} jokes!
      </Typography>

      <TextField
        id="joke-category"
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        helperText="Please select a category"
        variant="outlined"
      >
        {jokeInfoResponse?.jokes.categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

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
