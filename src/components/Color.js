/**
 * This class represents a color with its name(as hex), points(money value) and xp.
 */
 export class Color {
    name;
    points;
    xp;
  
    constructor(name, points, xp) {
      this.name = name;
      this.points = points;
      this.xp = xp;
    }
  }