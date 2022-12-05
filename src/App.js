import { useEffect, useState } from "react";
import { powerUps, directions, colorPool } from "./components/Data";
import { EffectType } from "./components/Effect";
import { motion } from "framer-motion";
import "./App.css";
/**
 * -------------------------------------------------------------------------------------
 * Useful links:
 *
 * Framer motion library(used for animations):
 * @link https://www.framer.com/docs/
 *
 * XP and Level Formula(I used the X: 0.07, Y: 2 example)
 * @link https://blog.jakelee.co.uk/converting-levels-into-xp-vice-versa/
 *
 * Framer-Motion tutorial:
 * @link https://youtu.be/GOuwOI-WSkE
 *
 * Hooks tutorial:
 * @link https://www.youtube.com/watch?v=TNhaISOUy6Q
 * -------------------------------------------------------------------------------------
 * Things To-Do:
 * - level provides no benefits currently
 * - more power-ups
 * - balancing of the power-up prices and effects
 * - currently, every color has the same probability of appearance, so color rarity based on level maybe?
 * - center the text of a power-up description if only one line long
 * - save and load game data (currently everything starts from the beginning on site refresh)
 * -------------------------------------------------------------------------------------
 * Known Issues:
 * -  circle can be clicked outside of the game box, currently there is
 *    a svg with a hole where the game window is located and the normal background outside of it (see circle-boundary-background.svg).
 *    In ".App-circleboundary" css class the "pointer-events" prop is set to "none" so the component is
 *    ignored completely when clicked, all it does is cover the circles where they 
 *    shouldn't be, the circles are still there though (perhaps a different solution needed)
 */
