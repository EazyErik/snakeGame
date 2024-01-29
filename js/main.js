class Item {
    constructor() {
        this.width = 40;
        this.height = 40;

        this.x = this.getRandomNumber(0, 1000);
        this.positionX = this.x - this.x % 40;
        this.y = this.getRandomNumber(0, 600);
        this.positionY = this.y - this.y % 40

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
        this.position = [{ positionX: 400, positionY: 400 }];
        this.createDomElement();
        this.direction = null;
        this.isMoving = false;
        this.moveInterval = null;
        this.item = new Item();



    }

    onLeftClick() {
        if (this.direction !== "right") {
            this.stopMoving();
            this.direction = "left";
            this.startMoving();
        }


    }
    onRightClick() {
        if (this.direction !== "left") {
            this.stopMoving();
            this.direction = "right";
            this.startMoving();
        }



    }
    onUpClick() {
        if (this.direction !== "down") {
            this.stopMoving();
            this.direction = "up";
            this.startMoving();
        }

    }
    onDownClick() {
        if (this.direction !== "up") {
            this.stopMoving();
            this.direction = "down";
            this.startMoving();
        }
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
                this.itemCollision();
                this.boarderCollision();
                this.havenBittenMe();




            }, 200);
        }
    }

    stopMoving() {
        clearInterval(this.moveInterval);
        this.isMoving = false;
    }


    itemCollision() {
        if (this.position[0].positionX < this.item.positionX + this.item.width &&
            this.position[0].positionX + this.width > this.item.positionX &&
            this.position[0].positionY < this.item.positionY + this.item.height &&
            this.position[0].positionY + this.height > this.item.positionY) {

            this.growup();
            this.item.eat();
            this.item = new Item();
        }
    }



    boarderCollision() {
        console.log(this.position[0].positionX)
        if (this.position[0].positionX <= -10 ||
            this.position[0].positionX >= 970 ||
            this.position[0].positionY <= -10 ||
            this.position[0].positionY >= 570) {

            this.stopMoving();
        }
    }
    havenBittenMe(){
        for(let i = 1; i < this.position.length; i++){
            if(this.position[0].positionX === this.position[i].positionX &&
                this.position[0].positionY === this.position[i].positionY){
                    console.log("AHHHH!")
                    window.location.href = './gameOver.html';
                }

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
                    positionY: this.item.positionY + 40,
                })

                break;
            case "down":
                console.log(this.direction)
                this.position.push({
                    positionX: this.item.positionX,
                    positionY: this.item.positionY - 40
                })
                break;
            case "right":
                console.log(this.direction)
                this.position.push({
                    positionX: this.item.positionX + 40,
                    positionY: this.item.positionY
                })
                break;
            case "left":
                console.log(this.direction)
                this.position.push({
                    positionX: this.item.positionX - 40,
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

/*document.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
            player.stopMoving();
            break;
    }
})*/

document.addEventListener("keydown", (event) => {
  
    switch (event.code) {
        case "ArrowLeft":
            player.onLeftClick();
            break;
        case "ArrowRight":
            player.onRightClick();
            break;
        case "ArrowUp":
            player.onUpClick();
            break;
        case "ArrowDown":
            player.onDownClick();
            break;
    }
})







