# Joke App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### `npm start`

Runs the app in the development mode.

### `npm t`

Run tests in watch mode

## /mockServer

Contains code relating to MockServiceWorker. (initialized in setupTests.ts).
Test code runs against the server to simulate API responses.

(Note: The mock server is only active in the node environment for the jest tests. Running npm start will call the actual joke API)

## /src

### /api

Contains code for interacting with the joke API.

Main components are:

- Hooks wrapping "axios" calls to the API
- A JokesProvider to share data from "/info" endpoint globally (No need to keep the data fresh, once on load should be enough)
- Note: Redux felt like overkill so I did not include, but a redux store could potentially replace the "JokesProvider". The search results are probably not needed globally, so are not included in the joke context.
