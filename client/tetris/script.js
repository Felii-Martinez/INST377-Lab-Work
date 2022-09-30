document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const width = 10
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
    
  //The tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1,width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1,width+2,width*2,width*2+1]
  ]

  const theTetrominos = [lTetromino,zTetromino,oTetromino,tTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominos.length)
  let current = theTetrominos[random][0]

  //draw the first rotation in the first tetromino
  function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
  }

  //undraw the Tetromino
  function undraw(){
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
    })
  }
  
  //make the tetromino move down every second
  timerId = setInterval(movedown, 1000)

  //assign function to keyCodes
  function controle(e) {
    if(e.keyCode === 37) {
        moveLeft()
    }
  }
  document.addEventListener('keyup',control)

  //move down function
  function moveDown(){
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //freeze function
  function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition + index].classList.contains('taken'))
        //start new tetromino falling
        random = Math.floor(Math.random() * theTetrominos.length)
        current = theTetrominos[random][currentRotation]
        currentPosition = 4
        draw()
    }
  }

  //move tetromino left, unless is at edge
  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) %width ===0)

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition +=1
    }
  }






})