let sound;
let soundLoaded = false;
let playButton;
let fft;  
let peakDetect;
let peakSlider;
let resetButton;


// Kleine Info für die die sich die Mühe machen den Code zu lesen:
// Dieser Code ist nicht gepolished und ist eine Kurzzeitige zusammenarbeit von 2 Personen.

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(20,20000,0.1);

  resetButton = createButton('Reset');
  resetButton.position(520, 19);
  resetButton.mousePressed(neuladu);
  resetButton.class("btn btn-secondary");


  playButton = createButton('Play/Pause');
  playButton.position(19, 19);
  playButton.mousePressed(playPause);
  playButton.class("btn btn-secondary");
  playButton.style('display', 'none');

  peakSlider = createSlider(0, 0.5, 0.1, 0.01);
  peakSlider.position(19, 70);
  peakSlider.class("slider");
  peakSlider.style('display', 'none');
  peakSlider.input(updatePeak);

  canvas.drop(gotFile);
  fill(255, 204, 0);
  background(200);
  //initdraw();
}

function neuladu(){
  location.reload();
}

let gobalRotationY = 0;
let innerRadius = 200;
let outerRadius = 210;
let detail = 100;
let depth = 20;

let smallinnerRadius = 80;
let smallouterRadius = 90;

function draw() {
  frameRate(60);

  if (soundLoaded== false){ 
    initdraw();
    return;
  }
  if(sound.isPlaying()){
    fft.analyze();
    peakDetect.update(fft);

    if (peakDetect.isDetected) {
      console.log("Peak detected");
      smallinnerRadius = 150;
      smallouterRadius = 160;
    }else{
      if(smallinnerRadius > 80){
        smallinnerRadius *= 0.965;
        smallouterRadius *= 0.965;
      }else{
        smallinnerRadius = 80;
        smallouterRadius = 90;
      }
    }
  }

  

  background(30);

  //////////////////////////////////////////////
  // Global Rotation
  ////////////////////////////////////////////
  if (sound.isPlaying()){
  rotateX(frameCount * 0.01);
  if (frameCount % 1000 < 500){
    gobalRotationY += 0.002;
  }else{
    gobalRotationY -= 0.002;
  }
  rotateY(gobalRotationY);
}
rotateX(PI/3.2); // GobalRotation

  ///////////////////////////////////////////////



  noStroke();
  stroke(255);
  fill(255, 204, 0); //Yellow
  push(); 
  ///////////////////////////////////////////////////////////////////
  // Rotation of Yellow Circle
  ////////////////////////////////////////////////////////////////////
  let theta = map((frameCount * 0.2) % detail, 0,detail, 0, TWO_PI);
  translate( (innerRadius) * cos(theta), (innerRadius ) * sin(theta),0); 
  rotateZ(theta);
  rotateY(frameCount * 0.02);

  rotateX(PI/2)

  ////////////////////////////////////////////////////////////////////
  drawCircle(smallinnerRadius, smallouterRadius, detail/2, depth);
  pop();



  //noStroke();
  stroke(255);
  fill(80); //Black
  drawCircle(innerRadius, outerRadius-2, detail, depth);


  ////////////////////////////////////////////////////////////
  //Sound 
  
  let panning = map(cos(theta), -1, 1, -.9, .9);
  sound.pan(panning);

}

function drawCircle(innerRadius, outerRadius, detail, depth){
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= detail; i++) {
    let theta = map(i, 0, detail, 0, TWO_PI);

    // Outer circle top
    let x1 = outerRadius * cos(theta);
    let y1 = outerRadius * sin(theta);
    let z1 = depth / 2;

    // Inner circle top
    let x2 = innerRadius * cos(theta);
    let y2 = innerRadius * sin(theta);
    let z2 = depth / 2;

    // Draw top strip
    vertex(x1, y1, z1);
    vertex(x2, y2, z2);
  }
  endShape(CLOSE);

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= detail; i++) {
    let theta = map(i, 0, detail, 0, TWO_PI);
     // Outer circle bottom
     let x3 = outerRadius * cos(theta);
     let y3 = outerRadius * sin(theta);
     let z3 = -depth / 2;
 
     // Inner circle bottom
     let x4 = innerRadius * cos(theta);
     let y4 = innerRadius * sin(theta);
     let z4 = -depth / 2;
     // Draw bottom strip
    vertex(x3, y3, z3);
    vertex(x4, y4, z4);
  }
  endShape(CLOSE);

  // Draw sides
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= detail; i++) {
    let theta = map(i, 0, detail, 0, TWO_PI);

    // Outer circle top
    let x1 = outerRadius * cos(theta);
    let y1 = outerRadius * sin(theta);
    let z1 = depth / 2;

    // Outer circle bottom
    let x3 = outerRadius * cos(theta);
    let y3 = outerRadius * sin(theta);
    let z3 = -depth / 2;

    // Draw side quads
     vertex(x1, y1, z1);
     vertex(x3, y3, z3);
    // vertex(x2, y2, z2);
    // vertex(x4, y4, z4);
  }
  endShape(CLOSE);

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= detail; i++) {
    let theta = map(i, 0, detail, 0, TWO_PI);

    // Inner circle top
    let x2 = innerRadius * cos(theta);
    let y2 = innerRadius * sin(theta);
    let z2 = depth / 2;

    // Inner circle bottom
    let x4 = innerRadius * cos(theta);
    let y4 = innerRadius * sin(theta);
    let z4 = -depth / 2;

    // Draw side quads
    // vertex(x1, y1, z1);
    // vertex(x3, y3, z3);
     vertex(x2, y2, z2);
     vertex(x4, y4, z4);
  }
  endShape(CLOSE);
}

function initdraw() {
  background(200);
  textScreen = createGraphics(600,600)
  textScreen.textSize(24);
  textScreen.text("Drag an audio file onto the canvas.",width/2 -180,height/2);
  image(textScreen, -width/2, -height/2)

}


function gotFile(file) {
  if (file.type === 'audio') {
    // Create an image DOM element but don't show it
    console.log(file);
    sound = loadSound(file.data, soundLoad);
    console.log("Audio file loaded");

  } else {
    console.log('Not an image file!');
  }
}

function soundLoad(){
  soundLoaded = true;
  sound.play();
  playButton.style('display', 'block');
  peakSlider.style('display', 'block');
  playButton.html('Pause');
  console.log("BPM: ", sound.getBPM());
}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5, { delay: 1 });
  }
  if (key === 'p') {
    console.log("Space pressed");
    playPause();
  }
}
function playPause(){
  if (soundLoaded == true){
    if (sound.isPlaying()) {
      playButton.html('Play');
      sound.pause();
    }
    else {
      playButton.html('Pause');
      sound.play();
    }
  }
}

function updatePeak(){
  peakDetect.threshold = peakSlider.value();
  console.log("Peak Threshold: ", peakDetect.threshold);
}