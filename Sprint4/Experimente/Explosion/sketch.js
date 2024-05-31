let particles = [];
let planets = [];
let explosionAmmount = 150;
let novaRotationSpeed = 0.1;

let phase1 = true;
let phase2 = false;
let phase3 = false;



let novaSize = 100;

let breackPointPhase1 = 600;

let lastCheckpoint = 0;
let breackPoint = 1000; // after 10 seconds

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  angleMode(DEGREES);
}

function draw() {
  
  rotateX(PI/3.2);

  rotateY(frameCount * 0.1);
  background(0,0,20);

  

  directionalLight( [255], createVector(0,0,-1) );

  nova();

  if(phase1){
    if(frameCount < breackPointPhase1){
      
      phase1 = true;

    return;
    }
    else{
      phase1 = false;
      lastCheckpoint = frameCount;
    }
  }

  

  speedUp();

  for( let i = 0; i < particles.length; i++){
    if(dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 2500){
      particles.splice(i,1);
    }
    particles[i].update();
    particles[i].show();
    if(dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 2000){
      particles[i].vel.mult(-1);
      particles[i].reversed = true;
    
    }
    if(particles[i].reversed == true && dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) < 200){
      particles[i].vel.mult(-0.5);
      particles[i].stagination = true;
    }
    if(particles[i].stagination == true && dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 250){
      particles[i].vel.mult(-1);
    }
  }
}

function nova(){
  noStroke();
  

  push();
  rotateX(frameCount * novaRotationSpeed);
  rotateY(frameCount * novaRotationSpeed * 0.5);
  //sphere(novaSize);
  torus(novaSize, novaSize/5);

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
      let t  = (normalizedFrameCount - (breackPoint - shrinkduration)) / shrinkduration;
      let easedt = easeInQuad(t);
      novaSize = map(easedT, .5, 1, 100, 5);

    }

  }else{
    if (breackPoint < normalizedFrameCount && normalizedFrameCount < breackPoint + 10){
      if(random(1) > 0.5){
        for(let i = 0; i < explosionAmmount; i++){
          particles.push(new Particles());
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
    this.vel = p5.Vector.random3D().normalize().mult(random(4,6));
    this.size = random(6,10);
    this.reversed = false;
    this.stagination = false;
  }
  update(){
    this.pos.add(this.vel)
  }
  show(){
    push();

    noStroke();
    fill(255);

    translate(this.pos.x,this.pos.y,this.pos.z);
    sphere(this.size);
    pop();
  }
}

class Planet{
  constructor(){
    this.pos = createVector(0,0,0);
    this.size = 100;
  }
  show(){
    push();
    noStroke();
    fill(255);
    translate(this.pos.x,this.pos.y,this.pos.z);
    sphere(this.size);
    pop();
  }

}

function easeInQuad(t){
  return t * t;
}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 10, { delay: 1 });
  }
}
