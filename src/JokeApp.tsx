import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { JokesContext } from "./api/jokes/JokesProvider";
import JokeSearch from "./pages/jokes/components/JokeSearch";

const JokeApp = () => {
  const { totalJokes } = useContext(JokesContext);

  if (!totalJokes) return null;

  return (
    <div>
      <Typography variant="h1">Joke App</Typography>
      <Typography variant="h2">Now with {totalJokes} jokes!</Typography>
      <JokeSearch />
    </div>
  );
};

export default JokeApp;
