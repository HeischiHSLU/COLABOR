let particles = [];
let planets = [];
let explosionAmmount = 250;
let novaRotationSpeed = 0.1;

let phase1 = true;
let phase2 = false;
let phase3 = false;
let phase4 = false;





let novaSize = 100;

let breackPointPhase1 = 600;

let lastCheckpoint = 0;
let breackPoint = 600; // after 10 seconds

let phase4time = 0;

//Marina
let audioInstrumental;
let audioVocal;
let amp;
let fft;
let fftVocal;
let isPressed = false;
let waveForm;
let peakDetect;
let radiusT;
let shockwaveToggle;
let img;
let img2;
let backgroundImg;
let freq;
let volume;
let texArray = [];


let cam;
// Shader and audio variables
let myShader;

// Rotation and jitter variables
let angle = 0.0;
let jitter = 0.0;


function preload() {
  // Preload audio and shader files

  texArray.push(loadImage('tex/planet1.jpg'));
  texArray.push(loadImage('tex/planet2.jpg'));
  texArray.push(loadImage('tex/planet3.jpg'));
  texArray.push(loadImage('tex/planet4.jpg'));
  texArray.push(loadImage('tex/planet5.jpg'));

  audioInstrumental = loadSound('audio/Instrumental.mp3');
  audioVocal = loadSound('audio/Vocals.mp3');
  myShader = loadShader('shader/vertex.vert', 'shader/fragment.frag');
  frameRate(60);
  
  img = loadImage('Sonne.jpg');
  img2 = loadImage('Neutronenstern.jpg')
  backgroundImg = loadImage('Sternenhimmel.jpg');

}


function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  cam = createCamera();
  angleMode(DEGREES);
  radiusT = 0;


  // Initialize audio and FFT analysis
  userStartAudio();
  amp = new p5.Amplitude();
  fft = new p5.FFT();

  fftVocal = new p5.FFT();
  fftVocal.setInput(audioVocal);
  fft.setInput(audioInstrumental);
  audioInstrumental.loop();
  audioVocal.loop();

  peakDetect = new p5.PeakDetect(20, 20000, 0.4, 20);

  for(let i = 0; i < 5; i++){
    planets.push(new Planet(i));
  }
}



function draw() {


  //rotateX(-30);

  //rotateY(frameCount * 0.1);
  background(0,0,20);

  // Marina
  panorama(backgroundImg);
  //////////////////////////




  

  

  //directionalLight( [255], createVector(0,0,-1) );

  // Apply blur effect to the drawing context
  drawingContext.filter = 'blur(2px)';

  // Analyze audio and FFT
  fft.analyze();
  peakDetect.update(fft);
  if (peakDetect.isDetected) {
      breackPointPhase1 = frameCount;
      if(phase4){
        phase3Peak(random(100,200));
      }
      console.log("peak");
      shockwaveToggle = true;
  }

  volume = amp.getLevel();
  freq = fft.getCentroid() * 0.01;
  let angleSpeed = map(freq, 0, 255, 2, 6);
  angle += angleSpeed * volume;
  waveForm = fftVocal.waveform(512);

  
  // Calculate the camera position
  let mult = 1400;
  push();
  angleMode(radians);
  let camX = cos(angle) * mult;
  let camY = sin(angle) * mult;
  let camZ = sin(angle)* mult;
  cam.setPosition(camX, camY, camZ);
  cam.lookAt(0,0,0);
  pop();
  
  // Update jitter value every second
  if (second() % 2 == 0) {
      jitter = random(0, 0.1);
  }
  angle += jitter;




  if(phase1){
    nova();

    for(let i = 0; i < 5; i++){
      console.log("show planet");
      planets[i].show();

    }

    if(frameCount < breackPointPhase1){
      
      phase1 = true;

    return;
    }
    else{
      phase1 = false;
      phase2 = true;
      lastCheckpoint = frameCount;
    }
  }
  if(phase2){

    
    nova();

    speedUp();

    
    
  }
  if(phase3){

    for( let i = 0; i < particles.length; i++){

      if(particles[i].bounces > 250){ // its random number, just to make sure it will stop at some point
        phase3 = false;
        phase4 = true;
        
         console.log("phase4")
      }

      if(dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 5000){
        particles.splice(i,1);
      }
      particles[i].update();
      particles[i].show();
      
      if(dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 2000){
        particles[i].vel.mult(-1);
        particles[i].reversed = true;
      
      }
      if(particles[i].reversed == true && dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) < 200){
        if(particles[i].bounces > 3){
          particles[i].vel = createVector(0,0,0);
        }else{
          particles[i].vel.mult(-0.5);
          particles[i].stagination = true;
        }
        
        if(i == 1){console.log("Bounce!")}
        
        particles[i].bounces++;
      }
      if(particles[i].stagination == true && dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 250){
        particles[i].vel.mult(-1);
        particles[i].bounces++;
        if(i == 1){console.log("Bounce!")}
      }
    }


    for(let i = 0; i < 5; i++){
      planets[i].update();
      planets[i].show();
    }
  }

  if (phase4){
    if(phase4time == 0){     //first time in loop
      phase4time = frameCount;
      for(let i = 0; i < particles.length; i++){
        particles[i].peak(0);
        particles[i].show();

      }
    }else{
      for( let i = 0; i < particles.length; i++){
        particles[i].peakUpdate();
        particles[i].show();

      }
    }
    for(let i = 0; i < particles.length; i++){
      if(particles[i].reversed == true && dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) < 200){
        if(particles[i].bounces > 3){
          particles[i].vel = createVector(0,0,0);
        }else{
          particles[i].vel.mult(-0.5);
          particles[i].stagination = true;
        }
        
        if(i == 1){console.log("Bounce!")}
        
        particles[i].bounces++;
      }
      if(particles[i].stagination == true && dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 250){
        particles[i].vel.mult(-1);
        particles[i].bounces++;
        if(i == 1){console.log("Bounce!")}
      }
    }
    
  }

  

  
}
function nova(){
  noStroke();
  
  push();
  rotateX(frameCount * novaRotationSpeed);
  rotateY(frameCount * novaRotationSpeed * 0.5);

  rotateX(sin(freq) + angle * 0.1);
  rotateY(cos(volume) + angle * 0.1);

  // Use the custom shader for the sphere
  shader(myShader);

  // Map frequency and volume to shader uniforms
  const mapF = map(freq, 0, 1, 0, 20);
  const mapV = map(volume, 0, 0.2, 0, 0.5);
  myShader.setUniform('uTime', frameCount);
  myShader.setUniform('uFreq', mapF);
  myShader.setUniform('uAmp', mapV);

  // Pass the sphere texture to the shader
  myShader.setUniform('uTexture', img);

  sphere(novaSize, 24, 24);

  pop();
}

