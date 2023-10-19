let game = document.querySelector(".game");
let cells = document.querySelectorAll(".cell");
let scoreEl = document.querySelector("#score");
let highScoreEl = document.querySelector("#highScore");
let cellsObj = [];
let score = 0;
for (let i=0; i<cells.length; i++) {cellsObj.push(0);}

function loadScore()
{
    highScoreEl.innerHTML = localStorage.getItem("highscore");
    if (highScoreEl.innerHTML == null)
    {
        highScoreEl.innerHTML = "0";
        localStorage.setItem("highscore", 0);
    }
}

loadScore();

let colors = {
    0: {background: "#CCC0B3", foreground: "#776E65"},
    2: {background: "#EEE4DA", foreground: "#776E65"},
    4: {background: "#EDE0C8", foreground: "#776E65"},
    8: {background: "#F2B179", foreground: "white"},
    16: {background: "#F59563", foreground: "white"},
    32: {background: "#F67C5F", foreground: "white"},
    64: {background: "#F65E3B", foreground: "white"},
    128: {background: "#EDCF72", foreground: "#776E65"},
    256: {background: "#EDCC62", foreground: "#776E65"},
    512: {background: "#EDC850", foreground: "#776E65"},
    1024: {background: "#3C3A32", foreground: "#776E65"},
    2048: {background: "#3C3A32", foreground: "#776E65"},
    4096: {background: "#3F3932", foreground: "#776E65"},
};

function updateBoard() {
    if (scoreEl.innerHTML !== score)
    {
        scoreEl.innerHTML = score;
        if (Number(highScoreEl.innerHTML) < score)
        {
            highScoreEl.innerHTML = score;
            localStorage.setItem("highscore", score);
        }

    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = cellsObj[i] === 0 ? "" : cellsObj[i];
        cells[i].style.backgroundColor = colors[cellsObj[i]].background;
        cells[i].style.color = colors[cellsObj[i]].foreground;
    }
}


function generateNewCell() {
    let emptyCellIndices = [];
    
    for (let i = 0; i < cellsObj.length; i++) {
        if (cellsObj[i] === 0) {
            emptyCellIndices.push(i);
        }
    }

    if (emptyCellIndices.length === 0) {
        // Handle game over condition here
        console.log("Game over!");
        return;
    }

    let randomIndex = Math.floor(Math.random() * emptyCellIndices.length);
    let cellGenerateIndex = emptyCellIndices[randomIndex];
    
    cellsObj[cellGenerateIndex] = 2;
    updateBoard();
}



generateNewCell();
generateNewCell();

function isIInEveryNthElement(arr, i, n) {
    for (let j = 0; j < arr.length; j += n) {
        if (arr[j] === i) {
            return true;
        }
    }
    return false;
}

