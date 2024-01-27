class Item {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.positionX = this.getRandomNumber(0,window.innerWidth);
        this.positionY = this.getRandomNumber(0,window.innerHeight);

        this.createDomElement();

    }

    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.setAttribute("id", "item");
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.positionX + "px";
        this.domElement.style.bottom = this.positionY + "px";
        const board = document.querySelector("#board");
        board.appendChild(this.domElement);


    }
}
const item = new Item();