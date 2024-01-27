class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 0;
        this.createDomElement();

    }

    moveLeft() {
        console.log("moving left");
        this.positionX -= 10;
        this.domElement.style.left = this.positionX + "vw";

    }
    moveRight() {
        console.log("moving right");
        this.positionX += 10;

        this.domElement.style.left = this.positionX + "vw";

    }
    moveUp() {
        this.positionY += 10;
        this.domElement.style.bottom = this.positionY + "vw";
    }
    moveDown() {
        this.positionY -= 10;
        this.domElement.style.bottom = this.positionY + "vw";
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.setAttribute("id", "player");
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        const board = document.querySelector("#board");
        board.appendChild(this.domElement);


    }



}
const player = new Player();
document.addEventListener("keydown", (event) => {
    console.log(event);
    switch (event.code) {
        case "ArrowLeft":
            player.moveLeft();
            break;
        case "ArrowRight":
            player.moveRight();
            break;
        case "ArrowUp":
            player.moveUp();
            break;
        case "ArrowDown":
            player.moveDown();

    }

})

