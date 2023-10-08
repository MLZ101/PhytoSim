import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

import audio from "../../assets/soundEffects/s2.mp3";

const HomePage = () => {

  const hoverSound = new Audio(audio);

  const [showSelect, setShowSelect] = useState(false);
  const navigate = useNavigate();

  const updateSelect = () => {
    setShowSelect(!showSelect);
  };

  const handleSelection = (option) => {
    if (option !== null) {
      navigate("/simulation", { state: { option: { option } } });
    }
  };

  const numberOfDots = 15;

  const dots = Array.from({ length: numberOfDots }, (_, index) => (
    <div className="bubble" key={index}>
      <span className="dot"></span>
    </div>
  ));



  return (
    <div className="wrapper">
      <section className="main-container">
        <h2>ProtoPulse Presents</h2>
        <h1 onClick={updateSelect} onMouseOver={()=>{hoverSound.play();}}>PhytoSim</h1>
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/light-e-treasure-3/up-arrow-12.png"
          alt="Up Arrow"
        />
        <p>Click to Start</p>

      </section>

      {showSelect && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close-button" onClick={updateSelect}>
                &times;
              </span>
              <h2>Select Your Ocean Settings</h2>
              <p>Note that this affects the rate in the simulation!</p>
            </div>
            <div className="selection">
              <img
                src="https://static.vecteezy.com/system/resources/previews/010/923/165/original/tropical-beach-cartoon-panorama-sunny-day-summer-vacation-on-the-sandy-coast-universal-background-packaging-and-postcard-illustration-flat-vector.jpg"
                onClick={() => {
                  handleSelection("1");
                }}
                onMouseOver={()=>{hoverSound.play();}}
                alt="Option 1"
              />
              <label id="label1">Near Shore, Less Depth, More Sunlight</label>
              <img
                src="https://img.freepik.com/premium-vector/ocean-night-moon-clouds_104785-496.jpg"
                onClick={() => {
                  handleSelection("2");
                }}
                onMouseOver={()=>{hoverSound.play();}}
                alt="Option 2"
              />
              <label>Far from Shore, More Depth, Less Sunlight</label>
            </div>
          </div>
        </div>
      )}

      {dots}
    </div>
  );
};

export default HomePage;
