
let sceneStates = Object.freeze({
  INTRO: 0,
  TUTORIAL: 1,
  GAME: 2,
  WIN: 3,
  LOSE:4
});

let currentState = sceneStates.INTRO;

let keyOn = false;
let gameBegins = false;
let ghost;
let ghost2;
let ghost3;
let stars;
let brokenHeart;
let SCENE_W;
let SCENE_H;
let myFont;
let myTitle;
let secondPage;

let numberOfRows; 
let xStep; 
let yStep; 
let positions = []; 

function preload(){
	myFont = loadFont('assets/MiasScribblings.ttf');
	myTitle = loadImage("https://i.imgur.com/FTb0oC6.png");
	secondPage = loadImage("https://i.imgur.com/K6XGRw3.png");
	
}
function setup() {	
 createCanvas(600,400);
 SCENE_W = 3000;
 SCENE_H = 2000;
 numberOfColumns = 39; 
 numberOfRows = 26; 
 stars = new Group();
 xStep = SCENE_W/numberOfColumns; 
 yStep = SCENE_H/numberOfRows;
  
 for(var x = -500; x < SCENE_W + 500; x += xStep){ 
    for(var y = -500; y < SCENE_H + 500; y += yStep){
      let p = createVector(x, y); 
      positions.push(p); 
	}
  }
	
for(var i = 0; i<120; i++) { 
	var newStar = createSprite((random(-100,250)&&random(350,SCENE_W-100)), (random(-500,150)&&random(0,SCENE_H)));
  newStar.addAnimation("floating", "https://i.imgur.com/uT0hIyZ.png");
  newStar.rotationSpeed = -2;
  newStar.addToGroup(stars);		
  newStar.setCollider ("circle", 0, 0, 10,10); 
}
 
ghost = createSprite(300, 200, 50, 50);
ghost.setCollider ("rectangle", 0, 0, 80,110); 
ghost2 = createSprite(2700, 1800,50,50);
ghost3 = createSprite(300,200, 50,50);
brokenHeart = createSprite(300,200,5,5);	
  

	
var myAnimation = ghost.addAnimation("floating", "https://i.imgur.com/NqfJkMI.png","https://i.imgur.com/NqfJkMI.png", "https://i.imgur.com/jS0DrOx.png","https://i.imgur.com/jS0DrOx.png","https://i.imgur.com/jS0DrOx.png");


var myAnimation2 = ghost2.addAnimation("standing","https://i.imgur.com/Qow4oIJ.png", "https://i.imgur.com/Qow4oIJ.png","https://i.imgur.com/Qow4oIJ.png", "https://i.imgur.com/M5syst9.png", "https://i.imgur.com/M5syst9.png","https://i.imgur.com/M5syst9.png");

	
var myAnimation3 = ghost3.addAnimation("holdingHands", "https://i.imgur.com/L37vVtY.png","https://i.imgur.com/L37vVtY.png","https://i.imgur.com/L37vVtY.png","https://i.imgur.com/j65fGvQ.png","https://i.imgur.com/j65fGvQ.png","https://i.imgur.com/j65fGvQ.png");
  

var myAnimation4 = brokenHeart.addAnimation ("brokenHeart","https://i.imgur.com/Yk6dDh6.png","https://i.imgur.com/Yk6dDh6.png","https://i.imgur.com/swHZH6s.png","https://i.imgur.com/swHZH6s.png","https://i.imgur.com/y7MquEw.png","https://i.imgur.com/y7MquEw.png","https://i.imgur.com/Shb4C2F.png","https://i.imgur.com/Shb4C2F.png","https://i.imgur.com/ILhK4PE.png","https://i.imgur.com/ILhK4PE.png","https://i.imgur.com/BcTMO5K.png","https://i.imgur.com/BcTMO5K.png","https://i.imgur.com/BcTMO5K.png","https://i.imgur.com/BcTMO5K.png");
	
	
  }

function draw(){
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false;
  noFill();
  stroke(255);
  strokeWeight(10);
  
  //rect(0,0,3000,2000)	
}

