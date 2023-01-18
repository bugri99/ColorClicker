import { Color } from "./Color";
import { Effect, EffectType } from "./Effect";

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

//array of Color objects (hex code, monetary value, xp)
export const colors = [
  new Color("#FFFFFF", 10, 1), //white
  new Color("#00FF00", 25, 3), //green
  new Color("#0000FF", 50, 5), //blue
  new Color("#FF748C", 75, 10), //pink
  new Color("#800080", 90, 25), //purple
  new Color("#FFFF00", 120, 50), //yellow
  new Color("#FF0000", 150, 100), //red
];

//array of circles' movement directions (between 0 and 360 degrees)
export const directions = [];

for (let i = 0; i < 200; i++) {
  directions.push(getRandom(0, 360));
}

//array of circles' colors (a random color from the colors array)
//NEEDS REWORK
export const colorPool = [];
for (let i = 0; i < 200; i++) {
  colorPool.push(colors[getRandom(0, colors.length)]);
}

/**
 * id: identification number of a power-up
 * description: text that will be displayed on the button
 * price: cost of the power-up
 * effect: effect of the power-up
 * prerequisites: IDs of required power-ups to unlock the power-up
 * acquired: has the power-up been bought already
 */
export const powerUps = [
  {
    id: 0,
    description: "Farben-Wert +5%",
    price: 1500,
    effect: new Effect(EffectType.ColorMultiplier, 0.05),
    prerequisites: [],
    acquired: false,
  },
  {
    id: 1,
    description: "Farben-Wert +25%",
    price: 20000,
    effect: new Effect(EffectType.ColorMultiplier, 0.25),
    prerequisites: [0],
    acquired: false,
  },
  {
    id: 2,
    description: "Farben-Wert +50%",
    price: 2000000,
    effect: new Effect(EffectType.ColorMultiplier, 0.5),
    prerequisites: [1],
    acquired: false,
  },
  {
    id: 3,
    description: "Maschinen-Effizienz +5%",
    price: 4000,
    effect: new Effect(EffectType.MachineEffectiveness, 0.05),
    prerequisites: [],
    acquired: false,
  },
  {
    id: 4,
    description: "Maschinen-Effizienz +10%",
    price: 100000,
    effect: new Effect(EffectType.MachineEffectiveness, 0.1),
    prerequisites: [0, 1, 3],
    acquired: false,
  },
  {
    id: 5,
    description: "Maschinen-Effizienz +50%",
    price: 100000000,
    effect: new Effect(EffectType.MachineEffectiveness, 0.5),
    prerequisites: [4],
    acquired: false,
  },
  {
    id: 6,
    description: "Maschinen-Effizienz +100%",
    price: 100000000,
    effect: new Effect(EffectType.MachineEffectiveness, 1),
    prerequisites: [4],
    acquired: false,
  },
  {
    id: 7,
    description: "Maschinen-Effizienz 1000%",
    price: 100000000,
    effect: new Effect(EffectType.MachineEffectiveness, 10),
    prerequisites: [0, 1, 2, 3, 4, 5, 6],
    acquired: false,
  },
  {
    id: 8,
    description: "Farben-Wert +2000",
    price: 1000000000000,
    effect: new Effect(EffectType.MachineEffectiveness, 20),
    prerequisites: [0, 1, 2, 3, 4, 5, 6],
    acquired: false,
  },
];