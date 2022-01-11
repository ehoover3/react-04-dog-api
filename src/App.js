// react & router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// style sheets
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import AllBreeds from "./pages/AllBreeds";
import DogDetails from "./pages/DogDetails";
import PageNotFound from "./pages/PageNotFound";

// components
import NavigationBar from "./components/NavigationBar";

export default function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' exact element={<AllBreeds />} />
          <Route path='/DogDetails' element={<DogDetails />} />
          <Route component={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}
