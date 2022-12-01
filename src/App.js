import { useState } from "react";
import "./App.css";

function App() {
  document.body.style.overflow = "hidden";
  const [count, setCount] = useState(0);
  let ctr = 0;
  const [multiplier, setMultiplier] = useState(1);
  const [machines, setMachines] = useState(0);
  const [income, setIncome] = useState(0);

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function renderCircle(xPos, yPos, direction, value, color) {
    const id = (ctr++).toString();
    function handleClick() {
      setCount((prev) => prev + value * multiplier);
      const el = document.getElementById(id);
      el.style.display = "none";
    }
    return (
      <svg
        className="circle"
        id={id}
        onClick={handleClick}
        style={{
          left: `calc(${xPos}vw - 2vw)`,
          top: `calc(${yPos}vw - 2vw)`,
          width: '3vw',
          height: '3vw',
          position: "absolute",
        }}
      >
        <circle cx={"50%"} cy={"50%"} r={"50%"} fill={color} />
      </svg>
    );
  }
  const colors = [
    new Color("white", 10),
    new Color("green", 25),
    new Color("blue", 50),
    new Color("pink", 75),
    new Color("purple", 100),
    new Color("yellow", 150),
    new Color("red", 300),
  ];

  function renderCircles(buffAmount) {
    const circleBuffer = [];
    for (let i = 0; i < buffAmount; i++) {
      let color = colors[Math.floor(Math.random() * colors.length)];
      let circle = renderCircle(
        getRandom(3, 53),
        getRandom(3, 40),
        getRandom(0, 360),
        color.points,
        color.name
      );
      circleBuffer.push(circle);
    }
    return circleBuffer;
  }
  const [circles] = useState(renderCircles(15));


  function renderMultiplierPlusButton() {
    function handleClick() {
      setMultiplier((prev) => prev + 1);
    }
    return (
      <div className="Plus-ButtonMtp" onClick={handleClick}/>
    );
  }
  function renderMachinesPlusButton() {
    function handleClick() {
      setMachines((prev) => prev + 1);
    }
    return (
      <div className="Plus-ButtonMch" onClick={handleClick}/>
    );
  }
  function renderPowerUp(row, col) {
    function handleClick() {
      //TODO
    }
    return (
      <div className="PowerUp" onClick={handleClick}  style={{
        left: `calc(${1 + col * 13.5}vw)`,
        top: `calc(${30.5 + row * 13}vh)`,
        width: '16vw',
        height: '11.5vh',
        position: "absolute",
      }}/>
    );
  }
  function renderPowerUps() {
    const powerUpBuffer = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        let powerUp = renderPowerUp(j, i);
        powerUpBuffer.push(powerUp);
      }  
  }
  return powerUpBuffer;
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="App-currency">{count} $</div>
        <div className="App-upgrades">
          <div className="Upgrades-colorValue">
            Farben-Wert:
          </div>
          <div className="Upgrades-multiplier">x{multiplier}</div>
          {renderMultiplierPlusButton()}
          <div className="Upgrades-machines">
            Maschinen:
          </div>
          <div className="Upgrades-machineAmount">{machines}</div>
          {renderMachinesPlusButton()}
          <div className="Upgrades-income">
            Einkommen:
          </div>
          <div className="Upgrades-incomeAmount">{income} $/s</div>
          <div className="Upgrades-splitBar"/>
          <div className="Upgrades-powerUps">{renderPowerUps()}</div>
        </div>
        <div className="App-game">{circles}</div>
       

      </header>
    </div>
  );
}

export default App;

class Color {
  name;
  points;

  constructor(name, points) {
    this.name = name;
    this.points = points;
  }

  static get name() {
    return this.name;
  }

  static get points() {
    return this.points;
  }
}
