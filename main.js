const canvas = document.getElementById('Janela');
const ctx = canvas.getContext('2d');


const FPS = 16;
const FRAME_DURATION = 1000 / FPS;

let MENU = 0;
let TUTORIAL = 1;
let ABOUT = 2;
let PAUSE = 3;
let GAME = 4;
let game_estado = MENU;


const blackfontImage = new Image();
const bluefontImage = new Image();
const greenfontImage = new Image();
const greyfontImage = new Image();
const whitefontImage = new Image();

const fundoImage = new Image();
const tutorialImage = new Image();
const cobrinhaImage = new Image();
const appleImage = new Image();
const cursorImage = new Image();


let imagesLoaded = 0;
  function onImageLoad()
  {
    imagesLoaded++;
    if (imagesLoaded === 10)
    {
      requestAnimationFrame(gameLoop);
    }
  }

  blackfontImage.onload = onImageLoad;
  bluefontImage.onload  = onImageLoad;
  greenfontImage.onload = onImageLoad;
  greyfontImage.onload  = onImageLoad;
  whitefontImage.onload = onImageLoad;

  fundoImage.onload    = onImageLoad;
  tutorialImage.onload = onImageLoad;
  cobrinhaImage.onload = onImageLoad;
  appleImage.onload    = onImageLoad;
  cursorImage.onload   = onImageLoad;


  // use essa função pra carregar arquivos
  // nota: essa função só deve ser chamada no começo do programa
  function LoadFiles()
  {

    blackfontImage.src = 'fontes/blackfont.png';
    bluefontImage.src  = 'fontes/bluefont.png';
    greenfontImage.src = 'fontes/greenfont.png';
    greyfontImage.src  = 'fontes/greyfont.png';
    whitefontImage.src = 'fontes/whitefont.png';

    fundoImage.src    = 'gfx/fundo.png';
    tutorialImage.src = 'gfx/tutorial.png';
    cobrinhaImage.src = 'gfx/cobrinha.png';
    appleImage.src    = 'gfx/apple.png';
    cursorImage.src   = 'gfx/cursor.png';
  }

  LoadFiles();

  // use essa função pra limpar a tela
  function ClearScreen()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  // // use essa função pra desenhar uma imagem na tela
  function DrawImage(x, y, image)
  {
    ctx.drawImage(image, x, y);
  }

  // use essa função pra desenhar uma imagem cortada na tela
  function DrawImageFrame(x, y, sourceImage, frameWidth, frameHeight, FrameIndex)
  {
    const cols = Math.floor(sourceImage.width / frameWidth);
    const sx = (FrameIndex % cols)*frameWidth;
    const sy = Math.floor(FrameIndex / cols) * frameHeight;

    ctx.drawImage(sourceImage, sx, sy, frameWidth, frameHeight, x,y,frameWidth, frameHeight);
  }


  // use essa função pra desenhar texto na tela
  function DrawText(x,y,sourceImage,text,charSize,StarCharASCIICode)
  {
    for(let i = 0; i < text.length; i++)
    {
      const FrameIndex = text.charCodeAt(i) - StarCharASCIICode;
      DrawImageFrame(x + i*charSize, y, sourceImage, charSize, charSize, FrameIndex);
    }
  }


const cursor = {x: 0, y: 0};

  let tecla = null;
  window.addEventListener('keydown', function(event)
  {
  tecla = event.key;
});


  let index = 0; // pra mudar a posição do cursor do menu

  // use essa função pra desenhar e controlar o menu na tela
function DrawMenuAndUpdateMenu()
{
    const options = ["Jogar", "Tutorial", "Sobre", "Sair"];

    const NumberOfNames = options.length;

    let dist = 30;
    let x = 0;
    let y = 0;
    let NumberOfLetters = 0;
    cursor.x = 0;
    cursor.y = 0;

    // programação do teclado
    if(tecla === 'ArrowUp')
    {
        index = index-1;
        tecla = null;
    }

    if(tecla === 'ArrowDown')
    {
        index = index+1;
        tecla = null;
    }

    if(index > NumberOfNames - 1)
    {
        index = 0;
    }

    if(index < 0)
    {
        index = NumberOfNames - 1;
    }

    if(index == 0 && tecla === 'Enter')
    {
        game_estado = GAME;
        tecla = null;
    }

    if(index == 1 && tecla === 'Enter')
    {
        game_estado = TUTORIAL;
        tecla = null;
    }

    if(index == 2 && tecla === 'Enter')
    {
        game_estado = ABOUT;
        tecla = null;
    }

    if(index == 3 && tecla === 'Enter')
    {
        // fecha o programa
        //executando = false;
      tecla = null;
    }

    for(let i = 0; i < NumberOfNames; i++)
    {
        NumberOfLetters = options[i].length;

        x = (canvas.width - 16*NumberOfLetters)/2;
        y = 120;

        // valor selecionado
        if(index == i)
        {
            cursor.x = 45;
            cursor.y = y + (dist*i)-2;
            DrawImage(cursor.x,cursor.y,cursorImage);
            DrawText(x, y+(dist*i), bluefontImage, options[i], 16, 32);
        }

        // valor não selecionado
        else
        {
            DrawText(x, y+(dist*i), greyfontImage, options[i], 16, 32);
        }
    }
}


// desenha o tutorial na tela
function DrawTutorial()
{
    DrawImage(0,0,tutorialImage);
}

// os comandos do tutorial
function updateTutorial()
{

    if(tecla === 'Escape')
    {
      game_estado = MENU;
      tecla = null;
    }
}

// desenha o about na tela
function DrawAbout()
{
    DrawText(0,0,whitefontImage, "Jogo da cobrinha", 16, 32);
    DrawText(0,32,whitefontImage, "Feito por", 16, 32);
    DrawText(0,64,whitefontImage, "Jonatas Ricosti", 16, 32);
    DrawText(0,96,whitefontImage, "Audio: Koops", 16, 32);
}

// os comandos de about
function updateAbout()
{
    if(tecla === 'Escape')
    {
      game_estado = MENU;
      tecla = null;
    }
}


function DrawGame()
{

}

// desenha o pause na tela
function DrawPause()
{
    DrawGame();
    DrawText(110,110,whitefontImage, "Pause", 16,32);
}


function UpdateGame()
{
}

function CollideWithSnake()
{

}


// use essa função pra trocar as telas do jogo
// nota: essa função deve ser respaldada
// pois ela é responsável por dar vida ao jogo
function RunGame()
{
    switch(game_estado)
    {
        case MENU: DrawMenuAndUpdateMenu(); break;
        case TUTORIAL: DrawTutorial(); updateTutorial(); break;
        case ABOUT: DrawAbout(); updateAbout(); break;
        case PAUSE: DrawPause(); break;
        case GAME: DrawGame(); UpdateGame(); CollideWithSnake(); break;
    }
}



  // game loop
  function gameLoop()
  {

    if(game_estado == GAME && tecla === 'Escape')
    {
      game_estado = PAUSE;
      tecla = null;
    }

    else if(game_estado == PAUSE && tecla === 'Escape')
    {
      game_estado = GAME;
      tecla = null;
    }
      

    ClearScreen();
    RunGame();

    setTimeout(gameLoop, FRAME_DURATION);
  }