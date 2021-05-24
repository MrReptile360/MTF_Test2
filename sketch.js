const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bg,bgImg
var MTF,MTFImg;
var SCP, SCPImg;
var gameState=1;
var invisibleG;
var bullet, bulletImg;

function preload(){
    bgImg=loadImage("background.jpg");
    MTFImg=loadImage("Mobile Task Forces Image.png");
    SCPImg=loadImage("SCP-939IMage.png");
    restartImg=loadImage("restart.png");
    bulletImg=loadImage("Bullet.png");
}

function setup(){

createCanvas(1000,600);

engine = Engine.create();
world = engine.world;

bg=createSprite(100,250,40,20);
bg.addImage("background", bgImg);
bg.scale=5;
bg.velocityX=-15;


MTF=createSprite(100,520,40,20);
MTF.addImage("MTFImage", MTFImg);
MTF.scale=1.2;

SCP=createSprite(800,450,40,20);
SCP.addImage("SCPImg", SCPImg);
SCP.scale= 0.2;
SCP.velocityX=-4;

restart = createSprite(500, 200);
restart.addImage(restartImg);

var options = {
   restitution:0.8
}
bullet = Bodies.rectangle(100,250,40,20,options);
World.add(world, bullet);


 invisibleG= createSprite(500,540,1000,10);
 
 edges=createEdgeSprites();
}

function draw(){

    background("white");
    Engine.update(engine);
   // console.log(bg.x);
   

    drawSprites();

    
    invisibleG.visible=false;
    MTF.collide(invisibleG);



if(gameState===1){
MTF.visible=true;
restart.visible=false;
bg.velocityX=-3;
SCP.velocityX=-5;
SCP.visible=true;

//shoot();

//bullet.x = mouseX;
//bullet.y = mouseY;
rect(bullet.position.x,bullet.position.y,50,50);
//image(bulletImg,100,320,40,40 );

if(keyDown("space") && MTF.y>=412.75 ){

    MTF.velocityY=-20;

}
MTF.velocityY= MTF.velocityY+1;

        if(bg.x<-280){
            bg.x=width/2;
        }

if (SCP.isTouching(MTF)){

   gameState=0
}

    }
    else if(gameState===0){

       // console.log("I am in gameState 0");
        MTF.destroy();
        bg.velocityX=0;
        SCP.velocityX=0;

 restart.visible=true;

textSize(80);
fill("black");
text("Game over!",300,100) 


if (mousePressedOver(restart)){

reset();
}
    }
    console.log(MTF.y);
}

function reset(){

    
console.log("I am in reset.");


SCP.destroy();


gameState=1;
MTF=createSprite(100,400,40,20);
MTF.addImage("MTFImage", MTFImg);
MTF.scale=1.2;

SCP=createSprite(800,450,40,20);
SCP.addImage("SCPImg", SCPImg);
SCP.scale= 0.2;
SCP.velocityX=-4;


}

/*function shoot(){

        bullet=createSprite(100,250,40,20);
        bullet.addImage("bullet", bulletImg);
        bullet.scale =0.5;
}*/

function mouseDragged(){

}
function mouseReleased(){

}