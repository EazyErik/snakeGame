class Player{
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 0;

        const domElement = document.createElement("div");
        domElement.setAttribute("id","player");
        const board = document.querySelector("#board");
        board.appendChild(domElement);
    }

    moveLeft(){
        this.positionX -= 10;
    }
    moveRight(){
        this.positionX += 10;
    }

    
}

const player = new Player();

