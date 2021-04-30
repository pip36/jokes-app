import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import {
  isSingleJoke,
  SingleJoke,
  TwopartJoke,
} from "../../../api/jokes/types";

interface JokeCardProps {
  joke: SingleJoke | TwopartJoke;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" color="textSecondary" align="right">
          Category: {joke.category}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          color="textSecondary"
          align="right"
        >
          Type: {joke.type}
        </Typography>
        {isSingleJoke(joke) ? (
          <Typography variant="caption" component="p">
            {joke.joke}
          </Typography>
        ) : (
          <>
            <Typography gutterBottom component="p" variant="caption">
              {joke.setup}
            </Typography>
            <Typography variant="caption" component="p">
              {joke.delivery}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default JokeCard;
