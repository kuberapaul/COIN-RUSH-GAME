var gameState="wait"
var life=3;
var coins=0;

function preload(){
boyanimation=loadAnimation("boy1.png","boy2.png","boy21.png");
coinimg= loadImage("coin.png");
obimg1= loadImage("ob1.png");
roadimg=loadImage("roadimg.jpg");
}

function setup(){
	createCanvas(displayWidth,displayHeight);

	road=createSprite(width/2-0,height/2,500,500);
	road.velocityY=10;
	
road.addImage(roadimg);
road.scale=1.5;
boy=createSprite(width/2,height-250,200,200);
boy.addAnimation("run",boyanimation)
//boy.debug=true;
boy.setCollider("rectangle",0,0,80,250);

roadleft=createSprite(width/5.5,height/2,20,height)
roadright=createSprite(width-300,height/2,20,height)
//roadleft.visible=false;
//roadright.visible=false;
obstaclegroup=new Group();
coingroup = new Group();

}

function draw(){

	if(gameState=="wait"){
		background("lightblue");

		textSize(40);
		stroke("red");
		strokeWeight(8);
		text("COIN RUSH",width/2-100,50);
		stroke("");

		textSize(25);
		text ("Instructions",width-1000,150);

		textSize(20);
		text("1. Move mouse to move the player.",width-1000,200);
		text("2. Collect as many coins as possible",width-1000,250);
		text("3. Stay away from the monsters", width-1000,300);
		text("4. Press enter to start the game", width-1000,350);
		
		if(keyDown("enter")){
			gameState="play"
		}
	}

	if(gameState=="play"){
	background("yellow");

	boy.bounceOff(roadleft);
	boy.bounceOff(roadright);

	if(boy.isTouching(roadleft)){
		boy.x=roadleft.x+20
	}

	if(boy.isTouching(roadright)){
		boy.x=roadright.x-20
	}

	if(keyIsDown(UP_ARROW)){
	//	boy.velocityY=-10
	road.velocityY=+10
	}

	boy.x=mouseX;


	if(road.y>height){
		road.y=height/2;
	}

	spawnobstacles()
	spawncoins();

	if(obstaclegroup.collide(boy)){
		life-=1;
		obstaclegroup.destroyEach();
		if(life == 0){
			gameState="over";
	
		}
	}
	drawSprites();

	if(coingroup.collide(boy)){
		coins+=1;
		coingroup.destroyEach();
	}
	fill("black");
	textSize(20);
	stroke("puple");
	strokeWeight(2);
	text("COINS: "+coins,width-250,150);

	text ("LIFELINES:" + life,width/4-300,height/6.5)
}

if(gameState=="over"){
	background("lightgreen");
	textSize(40);
	stroke ("red");
	strokeWeight(20);
	
	text ("game Over",width/2-200,height/2);
	
}
}

function spawnobstacles(){
	if(frameCount % 50 ==0){
		var obstacle=createSprite(random(width-1500,width-200),0,50,50);
		obstacle.addImage(obimg1);
		obstacle.scale=0.75;
		obstacle.velocityY=10;
		obstacle.shapeColor="red";

		obstaclegroup.add(obstacle)
	}
}


function spawncoins(){
	if(frameCount % 60 ==0){
		var coin=createSprite(random(width-1200,width-200),0,50,50);
		coin.addImage(coinimg);
		coin.scale=0.4;
		coin.velocityY=10;
		coin.shapeColor="green";

		coingroup.add(coin)
	}
}

