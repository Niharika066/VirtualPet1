//Create variables here
var dog,happydogImg,dogImg;
var food;
var foodS, foodStock;
function preload()
{
  //load images here
  happydog=loadImage("happydog.png");
  dogImg=loadImage("Dog.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
 
  createCanvas(500, 500);
  dog=createSprite(250,250,30,30)
  dog.addImage(dogImg);
  dog.scale=0.1;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87); 
  

  if(foodS!==undefined){
    fill("white")
    textSize(23);
  text("Note: Press UP ARROW to feed DRAGO milk",10,50);
  textSize(18);
  text("foodRemaining:"+foodS,190,150);
  }

if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happydog);
    dog.scale=0.1;
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg)
    dog.scale=0.1;
  }

  if(foodS===0){
    foodS=20;
  }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}
