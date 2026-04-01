import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CoinDetails from "./components/CoinDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
    </BrowserRouter>
);