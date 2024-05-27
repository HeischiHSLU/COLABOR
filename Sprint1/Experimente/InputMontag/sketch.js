

  let x = 50;
  let y = 50;
  let direction = 1;
  let rotation = 0;
  let xMov = true;

  let scaleValue = 1;
  let scaledirection = 1;

  let Round = 1;

  let lenght = 50;
  let actuallenght;

  function setup() {
    createCanvas(600, 600);
    frameRate(60);
  }

  function draw() {
    actuallenght = lenght * scaleValue; // 
    background(220);
    

    moveSquare();
    
   switch(Round){
    case 2:
      scaleSquare();

      break;
    case 3:
      rotateSquare();
      break;
    case 4: 
     // Reset the round counter
      Round = 2;
      break;
    default:
      Round = 1;
      break;
   }
    
    // Draw the square
    angleMode(DEGREES)
   // Shifts the origin to the pivot point
    //translate(x + actuallenght / 2, y+actuallenght / 2);
    //rotate(rotation);
    //translate(-(x + actuallenght/2), -(y + actuallenght/2));
    
    push()
    translate(x + actuallenght / 2, y+actuallenght / 2); // Translates to Center of Square
    rotate(rotation);
    pop()

    rect(x, y, actuallenght, actuallenght);
  }

  function moveSquare() {
    
    if (xMov){
      x += direction * 2;
    }else{
      y += direction * 2;
    }
    
    
    // Reverse direction when reaching the canvas edges
    if (x + actuallenght + 50 >= width) {
      xMov = false;
    }
    if (y + actuallenght + 50 >= height) {
      xMov = true;
      direction = -1;
    }
     if (x < 50) {
      xMov = false;
     }
     if (y <= 49) {
        y = 50;
       xMov = true;
       direction = 1;
       Round++;
     }
  }

  function rotateSquare() {
    rotation += 1;  
  }

  function scaleSquare() {
    scaleValue += 0.01 * scaledirection;
    if (scaleValue > 2 || scaleValue < 1) {
      scaledirection *= -1;
    }
  }
  