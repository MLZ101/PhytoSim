import React, {useState} from "react";
import "./simulation.css";
import "../home/home.css";
import Bar from "../../components/bar/Bar";

import flush from "../../assets/soundEffects/s1.mp3";
import hoverSound from "../../assets/soundEffects/s2.mp3"

import phyto1 from "../../assets/phytos/phyto1.png";
import phyto2 from "../../assets/phytos/phyto3.png";
import phyto3 from "../../assets/phytos/phyto5.png";
import phyto4 from "../../assets/phytos/phyto6.png";
import phyto5 from "../../assets/phytos/phyto7.png";

import plant1 from "../../assets/corals/coral1.png";
import plant2 from "../../assets/corals/coral2.png";
import plant3 from "../../assets/corals/coral3.png";
import plant4 from "../../assets/corals/coral4.png";

import smallFish from "../../assets/smallfish.gif";
import zooplankton from "../../assets/zooplankton.png";
import deepFish from "../../assets/bigFish.gif";

import { useLocation } from "react-router-dom";






const SimulationPage = () => {

  const [showFish, setShowFish] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const audio1 = new Audio(flush);
  const audio2 = new Audio(hoverSound);

  const updateModal = () =>{
    setTimeout(
      () =>{
        setShowModal(false);
      }, 3000
    ) 
    audio1.play();
    setShowModal(true);
  }

  const updateShowInfo = () => {
    setShowInfo(true);
  }

const updateShowFish = () => {
  setShowFish(true);
}

  const location = useLocation();
  const receivedData = location.state;



  // I know this is more of a static way, marked for later to make it more dynamic and depending on detailed formulas 
  let phytoCounter = (receivedData.option.option == 1)? 15 : 7;
  let deepFishCounter = (receivedData.option.option==1)? 0: 2;
  let isOption1 = (receivedData.option.option == 1) ? true : false;
  const co2level = (receivedData.option.option == 1) ? "1rem" : "5rem";
  const biodiversityLevel = (receivedData.option.option == 1) ? "5rem": "2rem";
  const heatLevel = (receivedData.option.option == 1) ? "1rem" : "3rem";
  const phytoLevel = (receivedData.option.option == 1) ? "6rem" : "3rem";

  const phytoImages = [phyto1, phyto2, phyto3, phyto4, phyto5];
   
  const initialBelowSurfaceStyle = {
    height: !showFish ? '100vh' : 'auto'
  };



  const phytos = Array.from({ length: phytoCounter }, () => {
    
    const randomMargin = Math.floor(Math.random() * 90) + '%';
    const randomDuration = Math.floor(Math.random() * 10) + 15 + 's';
    const phytoAnimationStyle = {
    animation: `animate3 ${randomDuration} infinite`
  };
  const smallFishAnimationStyle = {
    animation: `animate4 ${randomDuration} infinite`
  };
    return (
      <div className="water-level">
        <img className="phyto-img" src={phytoImages[Math.floor(Math.random() * 5)]} style={{ ...phytoAnimationStyle, margin:"1rem", marginLeft: randomMargin }} />
        <img className="smallfish-img" src={smallFish} style={{...smallFishAnimationStyle, width:"6vh", height: "6vh", marginLeft: randomMargin}}/>
      </div>
    );
  });

  


  const zooplanktons = Array.from({ length: phytoCounter }, () => {
    const randomDuration = Math.floor(Math.random() * 10) + 5 + 's';
    const randomMargin = Math.floor(Math.random() * 70) + '%';
  
    const animationStyle = {
      animation: `animate5 ${randomDuration} infinite`,
      width: '3vh',
      height: '3vh',
      marginLeft: randomMargin
    };
  
    return (
      <div className="water-level">
        <img src={zooplankton} style={animationStyle} />
      </div>
    );
  });
  
  

  
  const bigFish = Array.from({ length: deepFishCounter }, () => {
    const randomDuration = Math.floor(Math.random() * 10) + 5 + 's';
    const randomMargin = Math.floor(Math.random() * 50) + '%';
  
    const animationStyle = {
      animation: `animate4 ${randomDuration} infinite`,
      width: '30vh',
      height: '30vh',
      marginLeft: randomMargin,
      marginTop:"10rem"
    };
  
    return (
      <div className="water-level" style={{marginTop:"5rem"}}>
        <img src={deepFish} style={animationStyle} />
      </div>
    );
  });

  
  
    

  
  
  

  return (
    <div className="main-div"> 

    {showInfo && (
      <div className="bars">
        <Bar level={co2level} color="red"/>
        <Bar level={biodiversityLevel} color="mediumseagreen"/>
        <Bar level={heatLevel} color="orange"/>
        <Bar level={phytoLevel} color="blue" />
      </div> )
    }


    <div className="above-surface">
        <button className="simulate-button" onClick={() => {updateShowFish(); updateShowInfo(); updateModal();} } onMouseOver={()=>{audio2.play();}}> Simulate</button>
        <div className="surface" id="wave1"></div>
        <div className="surface" id="wave2"></div>
        <div className="surface" id="wave3"></div>
    </div>      


    <div className="below-surface" style={initialBelowSurfaceStyle}>
      { showFish && ( <>
      {phytos}
      {zooplanktons}
      {bigFish}
      
      <div className="plants-container">
        
      <img src={plant1}/>
      <img src={plant2}/>
      
      { isOption1 && ( <>
        <img src={plant3}/>
        <img src={plant4}/>
        </> 
      )
      }
    </div>
     </> )}
    </div>

    {showModal && (
        <div className="modal">
          <div className="modal-content">
            PhytoPlankton Concentration: {(receivedData.option.option == 1)? " HIGH": " Medium"} <br/><br/><br/>
            CO2 Level decreased {(receivedData.option.option == 1)? " drastically!": " partially!"} <br/><br/><br/>
            Plants & Fish Concentration increased  {(receivedData.option.option == 1)? " drastically!": " partially!"} <br/> <br/><br/>
            Heat Levels decreased  {(receivedData.option.option == 1)? " drastically!": " partially!"}  <br/><br/><br/>
          </div>
        </div>
      )}


    

</div>
  );
};

export default SimulationPage;
