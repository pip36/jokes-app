import { Typography, Container } from "@material-ui/core";
import { useContext } from "react";
import { JokesContext } from "./api/jokes/JokesProvider";
import JokeSearch from "./pages/jokes/components/JokeSearch";

const JokeApp = () => {
  const { totalJokes } = useContext(JokesContext);

  if (!totalJokes) return null;

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h1">
        Joke App
      </Typography>
      <Typography align="center" variant="h3" component="h2">
        Now with {totalJokes} jokes!
      </Typography>
      <JokeSearch />
    </Container>
  );
};

export default JokeApp;
