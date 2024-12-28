import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./app/store";
import { Provider } from "react-redux";

// Initialize QueryClient only once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
