class Item {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.positionX = this.getRandomNumber(0, window.innerWidth);
        this.positionY = this.getRandomNumber(0, window.innerHeight);

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

    eat() {
        this.domElement.remove();

    }

}



class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.positionX = 0;
        this.positionY = 0;
        this.position = [{ positionX: 0, positionY: 0 }];
        this.createDomElement();
        this.direction = null;
        this.isMoving = false;
        this.moveInterval = null;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.item = new Item();



    }

    moveLeft() {

        this.direction = "left";
        this.startMoving();

    }
    moveRight() {

        this.direction = "right";
        this.startMoving();

    }
    moveUp() {
        this.direction = "up";
        this.startMoving();
    }
    moveDown() {
        this.direction = "down";
        this.startMoving();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.setAttribute("id", "player0");
        this.domElement.classList.add("player");
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.position[0].positionX + "px";
        this.domElement.style.bottom = this.position[0].positionY + "px";
        const board = document.querySelector("#board");
        board.appendChild(this.domElement);


    }
    startMoving() {
        if (!this.isMoving) {
            this.isMoving = true;
            this.moveInterval = setInterval(() => {
                if (this.direction === "left") {
                    for (let i = this.position.length - 1; i > 0; i--) {
                        this.position[i].positionX = this.position[i - 1].positionX;
                        this.position[i].positionY = this.position[i - 1].positionY;
                    }

                    this.position[0].positionX -= 40;
                } else if (this.direction === "right") {
                    for (let i = this.position.length - 1; i > 0; i--) {
                        this.position[i].positionX = this.position[i - 1].positionX;
                        this.position[i].positionY = this.position[i - 1].positionY;
                    }
                    this.position[0].positionX += 40;

                } else if (this.direction === "up") {
                    for (let i = this.position.length - 1; i > 0; i--) {
                        this.position[i].positionX = this.position[i - 1].positionX;
                        this.position[i].positionY = this.position[i - 1].positionY;
                    }
                    this.position[0].positionY += 40;
                }
                else if (this.direction === "down") {
                    for (let i = this.position.length - 1; i > 0; i--) {
                        this.position[i].positionX = this.position[i - 1].positionX;
                        this.position[i].positionY = this.position[i - 1].positionY;
                    }
                    this.position[0].positionY -= 40;
                }

                for (let i = 0; i < this.position.length; i++) {
                    const body = document.querySelector("#player" + i);

                    body.style.left = this.position[i].positionX + "px";
                    body.style.bottom = this.position[i].positionY + "px";
                }
                //todo: Koerperbewegung hinzufuegen.
                /* this.domElement.style.left = this.position[0].positionX + "px";
                 this.domElement.style.bottom = this.position[0].positionY + "px";*/
                this.detectCollision();




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

    detectCollision() {
        if (this.position[0].positionX < this.item.positionX + this.item.width &&
            this.position[0].positionX + this.width > this.item.positionX &&
            this.position[0].positionY < this.item.positionY + this.item.height &&
            this.position[0].positionY + this.height > this.item.positionY) {

            this.growup();
            this.item.eat();
            this.item = new Item();
        }
    }
    growup() {
        const body = document.createElement("div");
        body.setAttribute("id", "player" + this.position.length);
        body.classList.add("player");
        body.style.width = this.width + "px";
        body.style.height = this.height + "px";
        body.style.left = this.item.positionX + "px";
        body.style.bottom = this.item.positionY + "px";
        const board = document.querySelector("#board");
        board.appendChild(body);
        switch (this.direction) {
            case "up":
                console.log(this.direction)
                this.position.push({
                    positionX: this.item.positionX,
                    positionY: this.item.positionY + 200,
                })

                break;
            case "down":
                console.log(this.direction)
                this.position.push({
                    positionX: this.item.positionX,
                    positionY: this.item.positionY - 200
                })
                break;
            case "right":
                console.log(this.direction)
                this.position.push({
                    positionX: this.item.positionX + 200,
                    positionY: this.item.positionY
                })
                break;
            case "left":
                console.log(this.direction)
                this.position.push({
                    positionX: this.item.positionX - 200,
                    positionY: this.item.positionY
                })
                break;
            default:
                console.log("error" + this.direction)
                this.position.push({
                    positionX: this.item.positionX,
                    positionY: this.item.positionY
                })
                break;
        }
        console.log(this.position)
    }


}




const player = new Player();

document.addEventListener("keydown", (event) => {

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





