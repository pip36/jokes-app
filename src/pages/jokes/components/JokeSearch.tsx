import { MenuItem, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { JokesContext } from "../../../api/jokes/JokesProvider";
import { isSingleJoke, NO_RESULTS_ERROR_CODE } from "../../../api/jokes/types";
import { useJokeSearch } from "../../../api/jokes/useJokeSearch";
import useDebounce from "../../../api/utils";

const JokeSearch = () => {
  const { categories } = useContext(JokesContext);
  const [category, setCategory] = useState("Any");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { jokeSearchResponse } = useJokeSearch({
    category,
    contains: debouncedSearchTerm,
  });

  return (
    <div>
      <TextField
        id="joke-category"
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        helperText="Please select a category"
        variant="outlined"
      >
        {categories.map((category) => (
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

export default JokeSearch;
