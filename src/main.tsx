import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Auth0Provider } from '@auth0/auth0-react';

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
    <Auth0Provider
    domain="dev-mkz11shkh1d0i0t4.us.auth0.com"
    clientId="bx3hhmmcjnznAFUBnU6mNYxwyGsz9hyk"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </Provider></Auth0Provider>
  </React.StrictMode>
);