function App() {
  document.body.style.overflow = "hidden";
  let ctr = 0; //counter for components' unique IDs

  /**
   * -----------------------------------------------------------------------------------
   *  useState variables
   * to change a value use the setter function
   *
   * overwriting goes like this:
   *
   * setFoo(value);
   *
   * updating based on previous value:
   *
   * setFoo((prev) => prev + value);
   *
   * NOTE: Don't use setters of useStates inside of any render code parts!
   *       Do it only inside events like onClick. Otherwise it will keep updating
   *       the value infinitely which will make the program crash.
   *
   * -----------------------------------------------------------------------------------
   */
  const [moneyCount, setMoneyCount] = useState(0); //money balance (initial 0)
  const [multiplier, setMultiplier] = useState(1); //color value multiplier (initial 1)
  const [machines, setMachines] = useState(0); //machines owned (inital 0)
  const [growthPerMachine, setGrowthPerMachine] = useState(1.1); //income growth factor per machine owned (initial 1.1)
  const [income, setIncome] = useState(100); //income amount per second (initial 100)
  const [level, setLevel] = useState(0); //player level (initial 0)
  const [xp, setXp] = useState(0); //player xp (initial 0)
  const [nextLvXpRequired, setNextLvXpRequired] = useState(
    Math.floor(Math.pow((level + 1) / 0.07, 2))
  ); //xp required to level up (initial 204, see useful links on top for the formula explanation)
  const [nextMachinePrice, setNextMachinePrice] = useState(1500); //price of the next machine (initial 1500)
  const [nextMultiplierPrice, setNextMultiplierPrice] = useState(2000); //price of the next color multiplier upgrade (initial 2000)

  /**
   * This function generates a random number between min(incl.) and max(excl.)
   *
   * @param {number} min minimum value (inclusive)
   * @param {number} max maximum value (exclusive)
   * @returns random number in given range
   */
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Starts counting from 0 to Infinity in 100ms time intervals based on income useState
   *
   * @returns Money counter display
   */
  const MoneyCounter = ({ start = 0, end = Infinity }) => {
    const updateMoneyCounter = () => {
      setTimeout(
        () => setMoneyCount((prev) => prev + Math.floor(income / 10)),
        100
      );
    };
    useEffect(() => {
      let isMounted = true;
      if (isMounted) {
        updateMoneyCounter();
      }

      return () => (isMounted = false);
    }, [end, start]);
    return <div className="App-currency">{moneyCount} $</div>;
  };

  /**
   * This function takes a color hex value and a luminance value and converts it
   * to a darker or brighter color
   * (used to generate gradients for the circles in getGradient() function)
   *
   * @param {hex} hex hex code of a color
   * @param {number} lum luminance value (negative makes the color darker, positive brighter)
   * @returns hex value of the modified color
   */
  function changeColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    var result = "#",
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      result += ("00" + c).substr(c.length);
    }

    return result;
  }

  /**
   * Takes a color and makes a radial gradient out of it
   *
   * @param {hex} color hex code of the color
   * @returns radial gradient component
   */
  function getGradient(color) {
    return (
      <radialGradient id={color}>
        <stop offset="0%" stop-color={color} />
        <stop offset="100%" stop-color={changeColorLuminance(color, -0.35)} />
      </radialGradient>
    );
  }

  /**
   * Renders a circle
   * @param {number} index index of the color and the direction of the circle (stored in colorPool- and directions- arrays)
   * @returns
   */
  function renderCircle(index) {
    const id = (ctr++).toString(); //unique ID of the component
    const color = colorPool[index]; //color of the circle in hex
    /**
     * This function determines what happens when a circle gets clicked.
     * On click it adds money, xp and disappears for 10 seconds to be reused later
     */
    function handleClick() {
      setMoneyCount((prev) => prev + color.points * multiplier);
      setXp((prev) => prev + color.xp);
      setLevel(Math.floor(0.07 * Math.sqrt(xp + color.xp)));
      setNextLvXpRequired(
        Math.floor(
          Math.pow((Math.floor(0.07 * Math.sqrt(xp + color.xp)) + 1) / 0.07, 2)
        )
      );
      const el = document.getElementById(id);
      el.style.display = "none"; //make the circle invisible
      setTimeout(() => {
        document.getElementById(id).style.display = "inline"; //make the circle visible again after 10 seconds
      }, 10000);
    }
    return (
      <motion.svg
        viewBox={"0 0 100 100"}
        className="circle"
        id={id}
        initial={{
          x: `${Math.cos(directions[index]) * 40}vw`,
          y: `${Math.sin(directions[index]) * 40 + 19}vw`,
        }}
        animate={{
          x: `${Math.cos(directions[index + 1]) * 40}vw`,
          y: `${Math.sin(directions[index + 1]) * 40 + 19}vw`,
        }}
        transition={{
          repeat: Infinity,
          duration: 7.5,
          repeatDelay: getRandom(1, 5000) / 100,
        }}
        onClick={handleClick}
        style={{
          width: "6vw",
          height: "6vw",
          position: "absolute",
        }}
      >
        <defs>{getGradient(color.name)}</defs>
        <circle cx={"50%"} cy={"50%"} r={"35%"} fill={`url(#${color.name})`} />
        <circle
          cx={"50%"}
          cy={"50%"}
          r={"60%"}
          fill={"black"}
          opacity={0.001}
        />
      </motion.svg>
    );
  }
  /**
   * Renders given amount of circles
   *
   * @param {number} buffAmount amount of circles to be rendered
   * @returns array of circle components
   */
  function renderCircles(buffAmount) {
    const circleBuffer = [];
    for (let i = 0; i < buffAmount; i++) {
      let circle = renderCircle(i);
      circleBuffer.push(circle);
    }
    return circleBuffer;
  }

  /**
   * Renders the Plus-Button for color value multiplier
   *
   * @returns Plus-Button component
   */
  function renderMultiplierPlusButton() {
    /**
     * This function checks if the player has enough money
     * and if true takes the required amount of money and increases
     * the color value multiplier by 1
     * It also increases the price of next multiplier upgrade by 40%
     */
    function handleClick() {
      if (moneyCount >= nextMultiplierPrice) {
        setMoneyCount((prev) => prev - nextMultiplierPrice);
        setMultiplier((prev) => prev + 1);
        setNextMultiplierPrice((prev) => Math.floor(prev * 1.4));
      }
    }
    return (
      <div onClick={handleClick}>
        <motion.svg
          className="Plus-ButtonMtp"
          style={{
            filter: `${
              moneyCount >= nextMultiplierPrice
                ? "grayscale(0%)"
                : "grayscale(100%)"
            }`,
          }}
        />
        <motion.svg
          className="Plus-ButtonMtpH"
          style={{
            filter: `${
              moneyCount >= nextMultiplierPrice
                ? "grayscale(0%)"
                : "grayscale(100%)"
            }`,
          }}
          opacity={0}
          whileHover={{ opacity: 1 }}
        />
        <div
          className="Plus-ButtonMtp-price"
          style={{
            color: `${
              moneyCount >= nextMultiplierPrice ? "greenyellow" : "red"
            }`,
          }}
        >
          {nextMultiplierPrice} $
        </div>
      </div>
    );
  }

  /**
   * Renders the Plus-Button for the machines amount
   *
   * @returns Plus-Button component
   */
  function renderMachinesPlusButton() {
    /**
     * This function checks onClick if the player has enough money
     * and if true takes the required amount of money, increases
     * the machine amount by 1 and recalculates the automatic income amount
     * It also increases the price of next multiplier upgrade by 60%
     */
    function handleClick() {
      if (moneyCount >= nextMachinePrice) {
        setMoneyCount((prev) => prev - nextMachinePrice);
        setMachines((prev) => prev + 1);
        setIncome(Math.floor(100 * Math.pow(growthPerMachine, machines + 1)));
        setNextMachinePrice((prev) => Math.floor(prev * 1.6));
      }
    }
    return (
      <div onClick={handleClick}>
        <motion.svg
          className="Plus-ButtonMch"
          style={{
            filter: `${
              moneyCount >= nextMachinePrice
                ? "grayscale(0%)"
                : "grayscale(100%)"
            }`,
          }}
        />
        <motion.svg
          className="Plus-ButtonMchH"
          style={{
            filter: `${
              moneyCount >= nextMachinePrice
                ? "grayscale(0%)"
                : "grayscale(100%)"
            }`,
          }}
          opacity={0}
          whileHover={{ opacity: 1 }}
        />
        <div
          className="Plus-ButtonMch-price"
          style={{
            color: `${moneyCount >= nextMachinePrice ? "greenyellow" : "red"}`,
          }}
        >
          {nextMachinePrice} $
        </div>
      </div>
    );
  }
  /**
   * This function takes the index of a powerUp and checks
   * if all the requirements have been met to unlock the power-up
   *
   * @param {number} index index in the powerUp array
   * @returns true, if requirements are met, otherwise false
   */
  let hasMetPrerequisites = (index) => {
    if (powerUps[index].prerequisites.length === 0) {
      return true;
    }
    for (let i = 0; i < powerUps[index].prerequisites.length; i++) {
      if (powerUps[powerUps[index].prerequisites[i]].acquired === false) {
        return false;
      }
    }
    return true;
  };
  //initial array of available power-ups
  const avlPwps = [];
  for (let i = 0; i < powerUps.length; i++) {
    if (powerUps[i].acquired === false && hasMetPrerequisites(i) === true) {
      avlPwps.push(powerUps[i]);
    }
  }
  const [availablePowerUps, setAvailablePowerUps] = useState(avlPwps); //useState for available power-ups

  /**
   * Renders an available power-up passed as argument
   *
   * @param {object} powerUp power-up to be rendered
   * @returns power-up component
   */
  function renderPowerUp(powerUp) {
    const id = (ctr++).toString(); //unique ID of the component
    /**
     * This function checks on click if the player
     * has enough money to acquire a power-up,
     * if yes sets the clicked power-up's acquired value to true
     * updates the array with available power-ups
     * and takes the required amount of money
     * from the player's balance
     *
     * NOTE: Every new EffectType needs its own case inside this function
     */
    function handleClick() {
      if (moneyCount >= powerUp.price) {
        const el = document.getElementById(id);
        powerUps.find((el) => el.id === powerUp.id).acquired = true;
        const arr = [];
        for (let i = 0; i < powerUps.length; i++) {
          if (
            powerUps[i].acquired === false &&
            hasMetPrerequisites(i) === true
          ) {
            arr.push(powerUps[i]);
          }
        }
        setAvailablePowerUps(arr);
        setMoneyCount((prev) => prev - powerUp.price);
        //case MachineEffectiveness:
        if (powerUp.effect.type === EffectType.MachineEffectiveness) {
          setGrowthPerMachine(
            (prev) => Math.round((prev + powerUp.effect.value) * 100) / 100
          );
          setIncome(
            Math.floor(
              100 * Math.pow(growthPerMachine + powerUp.effect.value, machines)
            )
          );
          //case ColorMultiplier
        } else if (powerUp.effect.type === EffectType.ColorMultiplier) {
          setMultiplier((prev) => prev + powerUp.effect.value);
        }
      }
    }
    return (
      <div
        className="PowerUp"
        id={id}
        onClick={handleClick}
        style={{
          left: `calc(${
            2 + 49 * (availablePowerUps.indexOf(powerUp) % 2 === 0 ? 0 : 1)
          }%)`,
          top: `calc(${
            36 +
            15.5 *
              (availablePowerUps.indexOf(powerUp) % 2 === 0
                ? availablePowerUps.indexOf(powerUp) === 0
                  ? 0
                  : availablePowerUps.indexOf(powerUp) / 2
                : (availablePowerUps.indexOf(powerUp) - 1) / 2)
          }%)`,
          width: "47%",
          height: "14.2%",
          position: "absolute",
        }}
      >
        <div className="PowerUp-description">{powerUp.description}</div>

        <div
          className="PowerUp-price"
          style={{
            color: `${moneyCount >= powerUp.price ? "greenyellow" : "red"}`,
          }}
        >
          {powerUp.price} $
        </div>
      </div>
    );
  }

  /**
   * Renders all power-ups from the availablePowerUps useState variable
   *
   * @returns array of power-up components
   */
  function renderPowerUps() {
    const powerUpBuffer = [];
    for (let i = 0; i < availablePowerUps.length; i++) {
      let powerUp = renderPowerUp(availablePowerUps[i]);
      powerUpBuffer.push(powerUp);
      ctr++;
    }

    return powerUpBuffer;
  }

  /**
   * Renders the xp-bar
   *
   * @returns xp-bar component
   */
  function renderXPBar() {
    return (
      <svg style={{ overflow: "visible" }}>
        <rect width="20vw" height="2.5vw" rx="30" fill="rgb(43, 28, 51)" />
        <rect
          width={`${20 * (xp / nextLvXpRequired)}vw`}
          height="2.5vw"
          rx="30"
          fill="white"
          opacity={0.7}
        />
        <rect
          width="20vw"
          height="2.5vw"
          rx="30"
          fill="transparent"
          stroke="rgb(61, 42, 74)"
          stroke-width="0.5vw"
        />
      </svg>
    );
  }
  //Return statement of the entire App-function
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-game">{renderCircles(200)}</div>

        <div className="App-circleboundary"></div>
        <MoneyCounter />
        <div className="App-upgrades">
          <div className="Upgrades-colorValue">Farben-Wert:</div>
          <div className="Upgrades-multiplier">x{multiplier}</div>
          {renderMultiplierPlusButton()}
          <div className="Upgrades-machines">Maschinen:</div>
          <div className="Upgrades-machineAmount">{machines}</div>
          {renderMachinesPlusButton()}
          <div className="Upgrades-income">Einkommen:</div>
          <div className="Upgrades-incomeAmount">{income} $</div>
          <div className="Upgrades-splitBar" />
          <div className="Upgrades-powerUps">{renderPowerUps()}</div>
        </div>
        <div className="App-xpbar">
          {renderXPBar()}
          <div className="App-xpbartext">Lv: {level}</div>
          <div className="App-xpbarxp">
            {xp}/{nextLvXpRequired}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;