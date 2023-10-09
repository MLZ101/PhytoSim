import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/home";
import SimulationPage from "./pages/simulation/simulation";
import soundtrack from "./assets/ocean.mp3";
import "./App.css";

function App() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audio = new Audio(soundtrack);

  useEffect(() => {
    audio.loop = true;
    if (isSoundOn) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isSoundOn, audio]);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div className="App">
      <div className="sound-icon" onClick={toggleSound}>
        {isSoundOn ? "🔊" : "🔇"}
      </div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulation" element={<SimulationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
