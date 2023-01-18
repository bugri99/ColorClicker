/**
 * This class represents a color with its name(as hex), points(money value) and xp.
 */
 export class Color {
    hex;
    points;
    xp;
    colorname;
  
    constructor(hex, points, xp, colorname) {
      this.hex = hex;
      this.points = points;
      this.xp = xp;
      this.colorname = colorname;
    }
  }