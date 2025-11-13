
import React, { useState, useEffect } from "react";
import Loader from "./Componets/Loader";
import Navbar from "./Componets/Navbar";
import Home from "./Componets/Home";
import About from "./Componets/About";
import Projects from "./Componets/Projects";
import Skills from "./Componets/Skills";
import Footer from "./Componets/Footer";
import { Routes, Route } from "react-router-dom";
import Quote from "./Componets/Quote";

import Extras from "./Componets/Extras";

export default function App() {
  const [showLoader, setShowLoader] = useState(true); // Initially true so loader shows on fresh load

  const handleLoaderFinish = () => setShowLoader(false);

  return (
    <>
      {showLoader ? (
        <Loader onFinish={handleLoaderFinish} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Quote />
                  <Projects />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <About />
                
                </>
              }
            />
            <Route
              path="/skills"
              element={
                <>
                  <Skills />
              
                </>
              }
            />
           <Route
          path="/extras"
              element={
                <>
                  <Extras />
                 
                </>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

