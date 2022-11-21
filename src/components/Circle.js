import Color from './Color'

class Circle {
    color;
    xPos;
    yPos;
    direction;
    value;

    constructor() {
        this.color = Object.keys(Color)[Math.floor(Math.random() * Object.keys(Color).length)];  //starting color
        this.xPos = getRandom(42, 91);  //starting x-coordinate
        this.yPos = getRandom(7, 44);  //starting y-coordinate
        this.direction = getRandom(0, 360);  //movement direction
        this.value = 50; //money value of the circle, to change later
    }

    
    
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export default Circle;