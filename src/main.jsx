import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>
);
