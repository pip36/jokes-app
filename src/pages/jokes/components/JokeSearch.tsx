import { MenuItem, TextField, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import { JokesContext } from "../../../api/jokes/JokesProvider";
import { NO_RESULTS_ERROR_CODE } from "../../../api/jokes/types";
import { useJokeSearch } from "../../../api/jokes/useJokeSearch";
import useDebounce from "../../../api/utils";
import JokeCard from "./JokeCard";

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
        variant="outlined"
        fullWidth
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
        fullWidth
      />

      <div data-testid="joke-results">
        {jokeSearchResponse?.error &&
          jokeSearchResponse.code === NO_RESULTS_ERROR_CODE && (
            <Typography>Sorry! No matching jokes found</Typography>
          )}

        {jokeSearchResponse?.jokes?.map((joke) => (
          <JokeCard key={joke.id} joke={joke} />
        ))}
      </div>
    </div>
  );
};

export default JokeSearch;
