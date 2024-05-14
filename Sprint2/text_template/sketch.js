
let list = ['eins','zwei', 'drei', 'vier', 'fünf'];
let hischiList = ['Hew' , 'Schiffer', 'Dräck', 'Reisich' , 'Beto']
let näbsList = ['enera Garetta', 'ma Beuchi', 'dum Hischi vam Briedri', 'enra Chila', 'dem va minum getti' ,'der Rohna']
let 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20
  );
  
  textSize(48);
  textFont('monospace');
  textAlign(LEFT);
  fill('#30cc02');
  console.log(list[floor(random(0,list.length))]);
  frameRate(0.5);
  //text(list[floor(random(0,list.length))]+"\n",20,100,windowWidth-40,windowHeight-40);
  text("Es Hischi üs " +hischiList[floor(random(0,hischiList.length))],20,100,windowWidth-40,windowHeight-40);
  text("Näbs " + näbsList[floor(random(0,näbsList.length))],50,150,windowWidth-40,windowHeight-40);
  text("Näbs " + näbsList[floor(random(0,näbsList.length))],50,150,windowWidth-40,windowHeight-40);
}
