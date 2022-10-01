document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const width = 10;
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  let nextRandom = 0;
  let timerId
  let score = 0

  // The tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const theTetrominos = [lTetromino, zTetromino, oTetromino, tTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * theTetrominos.length);
  let current = theTetrominos[random][0];

  // draw the first rotation in the first tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }

  // undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
    });
  }

  // make the tetromino move down every second
  //timerId = setInterval(movedown, 1000);

  // assign function to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);

  // move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.contains('taken'));
      // start new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominos.length);
      current = theTetrominos[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
    }
  }

  // move tetromino left, unless is at edge
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
  }

  // move right
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some((index => squares[currentPosition + idex].classList.contains('taken'))) {
      currentPosition -= 1;
    }

    draw();
  }

  // rotate the tetromino
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominos[random][currentRotation];
    draw();
  }

  // show up-next tetromino in mini-grid display
 const displaySquare = document.querySelectorAll('.mini-grid');
 const displayWidth = 4;
 const displayIndex = 0;

// the Tetromino without rotations
 const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTet
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTet
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTet
  [0, 1, displayWidth, displayWidth + 1], // oTet
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iTet

];

// display shape in mini grid
function displayShape() {
  displaySquare.forEach((square) => {
    square.classList.remove('tetromino');
  });
  upNextTetrominoes[nextRandom].forEach((index) => {
    displaySquare[displayIndex + index].classList.add('tetromino');
  });
}

//add functionality to the button
startBtn.addEventListener('click',() =>{
  if(timerId){
    clearInterval(timerId)
    timerId = null
  } else {
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random()*theTetrominos.lenth)
    displayShape()
  }

})

//add score
function addScore() {
  for(let i =0; i<199; i+=width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if(row.every(index => squares[index].classList.contains('taken'))) {
      score +=10
      scoreDisplay.innerHTML = score
      row.forEach(index => {
        squares[index].classList.remove('taken')
      })
      const squaresRemoved = squares.splice(i, width)
      squares = squaresRemoved.concat(squares)
      squares.forEach(cell => grid.appendChild(cell))
    }
  }
}







});


