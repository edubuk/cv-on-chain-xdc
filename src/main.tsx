import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CvFomContextProvider } from "./context/CvForm.context.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import {Toaster} from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";
import process from "process";
window.Buffer = Buffer;
window.process = process;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CvFomContextProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
                <App />
      </BrowserRouter>
      </CvFomContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
export const API_BASE_URL = import.meta.env.VITE_BACKNED_URL;
