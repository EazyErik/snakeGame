class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 0;
        this.createDomElement();
        this.direction = null;
        this.isMoving = false;
        this.moveInterval = null;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

    }

    moveLeft() {
        console.log("moving left");
        this.direction = "left";
        this.startMoving();

    }
    moveRight() {
        console.log("moving right");
        this.direction = "right";
        this.startMoving();

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
    startMoving() {
        if (!this.isMoving) {
            this.isMoving = true;
            this.moveInterval = setInterval(() => {
                if (this.direction === "left") {
                    this.positionX -= 1;
                } else if (this.direction === "right") {
                    this.positionX += 1;
                }

                this.domElement.style.left = this.positionX + "vw";
            }, 20);
        }
    }

    stopMoving() {
        clearInterval(this.moveInterval);
        this.isMoving = false;
    }
    handleKeyUp(event) {
        switch (event.code) {
            case "ArrowLeft":
            case "ArrowRight":
                this.stopMoving();
                break;
        }
    }
    handleKeyDown(event) {
        switch (event.code) {
            case "ArrowLeft":
                this.moveLeft();
                break;
            case "ArrowRight":
                this.moveRight();
                break;
        }
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


document.addEventListener("keyup", () => {
    player.stopMoving();
});


