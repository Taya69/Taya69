var canvas = document.getElementById("canvas");
ctx       = canvas.getContext('2d'); // Контекст

var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image(); // Создание объекта
var pipeUp = new Image(); // Создание объекта
var pipeBottom = new Image(); // Создание объекта
var fly = new Audio ();
var score_ = new Audio ();


bg.src = "img/flappy_bird_bg.png"; // Аналогично
bird.src = "img/flappy_bird_bird.png"; // Указание нужного изображения
fg.src = "img/flappy_bird_fg.png"; // Аналогично
pipeUp.src = "img/flappy_bird_pipeUp.png"; // Аналогично
pipeBottom.src = "img/flappy_bird_pipeBottom.png"; // Аналогично
fly.src = "audio/fly.mp3";
score_.src = "audio/score.mp3";

var gap = 90;
var score = 0;

document.addEventListener("keydown", moveUp);
function moveUp (){
  yPos -= 25;
  fly.play();
}
var xPos = 10;
var yPos = 150;
var grav = 1.5;
var pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0
}
function draw() {
 ctx.drawImage(bg, 0, 0);
 for (var i =0; i<pipe.length; i++){
   ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
   ctx.drawImage(pipeBottom, pipe[i].x,pipe[i].y+ pipeUp.height + gap);
   pipe[i].x--;
   if(pipe[i].x== 50) {
     pipe.push({
       x: canvas.width,
       y: Math.floor(Math.random()*pipeUp.height) - pipeUp.height
     });
   }
   if(xPos+ bird.width >= pipe[i].x &&
   xPos<= pipe[i].x+ pipeUp.width &&(
   yPos<= pipe[i].y + pipeUp.height ||
 yPos + bird.height>= pipe[i].y + pipeUp.height + gap) ||
 yPos + bird.height >= canvas.height - fg.height){
   location.reload();
 }
 if (pipe[i].x == 5){
   score++;
   score_.play();
 }
 }

 ctx.drawImage(fg, 0,canvas.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);
 yPos += grav;
 ctx.fillStyle = "#000";
 ctx.font = "20px Verdana";
 ctx.fillText("Счёт: "+ score, 10, canvas.height - 20);
 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
