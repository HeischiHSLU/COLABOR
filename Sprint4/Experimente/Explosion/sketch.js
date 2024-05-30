let particles = [];
let explosionAmmount = 150;
let novaRotationSpeed = 0.1;

let novaSize = 100;

let breackPoint = 600; // after 10 seconds

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0,0,20);

  

  directionalLight( [255], createVector(0,0,-1) );

  nova();

  speedUp();

  for( let i = 0; i < particles.length; i++){
    if(dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) > 2000){
      particles.splice(i,1);
    }
    particles[i].update();
    particles[i].show();
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

  if (frameCount < breackPoint){
    let t = frameCount / breackPoint;
    let easedT = easeInQuad(t);

    novaRotationSpeed = map (easedT, 0, 1, 0.3, 20)
    let = shrinkduration = 180;
    if(frameCount >= breackPoint - shrinkduration){
      let t  = (frameCount - (breackPoint - shrinkduration)) / shrinkduration;
      let easedt = t;
      novaSize = map(easedT, 0, 1, 100, 5);

    }

  }else{
    if (breackPoint < frameCount && frameCount < breackPoint + 10){
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

function easeInQuad(t){
  return t * t;
}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 10, { delay: 1 });
  }
}
