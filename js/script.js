//game constans and varibles
//firstly write the constants
let inputDir = {x : 0, y :0}; //snake will be initialized to rest when games start
const foodSound = new Audio('../music/food.mp3')
const gameOverSound = new Audio('../music/gameover.mp3')
const moveSound = new Audio('../music/move.mp3');
const musicSoudn = new Audio('../music/music.mp3')
const scoreBox = document.getElementById('scoreBox')
let board = document.getElementById('board');
let hiScoreElement = document.getElementById('highScore');
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:10},//initial position
]

let food = { x: 13, y: 2}



//Game Functions
function main(ctime){    
    window.requestAnimationFrame(main);

    if((ctime - lastPaintTime)/1000  < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake) {
    
    for(let i = 1; i <snakeArr.length; i++){
        //if you bump into yourself
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
        //if you bump into wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
            return true;
        }
    }
}

function gameEngine(){
    //part 1 : updating the snake vairbale using array
    if(isCollide(snakeArr)){
        score = 0;
        gameOverSound.play();
        musicSoudn.pause();
        inputDir = {x : 0, y:0};
        alert("Game Over! Press any key to continue");
        snakeArr = [ {x:13, y:10}];
        musicSoudn.play();
    }

    //if you have eatern the food, increment the score and regerneate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play()
        score += 1;

        scoreBox.innerHTML = "Score :" + score
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b-a)*Math.random()),  
            y: Math.round(a + (b-a)*Math.random())
        }
    }

    //Moving the snake
    for(let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: Display the snake and food

    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    })

    //Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)
    
}


//game loop is the heart of any game which constantly repaints the screen
// we will use requestAnimationFrame

//main logic starts here
musicSoudn.play();


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0 , y: 1} //start the game
    moveSound.play();

    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp')
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowULeft')
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});