var track,trackImage;
var player,playerrunningImage,playerstopImage;
var coin,coinImage;
var bomb,bombImage;
var left,right;
var coinGroup,bombGroup;
var gameState="play";
var score=0;
var restart,restartImage;
var o1;
function preload(){
  //pre-load images
  trackImage=loadImage("t.jpg");
coinImage=loadImage("coin.png");
bombImage=loadImage("bomb.png");
playerrunningImage=loadAnimation("Runner-1.png","Runner-2.png");
playerstopImage=loadAnimation("Runner-1.png");
restartImage=loadImage("restart.png");
o1=loadImage("o1.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight-140);
  //create sprites here
  track=createSprite(displayWidth/2,displayHeight/2-70,displayWidth,displayHeight);
  track.addImage(trackImage);

  player=createSprite(displayWidth/2,displayHeight-250,30,30);
  player.addAnimation("runImage",playerrunningImage);
  player.scale=0.07;
  left=createSprite(285,displayHeight/2-70,30,displayHeight);
  
  right=createSprite(displayWidth-285,displayHeight/2-70,30,displayHeight);

  restart=createSprite(displayWidth/2,(displayHeight-50)/2,30,30);
restart.addImage(restartImage);
 restart.visible=false;
restart.scale=0.6;
  coinGroup=createGroup();
  bombGroup=createGroup();
}

function draw() {
  background(0);
  if(gameState==="play"){
    track.velocityY=3;

if(track.y>displayHeight/2+200){
  track.y=displayHeight/2-70;
}
if(left.y>displayHeight/2+200){
  left.y=displayHeight/2-70;
}
if(right.y>displayHeight/2+200){
  right.y=displayHeight/2-70;
}
player.bounceOff(right);
player.bounceOff(left);

if(keyDown("left")){
  player.x=player.x-5;
  
}
if(keyDown("right")){
  player.x=player.x+5;
  
}
if(player.isTouching(coinGroup)){
  coinGroup[0].destroy();
  score=score+1;
}
if(player.isTouching(bombGroup)){
  bombGroup[0].destroy();
  gameState="End";
}

spawnCoins();
spawnBomb();
  }
  drawSprites();
  textSize(25);
  stroke("red");
  strokeWeight(4);
  fill("yellow");
  text("Score: "+score,displayWidth-200,50);
  if(gameState==="End"){
    textSize(50);

    text("GAME OVER",displayWidth/2-140,(displayHeight-140)/2);
    bombGroup.destroyEach();
    coinGroup.destroyEach();
    track.velocityY=0;
player.addAnimation("runImage",playerstopImage);
restart.visible=true;
if(mousePressedOver(restart)){
  reset();
}
  }
}
function reset(){
  gameState="play";
  restart.visible=false;
  player.addAnimation("runImage",playerrunningImage);
  score=0;

}
function spawnCoins(){
  if (frameCount%70===0){
coin=createSprite(random(350,displayWidth-350),random(-200,-50),20,20);
coin.addImage(coinImage);
coin.velocityY=+5;
coin.scale=0.5;
coin.liftime=(displayHeight+200)/7;

coinGroup.add(coin);
  }
}

function spawnBomb(){
  if (frameCount%250===0){
bomb=createSprite(random(350,displayWidth-350),random(-200,-50),20,20);
var rand=Math.round(random(1,2));
if(rand===1){
bomb.addImage(bombImage);
}
if(rand===2){
  bomb.addImage(o1);
  }
  
bomb.velocityY=+7;
bomb.scale=0.1;
bomb.liftime=(displayHeight+200)/7;
bombGroup.add(bomb);
  }
}