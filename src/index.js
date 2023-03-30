/**
 * Index Page
 * @author Joseph Liao
 */

import React from "react";
import { createRoot } from "react-dom/client";
import "./css/stylesheet.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import App from "./App";

// Register react router
import { BrowserRouter } from "react-router-dom"; // New line

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
