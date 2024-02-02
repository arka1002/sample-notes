import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/root/Home.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { runServer } from "./server/server.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// mock server setup
runServer();

// The router object
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

// react - query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
