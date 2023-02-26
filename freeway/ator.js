//Código do Ator
let xAtor = 86;
let yAtor = 366;
let colisao = false;
let meusPontos = 0;

function mostraAtor(){
  image(imagemDoAtor, xAtor, yAtor, 30, 30);
}

function movimentaAtor(){
  if (keyIsDown(UP_ARROW)){
    yAtor -= 3;
  }
  if (keyIsDown(DOWN_ARROW)){
  	if (podeSeMover()){
  	yAtor += 3;
    }
    }
}

function verificaColisao(){
  for (let i = 0; i <imagemCarros.length; i ++){
    colisao = collideRectCircle(xCarros[i], yCarros[i], cCarro, aCarro, xAtor, yAtor, 15);
  if (colisao){
    atorPosicaoInicial();
    somDaColisao.play();
  if (pontosMaiorQueZero()){
    meusPontos -= 1; 
   }
  }
 }
}

function atorPosicaoInicial(){
  yAtor = 366;
}

function incluiPontos(){
  fill(color(255,0,255))
  textAlign(CENTER);
  textSize(25);
  text(meusPontos, width / 5, 27);
}

function marcaPonto(){
  if (yAtor < 15){
    meusPontos += 1;
    somDoPonto.play();
    atorPosicaoInicial();
  }
}

function pontosMaiorQueZero(){
  return meusPontos > 0
}

function podeSeMover(){
  return yAtor < 366;
}









