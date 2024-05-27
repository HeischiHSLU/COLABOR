let capture
let breite = 900;
let höhe = 600;
let density;

let pixelDens;
let pixelSize;
let cellSize;

let option;

let contrastThreshhold = 200;


let contrastTop = 0;
let contrastRight = 0;
let contrastBottom = 0;
let contrastLeft = 0;

let x = 0;
let y = 0;

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
  updateShape();
}


function draw() {
  background('#c7c1de');


  //Flip the video
  push();
  translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0, breite, höhe);
  image
  pop();
 
  //getSlider();
  gridset();
}


function getSlider(){
  pixelDens = document.getElementById("pixeldens").value;
  contrastThreshhold = document.getElementById("pixelsize").value;
  console.log("pixelDens: "+ pixelDens+"\n contrastThreshhold: "+contrastThreshhold);
}

function updateShape(){
  option = document.getElementById("shapeSelect").value;
  console.log("Option: "+option);
}

function gridset() {
  

  loadPixels();
  let gridSize = pixelDens;
  cellSize = width / gridSize;
  //let lastColor;

  //lastX = 0;
 // lastY = 0;

 console.log("OPtian: "+option);
 background(199,193,222,2555);

  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x+= cellSize) {
      //let c = capture.get(x, y); Zu unperformant
      this.x = x;
      this.y = y;
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
      contrastTop = dist(red(c),green(c),blue(c),red(colorTop),green(colorTop),blue(colorTop));
      contrastRight = dist(red(c),green(c),blue(c),red(colorRight),green(colorRight),blue(colorRight));
      contrastBottom = dist(red(c),green(c),blue(c),red(colorBottom),green(colorBottom),blue(colorBottom));
      contrastLeft = dist(red(c),green(c),blue(c),red(colorLeft),green(colorLeft),blue(colorLeft));

      
      //drawstyle(option);

      strokeWeight(1);
  stroke(0);

  let topLeft = false;
  let topRight = false;
  let bottomLeft = false;
  let bottomRight = false;

  if(contrastTop > contrastThreshhold && contrastLeft > contrastThreshhold){
    topLeft = true;
    line(x-(cellSize/2),y, x, y-(cellSize/2));
  }

  if(contrastTop > contrastThreshhold && contrastRight > contrastThreshhold){
    topRight = true;
    line(x+(cellSize/2),y, x, y-(cellSize/2));
  }

  if(contrastBottom > contrastThreshhold && contrastLeft > contrastThreshhold){
    bottomLeft = true;
    line(x-(cellSize/2),y, x, y+(cellSize/2));
  }
  if(contrastBottom > contrastThreshhold && contrastRight > contrastThreshhold){
    bottomRight = true;
    line(x+(cellSize/2),y, x, y+(cellSize/2));
  }

  if(contrastTop > contrastThreshhold){
    if(!topLeft && !topRight){
      line(x-(cellSize/2),y-(cellSize/2),x+(cellSize/2),y-(cellSize/2));
    }
    if(!topLeft){
      line(x-(cellSize/2),y-(cellSize/2),x,y-(cellSize/2));
    }
    if(!topRight){
      line(x+(cellSize/2),y-(cellSize/2),x,y-(cellSize/2));
    }
  }

  if(contrastRight > contrastThreshhold){
    if(!topRight && !bottomRight){
      line(x+(cellSize/2),y-(cellSize/2),x+(cellSize/2),y+(cellSize/2));
    }
    if(!topRight){
      line(x+(cellSize/2),y-(cellSize/2),x+(cellSize/2),y);
    }
    if(!bottomRight){
      line(x+(cellSize/2),y+(cellSize/2),x+(cellSize/2),y);
    }
  }

  if(contrastBottom > contrastThreshhold){
    if(!bottomLeft && !bottomRight){
      line(x-(cellSize/2),y+(cellSize/2),x+(cellSize/2),y+(cellSize/2));
    }
    if(!bottomLeft){
      line(x-(cellSize/2),y+(cellSize/2),x,y+(cellSize/2));
    }
    if(!bottomRight){
      line(x+(cellSize/2),y+(cellSize/2),x,y+(cellSize/2));
    }
  }

  if(contrastLeft > contrastThreshhold){
    if(!topLeft && !bottomLeft){
      line(x-(cellSize/2),y-(cellSize/2),x-(cellSize/2),y+(cellSize/2));
    }
    if(!topLeft){
      line(x-(cellSize/2),y-(cellSize/2),x-(cellSize/2),y);
    }
    if(!bottomLeft){
      line(x-(cellSize/2),y+(cellSize/2),x-(cellSize/2),y);
    }
  }
    }
    
  }
}

function drawstyle(option){

  switch(option){
    case 1:
      drawStyleLine();
      break;
    case 2:
      drawStyleDiagonal();
      break;
    default:
      drawStyleLine();
      break;
  }
}

function drawStyleLine(){

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

function drawStyleDiagonal(){
  strokeWeight(1);
  stroke(0);

  let topLeft = false;
  let topRight = false;
  let bottomLeft = false;
  let bottomRight = false;

  if(contrastTop > contrastThreshhold && contrastLeft > contrastThreshhold){
    topLeft = true;
    line(x-(cellSize/2),y, x, y-(cellSize/2));
  }

  if(contrastTop > contrastThreshhold && contrastRight > contrastThreshhold){
    topRight = true;
    line(x+(cellSize/2),y, x, y-(cellSize/2));
  }

  if(contrastBottom > contrastThreshhold && contrastLeft > contrastThreshhold){
    bottomLeft = true;
    line(x-(cellSize/2),y, x, y+(cellSize/2));
  }
  if(contrastBottom > contrastThreshhold && contrastRight > contrastThreshhold){
    bottomRight = true;
    line(x+(cellSize/2),y, x, y+(cellSize/2));
  }

  if(contrastTop > contrastThreshhold){
    if(!topLeft && !topRight){
      line(x-(cellSize/2),y-(cellSize/2),x+(cellSize/2),y-(cellSize/2));
    }
    if(!topLeft){
      line(x-(cellSize/2),y-(cellSize/2),x,y-(cellSize/2));
    }
    if(!topRight){
      line(x+(cellSize/2),y-(cellSize/2),x,y-(cellSize/2));
    }
  }

  if(contrastRight > contrastThreshhold){
    if(!topRight && !bottomRight){
      line(x+(cellSize/2),y-(cellSize/2),x+(cellSize/2),y+(cellSize/2));
    }
    if(!topRight){
      line(x+(cellSize/2),y-(cellSize/2),x+(cellSize/2),y);
    }
    if(!bottomRight){
      line(x+(cellSize/2),y+(cellSize/2),x+(cellSize/2),y);
    }
  }

  if(contrastBottom > contrastThreshhold){
    if(!bottomLeft && !bottomRight){
      line(x-(cellSize/2),y+(cellSize/2),x+(cellSize/2),y+(cellSize/2));
    }
    if(!bottomLeft){
      line(x-(cellSize/2),y+(cellSize/2),x,y+(cellSize/2));
    }
    if(!bottomRight){
      line(x+(cellSize/2),y+(cellSize/2),x,y+(cellSize/2));
    }
  }

  if(contrastLeft > contrastThreshhold){
    if(!topLeft && !bottomLeft){
      line(x-(cellSize/2),y-(cellSize/2),x-(cellSize/2),y+(cellSize/2));
    }
    if(!topLeft){
      line(x-(cellSize/2),y-(cellSize/2),x-(cellSize/2),y);
    }
    if(!bottomLeft){
      line(x-(cellSize/2),y+(cellSize/2),x-(cellSize/2),y);
    }
  }

}