function drawScene() {
  switch(currentState){
	  case sceneStates.INTRO:
	  //set camera at the beginning ?
	   camera.position.x = 300;
       camera.position.y = 200;
	   background(240,85,85);
     
       
	   image(myTitle,120,120, 385,120);
	   fill(255);
       textFont("myFont");
       textSize(24);
       textAlign(CENTER, CENTER);
       text("click to continue", width/2, height/2+100);
	   
	   console.log("INTRO");
	   //console.log(mouseX,mouseY);
       break;  
	  case sceneStates.TUTORIAL:
	   background(180, 210, 90);
	   image(secondPage,250,40);
       fill(255);
       textFont("myFont");
       textSize(24);
       textAlign(CENTER, CENTER);
       text("Use mouse to move.\nI'm waiting for you at lower right corner~ \n Remember to AVOID stars \n because I don't want them to steal your heart~", width/2, height/2 + 50);
       text("CLICK TO START", width/2, 350);
       
		
		camera.position.x = 300;
        camera.position.y = 200;
//		ghost.position.x = 300;
//      ghost.position.y = 200;
		console.log("TURORIAL");
		break;
	  case sceneStates.GAME:
		if (gameBegins = true) {
		background(190,230,245);  
	    //set moving speed
        ghost.velocity.x = (camera.mouseX-ghost.position.x)/30;
        ghost.velocity.y = (camera.mouseY-ghost.position.y)/30;

//       if(mouseIsPressed)
//       camera.zoom = .5;
//       else
//       camera.zoom = 1;
  
// set the camera position to the ghost position
      camera.position.x = ghost.position.x;
      camera.position.y = ghost.position.y;
 
  //limit movements
  if(ghost.position.x < 0)
    ghost.position.x = 0;
  if(ghost.position.y < 0)
    ghost.position.y = 0;
  if(ghost.position.x > SCENE_W)
    ghost.position.x = SCENE_W;
  if(ghost.position.y > SCENE_H)
    ghost.position.y = SCENE_H;

    //console.log(ghost.position);
		  		  
//draw grid
  for(var i = 0; i < positions.length; i++){ 
	//fill(250, 100, 100);
	 fill(250, 150, 150);
	  //fill(255,180,20);
	noStroke();
    rect(positions[i].x, positions[i].y, 100, 3);
	  rect(positions[i].x, positions[i].y, 3, 100); 
  }
		 
  drawSprites(stars);   
	
  //shadow		
  noStroke();
  fill(0,0,0,20);	  
  ellipse(ghost.position.x, ghost.position.y+130, 80, 30);
  ellipse(ghost2.position.x, ghost2.position.y+130, 80, 30);
	
   //frame			
  fill(250,150,150);
  //fill(255,180,20);
  rect(-350,-450,4000,380);
  rect(-650,-400,600,3000);
  rect(3055,-200,600,2500);
  rect(-250,2090,4000,400);
    
  // draw two ghosts		
  drawSprite(ghost2);
  drawSprite(ghost);
			
//    ghost.debug =  mouseIsPressed;
//    ghost2.debug =  mouseIsPressed;
//    stars.debug =  mouseIsPressed;
//   	  
   console.log("GAME");
   }
  break;  
	case sceneStates.WIN:
	  gameBegins = false;
	  background(255,200,200);
      drawSprite(ghost3);
	  //reset position  ?
	    camera.position.x = 300;
        camera.position.y = 200;
		ghost.position.x = 300;
        ghost.position.y = 200;
	 
	  console.log("WIN!");
	  
break;
	  case sceneStates.LOSE:
	  gameBegins = false; 
	  background(125,115,140);
      drawSprite(brokenHeart);
	  brokenHeart.position.y = 165;
	
	  textSize(24);
	  fill(255);
	  textFont("myFont");
	  textAlign(CENTER, CENTER);
      text("Click to try again. \n I'll always be there for you ~ ", width/2, height - 100);
	 //reset , or couldn't play again 
	  ghost.position.x = 300;
      ghost.position.y = 200;
	  camera.position.x = ghost.position.x;
      camera.position.y = ghost.position.y;
	console.log("LOSE!");
	  break;
      default:
      break;
	 
 
  }
}
	
	function checkTransition() {
  switch (currentState) {
    case sceneStates.INTRO:
	  gameBegins = false;
      if (keyOn) {
        currentState++;
        setUpScene(currentState);
      }
      break;
    case sceneStates.TUTORIAL:
		 gameBegins = false;
        if (keyOn) {
          currentState++;
          setUpScene(currentState);
		  gameBegins = true;
        } 
      break;
    case sceneStates.GAME:
		  //hit detection
		  gameBegins = true;
          if(ghost.overlap(ghost2)) {
	     currentState = sceneStates.WIN;
         setUpScene(currentState);
	     gameBegins = false;
		}
		if
		 (ghost.overlap(stars)){
		 currentState = sceneStates.LOSE;
		 setUpScene(currentState);
		 gameBegins = false;
		 }
		
      break;
    case sceneStates.WIN:
	 
      if (keyOn) {
        currentState = sceneStates.INTRO;
        setUpScene(currentState);
		//gameBegins = false;
	 
	  
	  }
      break;
	case sceneStates.LOSE:
	  if (keyOn) {
		  currentState = sceneStates.GAME;
		  setUpScene(currentState);
		  //gameBegins = true;
	  
	  }
	   break;	
    default:
      break;
  
}
	}
	

		
function setUpScene() {
  switch (currentState) {
    case sceneStates.INTRO:
      break;
	case sceneStates.TUTORIAL:
      break;
    case sceneStates.GAME:
      break;
    case sceneStates.END:
      break;
    default:
      break;
  }
}

function mousePressed() {
  keyOn = true;
}

