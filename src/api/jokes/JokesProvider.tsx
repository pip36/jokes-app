import React, { createContext } from "react";
import { useJokeInfo } from "./useJokeInfo";

interface JokesContextState {
  categories: string[];
  totalJokes?: number;
}

export const JokesContext = createContext<JokesContextState>({
  categories: [],
});

const JokesProvider: React.FC = ({ children }) => {
  const { jokeInfoResponse } = useJokeInfo();

  return (
    <JokesContext.Provider
      value={{
        categories: jokeInfoResponse?.jokes.categories || [],
        totalJokes: jokeInfoResponse?.jokes.totalCount,
      }}
    >
      {children}
    </JokesContext.Provider>
  );
};

export default JokesProvider;
