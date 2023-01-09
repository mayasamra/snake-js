// Instructions: Press the arrow 'Run' button above then click anywhere on the black screen that appears. Then use WASD keys to move the snake!

// sizing variables for the grid
var num_blocks = 20
var block_size = 20

// positioning variables for the snake
var head_x = 0
var head_y = 0

// speed variables used for the snake's direction of movement
var speed_x = 0
var speed_y = 0

// snake start length and empty array to add length to
var tail_len = 3
var tail_blocks = []

// positioning variables for apple blocks
var app_x = 0
var app_y = 0

// score variables
var score = 0
var high_score = 0

function setup() {
  createCanvas(400, 400)
  frameRate(10)
  // starts game with snake in the centre of the screen
  head_x = num_blocks / 2
  head_y = num_blocks / 2
  
  // giving the apple positions random numbers within the grid
  app_x = round(random(0, num_blocks - 1))
  app_y = round(random(0, num_blocks - 1))
}

function draw() {
  background(0)
  // while snake is moving
  if(speed_x != 0 || speed_y != 0) {
      // adding the tail of the snake
    tail_blocks.push({x: head_x, y: head_y})

    // cutting off the tail length as it follows the head so it's not continuous
    while(tail_blocks.length > tail_len) {
      tail_blocks.shift()
    }
    // checking for overlap
    for(let i = 0; i < tail_blocks.length; i++) {
      // if the head position overlaps with a tail block position
      if(head_x + speed_x == tail_blocks[i].x && head_y + speed_y == tail_blocks[i].y) {
        // restarts the game and score if the snake hits itself
        // these conditions also don't allow the snake to move back on itself
        head_x = num_blocks / 2
        head_y = num_blocks / 2
        speed_x = 0
        speed_y = 0
        tail_len = 3
        tail_blocks = []
        app_x = floor(random(0, num_blocks))
        app_y = floor(random(0, num_blocks))
        
        // checking for high score and resetting score when game ends
        if(score > high_score) {
          high_score = score
        }
        score = 0
      }
    }
  }
  
  // drawing the apple
  fill(255, 0, 0)
  rect(app_x * block_size, app_y * block_size, block_size, block_size)
  
  // drawing the snake
  fill(255)
  rect(head_x * block_size, head_y * block_size, block_size, block_size)
  
  // this updates the head of the snake's position
  head_x = head_x + speed_x
  head_y = head_y + speed_y
  
  // restarts the game if the snake hits the outer boundaries
  if(head_x < 0||head_x > 19||head_y < 0||head_y > 19) {
    head_x = num_blocks / 2
    head_y = num_blocks / 2
    speed_x = 0
    speed_y = 0
    tail_len = 3
    tail_blocks = []
    app_x = floor(random(0, num_blocks - 1))
    app_y = floor(random(0, num_blocks - 1))
    if(score>high_score) {
      high_score = score
    }
    score = 0
  }
  

  // drawing the tail blocks' positions that follow the head block
  for(let i =0; i < tail_blocks.length; i++) {
    rect(tail_blocks[i].x * block_size, tail_blocks[i].y * block_size, block_size, block_size)
    
    // deleting the applpe and creating a new one if its eaten
    if(head_x == app_x && head_y == app_y) {
      app_x = floor(random(0, num_blocks))
      app_y = floor(random(0, num_blocks))
      // increasing the snake length by 1 block after eating
      tail_len++
      
      //increasing the score by 1 for every apple eaten
      score++
    }
  }
  // drawing score and high score
  fill(255)
  textSize(15)
  text('SCORE: '+ score, 10, 30)
  text('HIGH SCORE: '+high_score, 10, 50)
}
// this function dictates the snake's direction with WASD keys
function keyPressed() {
  if(key == 'w') {
    speed_x = 0
    speed_y = -1
  } else if(key == 's') {
    speed_x = 0
    speed_y = 1
  } else if(key == 'a') {
    speed_x = -1
    speed_y = 0
  } else if(key == 'd') {
    speed_x = 1
    speed_y = 0
  }
}