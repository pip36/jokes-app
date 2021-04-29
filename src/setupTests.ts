import "@testing-library/jest-dom";
import { server } from "../mockServer/server";

/* Setup MockServiceWorker, making sure to clear state between tests */

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
