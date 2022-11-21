class Color {
    static Green = new Color('Green');
    static Blue = new Color('Blue');
    static Yellow = new Color('Yellow');
    static Red = new Color('Red');
    static White = new Color('White');
    static Pink = new Color('Pink');
    static Orange = new Color('Orange');
  
    constructor(name) {
      this.name = name;
    }
    toString() {
      return `Color.${this.name}`;
    }
  }