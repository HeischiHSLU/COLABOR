
 let letter = 'A';
 let masse = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
}
function draw() {
  background(20);

  fill(255);
  textSize(500);
  text(letter, 100, 450);
  loadPixels();
  let d = pixelDensity();


  
  for (let y = 0; y < height; y += 10) {
    let lastColorWhite = false;
    let transition = false;
    lastPoint = Vector(0, y);
    for (let x = 0; x < width; x += 10) {
      let index = 4 * (x + y * width * d);
      
      if(pixels[index] == 255, pixels[index + 1] == 255, pixels[index + 2] == 255) {
        if(!lastColorWhite) {

          // make the line before the white character
          stroke(77,238,234);
          line( lastPoint.x, lastPoint.y, x - masse, y );

          lastPoint = Vector(x , y);
          lastColorWhite = true;
          
        }
      }
      else {
        if(lastColorWhite) {
          stroke(77,238,234)
          line( lastPoint.x, lastPoint.y, x, y );
          lastPoint = Vector(x, y);
          lastColorWhite = false;
        }else{

        }
      }
      stroke(77,238,234)
      line( x, y, x +10, y );
    }
  }
}

function ApllyMass(a,b, t){
  
}