function speedUp(){

  let normalizedFrameCount = frameCount - lastCheckpoint;
  if (normalizedFrameCount < breackPoint){
    let t = normalizedFrameCount / breackPoint;
    let easedT = easeInQuad(t);

    novaRotationSpeed = map (easedT, .3, 1, 0, 5)
    let = shrinkduration = 180;
    if(normalizedFrameCount >= breackPoint - shrinkduration){
      let mappedt = map(normalizedFrameCount, 820, 1000, 0, 1);
      let easedT = easeInQuad(mappedt);
      novaSize = map(easedT, 0, 1, 100, 5);

    }

    for(let i = 0; i < 5; i++){
      planets[i].show();

    }
  }else{
    if (breackPoint < normalizedFrameCount && normalizedFrameCount < breackPoint + 10){
      if(random(1) > 0.5){
        for(let i = 0; i < explosionAmmount; i++){
          particles.push(new Particles());
          phase2 = false;
          phase3 = true;
        }
      }
    }
    
    novaRotationSpeed = 0;
    return;
  }

}


class Particles{
  constructor() {
    this.pos = createVector(0,0,0);
    this.vel = p5.Vector.random3D().normalize().mult(random(4,5));
    this.size = random(6,10);
    this.reversed = false;
    this.stagination = false;
    this.bounces = 0;
    this.destination = createVector(0,0,0);
    this.tempPos = createVector(0,0,0);
  }
  update(){
    this.pos.add(this.vel)
  }
  show(){
    push();

    noStroke();
    fill(255);
    texture(img);

    translate(this.pos.x,this.pos.y,this.pos.z);
    sphere(this.size);
    pop();
  }
  changeDirection(){
    this.vel.mult(-1);
    this.reversed = !this.reversed;
  }
  peak(intensity){
    if(intensity == 0){
      this.tempPos = this.pos.copy();
      this.destination = this.tempPos;

    }else{

      let tempVec = this.pos.copy().normalize();
      tempVec.mult(intensity);
      this.destination.x = this.tempPos.x + tempVec.x;
      this.destination.y = this.tempPos.y + tempVec.y;
      this.destination.z = this.tempPos.z + tempVec.z;


    }
    

  }
  peakUpdate(){
    if(this.destination != createVector(0,0,0)){
      if(dist(this.pos.x,this.pos.y,this.pos.z,this.destination.x,this.destination.y,this.destination.z) < 10){
        this.pos = this.destination;
        this.destination = this.tempPos.copy();

        this.pos.x = lerp(this.pos.x, this.destination.x, 0.2);
        this.pos.y = lerp(this.pos.y, this.destination.y, 0.2);
        this.pos.z = lerp(this.pos.z, this.destination.z, 0.2);
      }else{
        this.pos.x = lerp(this.pos.x, this.destination.x, 0.2);
        this.pos.y = lerp(this.pos.y, this.destination.y, 0.2);
        this.pos.z = lerp(this.pos.z, this.destination.z, 0.2);
      }
    }
  }
}

class Planet{
  constructor(it){
    let randomExclude = 0;
    if(random(0,100) > 50){
      randomExclude = (random(-400,-200));
    }else{
      randomExclude = (random(200,400));
    }
    this.pos = createVector(randomExclude,0,random(-800,400));
    this.size = random(25,75) * 0.7;
    this.vel = this.pos.copy().normalize().mult(6);
    this.id = it;
  }
  update(){
    this.pos.add(this.vel);
  }
  
  show(){
    push();
    noStroke();
    fill(255);
    texture(texArray[this.id])
    translate(this.pos.x,this.pos.y,this.pos.z);
    rotateY(frameCount * -0.5);
    rotateX( this.size * this.size  *-2 );
    torus(this.size, this.size/5);
    sphere(this.size);
    pop();
  }

}

function phase3Peak(intensity){
  for(let i = 0; i < particles.length; i++){
    particles[i].peak(intensity);
  }
}


function easeInQuad(t){
  return t * t;
}

function getVectorLength(vector) {
  const { x, y, z } = vector;
  // Calculate the magnitude for 2D or 3D vector
  const length = Math.sqrt(x * x + y * y + (z ? z * z : 0));
  return length;
}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 10, { delay: 1 });
  }
}

function shockwave() {
  radiusT = (radiusT + 10) % 1200;

  // Use the custom shader for the torus
  shader(myShader);

  // Pass the different texture to the shader
  myShader.setUniform('uTexture', img2);

  // Draw the torus
  torus(radiusT, 10);
}

function mousePressed(){
  console.log("mouse pressed");
  if(phase4){
    phase3Peak(100);
  }
}
