import { Typography, TextField, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { isSingleJoke, NO_RESULTS_ERROR_CODE } from "./api/jokes/types";
import { useJokeInfo } from "./api/jokes/useJokeInfo";
import { useJokeSearch } from "./api/jokes/useJokeSearch";
import useDebounce from "./api/utils";

const JokeApp = () => {
  const [category, setCategory] = useState("Any");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { jokeSearchResponse } = useJokeSearch({
    category,
    contains: debouncedSearchTerm,
  });
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

      <TextField
        id="joke-search"
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a joke..."
        variant="outlined"
      />

      <div data-testid="joke-results">
        {jokeSearchResponse?.error &&
          jokeSearchResponse.code === NO_RESULTS_ERROR_CODE && (
            <Typography>Sorry! No matching jokes found</Typography>
          )}

        {jokeSearchResponse?.jokes?.map((joke) => (
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
