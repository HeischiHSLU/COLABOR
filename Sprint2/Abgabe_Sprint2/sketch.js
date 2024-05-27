let markov,
  data1,data2,data3,data4,data5,
  niceText,
  graphics,
  title,
  verschub = 0,
  pixelDens,
  starsBackground,
  epicSound,
  font,
  sound;

function preload() {

  data1 = loadStrings("texte/01_SPAM.txt");
  data2 = loadStrings("texte/02_SPAM.txt");
  data3 = loadStrings("texte/03_SPAM.txt");
  data4 = loadStrings("texte/04_SPAM.txt");
  data5 = loadStrings("texte/05_SPAM.txt");

  font = loadFont('fonts/Starjedi.ttf');

  epicSound = loadSound('starwars.mp3')
}

function setup() {
  let canvas = createCanvas(500, 400, WEBGL);
  graphics = createGraphics (600,2000);
  title = createGraphics(500, 600);

  starsBackground = loadImage('Stars.png');
  //drawStars();



  markov = RiTa.markov(3);

  // load text into the model
  markov.addText(data1.join(" "));
  markov.addText(data2.join(" "));
  markov.addText(data3.join(" "));
  markov.addText(data4.join(" "));
  markov.addText(data5.join(" "));

  generateText();
  epicSound.play(); 

}
let beschleunigung = 0;
function draw() {
  
  background(0);

  
  if (frameCount < 360) {
  
    if (frameCount > 200){
      beschleunigung +=70
    }
    drawStars();

    title.textAlign(CENTER, CENTER);
    title.fill(212, 191, 2);
    title.textFont(font);
    title.textSize(92);
    title.text('Creative Coding ', 0, 0, title.width, title.height);
    let mils= millis();
    translate(0,0, -(mils/5 +beschleunigung)); 
    noStroke();
    texture(title);
    plane(600, 600);
    translate(0,0, -(-(mils/5 +beschleunigung)));
    console.log(mils/5);
  }else{
    drawStars();
    graphics.textAlign(CENTER, TOP);
    graphics.fill(212, 191, 2);
    graphics.textFont(font);
    graphics.textSize(42);
    graphics.text('Creative Coding \nEpisode !! \nSpam und Scam \n\n\n' +niceText.join(" "), 0, 0, graphics.width, graphics.height);
    translate(0,graphics.height/2 + verschub/2 -150, verschub); // dritte Komponente ist nach hinten 
    console.log(verschub);
    noStroke();
    texture(graphics);
    rotateX(PI/3); // Rotation nach hinten
    plane(600, 1800);
    verschub -= 1;
  }
  
}

let Stars = { size: [], x: [], y:[]};

function drawStars(){
  starAmount = 200;
  background(10);
  if (Stars.x.length == 0) {
    generateStars();
  }
  noStroke();

  for (let i = 0; i < Stars.x.length; i++) {
    fill(255);
    ellipse(Stars.x[i], Stars.y[i], Stars.size[i], Stars.size[i]);
  }
  //saveCanvas('Stars', 'png');
  //starsBackground = loadImage('Stars.png');
}

function generateStars(){
  for (let i = 0; i < starAmount; i++) {
    Stars.x.push(random(-width, width));
    Stars.y.push(random(-height, height));
    Stars.size.push(random(1, 4));
  }
}

function generateText() {
  niceText = markov.generate(10);
  console.log(niceText);
}

function mouseClicked() {
  if( epicSound.isPlaying() ){
    //pause the sound
    epicSound.pause();
  }else{
    epicSound.play();
  }
  console.log("click");
}


