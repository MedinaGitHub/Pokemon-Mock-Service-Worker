import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Create a server with the request handlers
export const server = setupServer(...handlers);
