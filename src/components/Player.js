class Player {
    name;
    money;
    constructor(name) {
        this.name = name;
        this.money = 0;
    }

    static get money() {
        return this.money;
    }
    addMoney(amount) {
        this.money += amount;
    }
}