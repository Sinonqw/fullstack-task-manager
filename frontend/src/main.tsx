import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-52dgj6k60e36lsp4.us.auth0.com"
    clientId="t39g63ftxaWbQ5UhhCiRLDYwJeF0DEXT"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    ,
  </Auth0Provider>,
);
