let capture
let breite = 900;
let höhe = 600;
let density;

let pixelDens;
let pixelSize;

let option;

let contrastThreshhold = 200;

function setup() {
  createCanvas(breite,höhe);
  let constraints = {
    video: {
      mandatory: {
        minWidth: höhe,
        minHeight: breite
      },
      optional: [{ maxFrameRate: 60 }]
    },
    audio: false
  };

  

  capture = createCapture(constraints);
  capture.size(breite,höhe)
  capture.hide();
  density = pixelDensity();

  getSlider();
}


function draw() {
  background('#c7c1de');


  //Flip the video
  push();
  translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0, breite, höhe);
  pop();
 
  //getSlider();
  gridset();
}


function getSlider(){
  pixelDens = document.getElementById("pixeldens").value;
  contrastThreshhold = document.getElementById("pixelsize").value;
  console.log("pixelDens: "+ pixelDens+"\n contrastThreshhold: "+contrastThreshhold);
}



function gridset() {
  

  loadPixels();
  let gridSize = pixelDens;
  let cellSize = width / gridSize;
  //let lastColor;

  //lastX = 0;
 // lastY = 0;

 background('#c7c1de');
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x+= cellSize) {
      //let c = capture.get(x, y); Zu unperformant

      // Get My Color
      let index = (x + (y*density * width)) * 4*density;
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];
      let c = color(r, g, b, a);

      //TopColor
      let indexTop = (x + ((y-cellSize)*density * width)) * 4*density;
      let colorTop = color(pixels[indexTop],pixels[indexTop+1],pixels[indexTop+2],pixels[indexTop+3]);

      //RightColor
      let indexRight = ((x+cellSize) + (y*density * width)) * 4*density;
      let colorRight = color(pixels[indexRight],pixels[indexRight+1],pixels[indexRight+2],pixels[indexRight+3]);

      //BottomColor
      let indexBottom = (x + ((y+cellSize)*density * width)) * 4*density;
      let colorBottom = color(pixels[indexBottom],pixels[indexBottom+1],pixels[indexBottom+2],pixels[indexBottom+3]);

      //LeftColor
      let indexLeft = ((x-cellSize) + (y*density * width)) * 4*density;
      let colorLeft = color(pixels[indexLeft],pixels[indexLeft+1],pixels[indexLeft+2],pixels[indexLeft+3]);



      //get Contrast high enough
      let contrastTop = dist(red(c),green(c),blue(c),red(colorTop),green(colorTop),blue(colorTop));
      let contrastRight = dist(red(c),green(c),blue(c),red(colorRight),green(colorRight),blue(colorRight));
      let contrastBottom = dist(red(c),green(c),blue(c),red(colorBottom),green(colorBottom),blue(colorBottom));
      let contrastLeft = dist(red(c),green(c),blue(c),red(colorLeft),green(colorLeft),blue(colorLeft));


      strokeWeight(1);
      stroke(0);
          
      //console.log("contrastTop: "+contrastTop+"\ncontrastRight: "+contrastRight+"\ncontrastBottom: "+contrastBottom+"\ncontrastLeft: "+contrastLeft);
      if(contrastTop > contrastThreshhold){
        line(x-(cellSize/2),y-(cellSize/2),x+(cellSize/2),y-(cellSize/2));
      }
      if(contrastRight > contrastThreshhold){
        line(x+(cellSize/2),y-(cellSize/2),x+(cellSize/2),y+(cellSize/2));
      }
      if(contrastBottom > contrastThreshhold){
        line(x-(cellSize/2),y+(cellSize/2),x+(cellSize/2),y+(cellSize/2));
      }
      if(contrastLeft > contrastThreshhold){
        line(x-(cellSize/2),y-(cellSize/2),x-(cellSize/2),y+(cellSize/2));
      }
    
    }
    
  }
}

