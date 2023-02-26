//Variáveis da Bolinha
let xBolinha = 300; //Eixo X
let yBolinha = 200; //Eixo Y
let dBolinha = 15; //Diâmetro
let rBolinha = dBolinha / 2; //Raio

//Variáveis da Velocidade da Bolinha
let vXBolinha = 6; //Velocidade da bolinha no eixo X
let vYBolinha = 6; //Velocidade da bolinha no eixo Y

//Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let cRaquete = 10; //Comprimento da raquete
let aRaquete = 90; //Altura da raquete

//Variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let vYOponente;

let colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

//Errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup(){
  createCanvas(600, 400);
  trilha.loop();
}

function draw(){
  background(0); //Desenha o background
  mostraBolinha(); //Desenha a bolinha
  movimentaBolinha(); //Movimenta a Bolinha
  verificaColisaoBorda(); //Verifica Colisão da bolinha
  mostraRaquete(xRaquete, yRaquete); //Desenha a raquete
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete(); //Habilitado movimento para a raquete
  movimentaRaqueteOponente();
  //movimentaRaqueteMultiplayer();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentaBolinha(){
  xBolinha += vXBolinha;
  yBolinha += vYBolinha;
}

function verificaColisaoBorda () {
  if (xBolinha + rBolinha > width || xBolinha  - rBolinha < 0){
    vXBolinha *= -1;
  }
  if (yBolinha + rBolinha > height || yBolinha - rBolinha < 0){
    vYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, cRaquete, aRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    if (upPodeSeMover()){
      yRaquete -= 10;
    }
  }
  if (keyIsDown(DOWN_ARROW)){
    if (downPodeSeMover()){
      yRaquete += 10;
    }
  }
}

function upPodeSeMover(){
  return yRaquete > 0;
}

function downPodeSeMover(){
  return yRaquete < 306;
}

//NPC
function movimentaRaqueteOponente(){
  vYOponente = yBolinha - yRaqueteOponente - cRaquete / 2 - 30;
  yRaqueteOponente += vYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  }
  else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

//Multiplayer
function movimentaRaqueteMultiplayer(){
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
  	yRaqueteOponente += 10;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, cRaquete, aRaquete, xBolinha, yBolinha, rBolinha);
  if (colidiu){
    vXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);  
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
  if (xBolinha - rBolinha < 0){
  	xBolinha = 23
  }
}