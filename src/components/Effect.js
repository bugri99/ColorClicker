/**
 * EffectType enum
 * To create a new EffectType, 
 * add it to this object and add a case in App.js -> renderPowerUp() -> handleClick()
 */
 export const EffectType  = {
    ColorMultiplier: 'ColorMultiplier',
    MachineEffectiveness: 'MachineEffectiveness',
}

/**
 * This class represents an effect that a power-up provides.
 * It has a type (see above) and a value(see examples in Data.js -> powerUps).
 */
export class Effect {
    type;
    value;
  
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
  }