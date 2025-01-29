import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import App from "./App.tsx";
import { GlobalStyles } from "./assets/styles/GlobalStyles.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <GlobalStyles />
      <App />
    </Provider>
  </StrictMode>
);
