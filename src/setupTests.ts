import "@testing-library/jest-dom";

/* Setup MockServiceWorker, making sure to clear state between tests */
import { server } from "../mockServer/server.js";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
