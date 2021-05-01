var BackgroundIMG, Gun, GunIMG, Obstacle1, Obstacle2, Obstacle3, Obstacle4,
  Obstacle5, Obstacle6, ObstacleIMG, Target1, Bullet, Counter, TargetIMG, HitTargetIMG

var Timer, gameState = "play", restartButton, restartButtonIMG;


function preload() {
  BackgroundIMG = loadImage("./BG.jpg");
  GunIMG = loadImage("./Gun.png");
  ObstacleIMG = loadImage("./Obstacle.png");
  TargetIMG = loadImage("./Target.png");
  HitTargetIMG = loadImage("./HitTarget.png");
  restartButtonIMG = loadImage ("./Restart.png");

}

function setup() {
  createCanvas(800, 400);

  leftEdge = createSprite(-420, height / 2, 10, 400)
  rightEdge = createSprite(1220, height / 2, 10, 400)


  Target1 = createSprite(-250, height / 2 - 2.5, 50, 50);
  Target1.addImage(TargetIMG)
  Target1.scale = 0.075

  Target2 = createSprite(250, height / 2 - 2.5, 50, 50);
  Target2.addImage(TargetIMG)
  Target2.scale = 0.075

  Target3 = createSprite(500, height / 2 - 2.5, 50, 50);
  Target3.addImage(TargetIMG)
  Target3.scale = 0.075

  Target4 = createSprite(1000, height / 2 - 2.5, 50, 50);
  Target4.addImage(TargetIMG)
  Target4.scale = 0.075


  Target1.velocityX = -5;
  Target2.velocityX = -5;
  Target3.velocityX = -5;
  Target4.velocityX = -5;


  Obstacle1 = createSprite(-250, height / 2 - 2.5, 50, 100)
  Obstacle1.addImage(ObstacleIMG);
  Obstacle1.scale = 0.65


  Obstacle2 = createSprite(0, height / 2 - 2.5, 50, 100)
  Obstacle2.addImage(ObstacleIMG);
  Obstacle2.scale = 0.65

  Obstacle3 = createSprite(250, height / 2 - 2.5, 50, 100)
  Obstacle3.addImage(ObstacleIMG);
  Obstacle3.scale = 0.65

  Obstacle4 = createSprite(500, height / 2 - 2.5, 50, 100)
  Obstacle4.addImage(ObstacleIMG);
  Obstacle4.scale = 0.65

  Obstacle5 = createSprite(750, height / 2 - 2.5, 50, 100)
  Obstacle5.addImage(ObstacleIMG);
  Obstacle5.scale = 0.65

  Obstacle6 = createSprite(1000, height / 2 - 2.5, 50, 100)
  Obstacle6.addImage(ObstacleIMG);
  Obstacle6.scale = 0.65

  Gun = createSprite(400, 360, 20, 250);
  Gun.addImage(GunIMG);
  Gun.scale = 0.3
  Gun.shapeColor = "white";
  //sprite.rotateToDirection
  Gun.rotation = 180;
  Gun.rotateToDirection = true;
  Gun.depth = 20


  BulletGroup = new Group()
  ObstacleGroup = new Group()

  ObstacleGroup.add(Obstacle1)
  ObstacleGroup.add(Obstacle2)
  ObstacleGroup.add(Obstacle3)
  ObstacleGroup.add(Obstacle4)
  ObstacleGroup.add(Obstacle5)
  ObstacleGroup.add(Obstacle6)

  Timer = 0

  restartButton = createSprite (camera.position.x, 200, 50, 50)
  restartButton.addImage (restartButtonIMG) ;
    restartButton.visible=false ;
    restartButton.scale = 0.05
}


function draw() {


  

  background("black");
  imageMode(CENTER);
  image(BackgroundIMG, width / 2, height / 2, 1620, 400)



  strokeWeight(5);
  line(-500, height / 2 + 50, 1620, height / 2 + 50);

  textSize(32);
  fill("white");
  text(Timer, camera.position.x - 350, 40);

  if (gameState === "play") {

    Timer = Timer + 1;
restartButton.visible=false
    
    if (keyDown(RIGHT_ARROW) && camera.position.x <= 800) {

      camera.position.x = camera.position.x + 10
      Gun.position.x = camera.position.x - 10;
      // if (Bullet.y === 360) {
      // Bullet.position.x = camera.position.x -10;
      // }
    }

    if (keyDown(LEFT_ARROW) && camera.position.x >= 0) {

      camera.position.x = camera.position.x - 10
      Gun.position.x = camera.position.x + 10
      //if (Bullet.y === 360) {
      // Bullet.position.x = camera.position.x +10;
      // }
    }

    if (keyDown("A") && Gun.rotation >= 120) {
      Gun.rotation = Gun.rotation - 5;

    }

    if (keyDown("D") && Gun.rotation <= 240) {
      Gun.rotation = Gun.rotation + 5;

    }



    if (keyWentDown("space")) {

      Bullet = createSprite(Gun.x, 360, 7, 7);
      Bullet.depth = 19
      Bullet.shapeColor = "red"

      Bullet.setSpeedAndDirection(10, Gun.rotation + 90);
      BulletGroup.add(Bullet);


    }


    Target1.bounceOff(leftEdge)
    Target2.bounceOff(leftEdge)
    Target3.bounceOff(leftEdge)
    Target4.bounceOff(leftEdge)

    Target1.bounceOff(rightEdge)
    Target2.bounceOff(rightEdge)
    Target3.bounceOff(rightEdge)
    Target4.bounceOff(rightEdge)



    if (!ObstacleGroup.isTouching(BulletGroup)) {

      // Target1.velocityX = Target1.velocityX 
      // Target2.velocityX = Target2.velocityX 
      // Target3.velocityX = Target3.velocityX 
      // Target4.velocityX = Target4.velocityX 
      BulletHit(Target1)
      BulletHit(Target2)
      BulletHit(Target3)
      BulletHit(Target4)
    }

    if (ObstacleGroup.isTouching(BulletGroup)) {

      BulletGroup.destroyEach()


    }

    if (Target1.velocityX === 0 && Target2.velocityX === 0 && Target3.velocityX === 0 && Target4.velocityX === 0) {


      gameState = "end"
    }

  }
  else if (gameState === "end") {

   
    textSize (20)
   
    text("Game Over, Congrats!! Time Taken: " + Timer + ". Try being faster Next Time!", camera.position.x- 300, 100);
    
    restartButton.visible=true;
    restartButton.x = camera.position.x ;

    if (mousePressedOver(restartButton)) {
      gameState = "play" ;
      Timer= 0
  Target1.velocityX = -5;
  Target2.velocityX = -5;
  Target3.velocityX = -5;
  Target4.velocityX = -5;
  Target1.addImage(TargetIMG)
  Target2.addImage(TargetIMG)
  Target3.addImage(TargetIMG)
  Target4.addImage(TargetIMG)


 

     

    }
    
    

  }

  console.log (gameState)

  drawSprites();
}

function BulletHit(Target) {

  if (BulletGroup.isTouching(Target)) {

    Target.velocityX = 0;
    BulletGroup.destroyEach()

    Target.addImage(HitTargetIMG);

  

  }


}





// Things to add:
// - Timer
// -Show time taken at end with "Game Over"
// -Create restart button