let movedCells = false;
function moveCells(direction) {
    const gridSize = 4; // Assuming a 4x4 grid, change this if your grid size is different
    let anyCellsMoved = false;

    // Define movement vectors based on the direction
    const vectors = {
        up: [-1, 0],
        down: [1, 0],
        left: [0, -1],
        right: [0, 1],
    };

    // Iterate over each cell in the grid
    if (direction === "up") {
        for (let i = 0; i < cells.length; i++) {
            const cell = cellsObj[i];
            if (cell === 0) {
                continue;
            }
            let tempIndex = i;
            
            if (i < gridSize) {
                continue;
            }
            
            console.log(tempIndex - gridSize)
            //check if available empty space above
            while (tempIndex - gridSize >= 0) {
                if (cellsObj[tempIndex - gridSize] === 0) {
                    cellsObj[tempIndex - gridSize] = cell;
                    cellsObj[tempIndex] = 0;
                    tempIndex -= gridSize;
                    anyCellsMoved = true;
                } else if (cellsObj[tempIndex - gridSize] === cell) {
                    cellsObj[tempIndex - gridSize] *= 2;
                    cellsObj[tempIndex] = 0;
                    tempIndex -= gridSize;
                    score += cellsObj[tempIndex];
                    anyCellsMoved = true;
                } 
                else {
                    break;
                }
            }


            
        }
    }
    // Iterate over each cell in the grid
    if (direction === "down") {
        for (let i = cells.length; i >= 0; i--) {
            const cell = cellsObj[i];
            if (cell === 0) {
                continue;
            }
            let tempIndex = i;
            
            if (i >= gridSize*(gridSize-1)) {
                continue;
            }
            
            //check if available empty space above
            while (tempIndex + gridSize <= gridSize*gridSize) {
                console.log("sdhu");
                if (cellsObj[tempIndex + gridSize] === 0) {
                    cellsObj[tempIndex + gridSize] = cell;
                    cellsObj[tempIndex] = 0;
                    tempIndex += gridSize;
                    anyCellsMoved = true;
                } else if (cellsObj[tempIndex + gridSize] === cell) {
                    cellsObj[tempIndex + gridSize] *= 2;
                    cellsObj[tempIndex] = 0;
                    tempIndex += gridSize;
                    score += cellsObj[tempIndex];
                    anyCellsMoved = true;
                } 
                else {
                    break;
                }
            }


            
        }
    }
    // Iterate over each cell in the grid
    if (direction === "left") {
        let listOfIndexes = [];
        for (let i = 0; i < gridSize; i++)
        {
            for (let j = 0; j < gridSize; j++)
            {
                listOfIndexes.push(i+gridSize*j)
            }
        }
        for (let i in listOfIndexes) {
            const cell = cellsObj[i];
            if (cell === 0) {
                continue;
            }
            let tempIndex = i;
            
            if (i % gridSize === 0) {
                console.log("skipped");
                continue;
            }
            
            //check if available empty space to the left
            while (tempIndex % gridSize !== 0) {
                console.log("sdhu");
                if (cellsObj[tempIndex - 1] === 0) {
                    cellsObj[tempIndex - 1] = cell;
                    cellsObj[tempIndex] = 0;
                    tempIndex--;
                    anyCellsMoved = true;
                } else if (cellsObj[tempIndex - 1] === cell) {
                    cellsObj[tempIndex - 1] *= 2;
                    cellsObj[tempIndex] = 0;
                    tempIndex--;
                    score += cellsObj[tempIndex];
                    anyCellsMoved = true;
                } 
                else {
                    break;
                }
            }


            
        }
    }

    // Iterate over each cell in the grid
    if (direction === "right") {
        let listOfIndexes = [];
        for (let i = gridSize; i > 0; i--)
        {
            for (let j = 0; j < gridSize; j++)
            {
                listOfIndexes.push(i-1+gridSize*j)
            }
        }
        console.log(listOfIndexes);
        for (let i of listOfIndexes) {
            const cell = cellsObj[i];
            if (cell === 0) {
                continue;
            }
            let tempIndex = i;
            
            if ((i+1) % gridSize === 0) {
                console.log("skipped");
                continue;
            }
            
            //check if available empty space to the left
            while ((tempIndex+1) % gridSize !== 0) {
                console.log("sdhu");
                console.log(tempIndex, Number(tempIndex)+1, cellsObj[Number(tempIndex)+1]);
                if (cellsObj[Number(tempIndex) + 1] === 0) {
                    console.log("mvdright");
                    cellsObj[tempIndex + 1] = cell;
                    cellsObj[tempIndex] = 0;
                    tempIndex++;
                    anyCellsMoved = true;
                } else if (cellsObj[Number(tempIndex) + 1] === cell) {
                    cellsObj[tempIndex + 1] *= 2;
                    cellsObj[tempIndex] = 0;
                    tempIndex++;
                    score += cellsObj[tempIndex];
                    anyCellsMoved = true;
                } 
                else {
                    break;
                }
            }


            
        }
    }

    if (!movedCells) {
        movedCells = true;
        moveCells(direction);
    } else {
        movedCells = false;
        updateBoard();
        return;
    }

    if (anyCellsMoved)
    {
        generateNewCell();
    }
}

let keydownCheck = false;

document.addEventListener("keydown", (e) => {
    if (keydownCheck) return;
    keydownCheck = true;
    if (e.key === "ArrowUp") {
        moveCells("up");
    }
    if (e.key === "ArrowDown") {
        moveCells("down");
    }
    if (e.key === "ArrowLeft") {
        moveCells("left");
    }
    if (e.key === "ArrowRight") {
        moveCells("right");
    }
})

document.addEventListener("keyup", (e) => {
    keydownCheck = false
})

// Remove animation classes when the animation ends
cells.forEach((cell) => {
    cell.addEventListener("animationend", () => {
      cell.classList.remove("slide-up", "slide-down", "slide-left", "slide-right");
    });
  });
  

// Function to update cell size based on the game container size
function updateCellSize() {
    console.log("resize")
    const cellSize = (game.offsetWidth / 4) - 20; // Adjust the margin as needed

    cells.forEach(cell => {
        cell.style.borderRadius = cellSize / 5 + 'px';
        cell.style.fontSize = (cellSize * 0.4) + 'px'; // Adjust the font size as needed
    });

    game.style.gap = cellSize/8 + 'px';
    game.style.padding = cellSize/8 + 'px';
    game.style.borderRadius = cellSize / 5 + 'px';

    const score = document.querySelector('.score');
    score.style.fontSize = (cellSize * 0.3) + 'px';
    const highscore = document.querySelector('.highScore');
    highscore.style.fontSize = (cellSize * 0.3) + 'px';
    const restartButton = document.querySelector('.restartButton');
    restartButton.style.fontSize = (cellSize * 0.3) + 'px';
    restartButton.style.borderRadius = cellSize / 5 + 'px';
}

// Update cell size initially and on window resize
window.addEventListener('resize', updateCellSize);
window.addEventListener('load', updateCellSize);
document.querySelector('.restartButton').addEventListener('click', () => {
    cells.forEach(cell => {
        cell.className = 'cell';
        cell.innerHTML = '';
    });
    cellsObj = [];
    for (let i=0; i<cells.length; i++) {cellsObj.push(0);}
    generateNewCell();
    generateNewCell();
    score = 0;
    updateBoard();
})
