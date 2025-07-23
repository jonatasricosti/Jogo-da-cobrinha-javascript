const canvas = document.getElementById('Janela');
const ctx = canvas.getContext('2d');


// para o framerate
const FPS = 16;
const FRAME_DURATION = 1000 / FPS;

// os estados de tela do jogo
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


  const AppleSound = new Audio('sounds/Apple_Crunch_16.wav');

  // toca som
  function PlaySound()
  {
    AppleSound.currentTime = 0;
    AppleSound.play();
  } 


  // use essa função pra limpar a tela
  function ClearScreen()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  // use essa função pra desenhar uma imagem na tela
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


// esse objeto representa o cursor do menu
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


// desenha o background na tela
function DrawBackground()
{
    DrawImage(0,0,fundoImage);
}

let pontos = 0;
let record = 0;
let playsound = 0; // decide se pode tocar som ou não
let rectW = 10;
let rectH = 10;

// esse objeto representa a cobrinha
const ALL_DOTS = 900;

    let snake =
    {
        x: Array(ALL_DOTS),
        y: Array(ALL_DOTS),
        vx: rectW,
        vy: 0,
        size: 3
    };

// monstra os pontos, tamanho, record
function DrawHUD()
{
    DrawText(0,301,blackfontImage, "Seus Pontos: ",16,32);
    DrawText(200,301,greenfontImage, pontos.toString(),16,32);

    DrawText(0,301+22,blackfontImage, "Seu Record: ",16,32);
    DrawText(200,301+22,greenfontImage, record.toString(),16,32);

    DrawText(0,301+2*22,blackfontImage, "Seu Tamanho: ",16,32);
    DrawText(200,301+2*22,greenfontImage, snake.tamanho.toString(),16,32);

    if(playsound == 1)
    {
        DrawText(0,301+3*22,blackfontImage, "Som ativado",16,32);
    }

    else if(playsound == 0)
    {
        DrawText(0,301+3*22,blackfontImage, "Som desativado",16,32);
    }

    if(pontos > record)
    {
        record = pontos;
    }
}




// esse objeto representa a comida da cobrinha, ou seja, a maça
const apple = {x: 0, y: 0};


// inicia a posição da comida em lugar aleatório
function PlaceApple()
{
    let r = 0;

    r = Math.floor(Math.random() * 30); // gera um número aleatório entre 0 até 29
    apple.x = r*rectW;

    r = Math.floor(Math.random() * 30); // gera um número aleatório entre 0 até 29
    apple.y = r*rectH;

    
    for(let z = snake.tamanho; z > 0; z--)
    {
        // Verifique se a comida se sobrepõe à nossa cobrinha
        if(apple.x == snake.x[z] && apple.y == snake.y[z])
        {
            PlaceApple();
            break;
        }
    }
}

// desenha a cobrinha na tela
function DrawSnake()
{
    for(let i = 0; i < snake.tamanho; i++)
    {
        DrawImage(snake.x[i], snake.y[i], cobrinhaImage);
    }
}

// desenha a comida ou a maça na tela
function DrawApple()
{
    DrawImage(apple.x,apple.y,appleImage);
}

// desenha o jogo na tela
function DrawGame()
{
    DrawBackground();
    DrawHUD();
    DrawSnake();
    DrawApple();
}

// desenha o pause na tela
function DrawPause()
{
    DrawGame();
    DrawText(110,110,whitefontImage, "Pause", 16,32);
}

// inicia a posição, velocidade, tamanho da cobrinha
function ResetGame()
{
    snake.tamanho = 3;
    pontos = 0;
    // inicia as posições da cobrinha
    for(let i = 0; i < snake.tamanho; i++)
    {
        snake.x[i] = 50 - i*rectW;
        snake.y[i] = 50;

        snake.vx = rectW;
        snake.vy = 0;
    }
}


// use essa função pra física e controle do jogo
function UpdateGame()
{
    // faz o corpo ir atrás da cabeça da cobrinha
    for(let z = snake.tamanho; z > 0; z--)
    {
        snake.x[z] = snake.x[(z-1)];
        snake.y[z] = snake.y[(z-1)];

        // se a cabeça da cobrinha se tocar
        if((z > 4) && (snake.x[0] == snake.x[z]) && (snake.y[0] == snake.y[z]))
        {
            ResetGame();
        }
    }

    // move a cabeça da cobrinha
    snake.x[0] = snake.x[0] + snake.vx;
    snake.y[0] = snake.y[0] + snake.vy;

    if(tecla === 'ArrowLeft' && snake.vx <= 0)
    {
        snake.vx = -rectW;
        snake.vy = 0;
        tecla = null;
    }

    else if(tecla === 'ArrowRight' && snake.vx >= 0)
    {
        snake.vx = rectW;
        snake.vy = 0;
        tecla = null;
    }

    else if(tecla === 'ArrowUp' && snake.vy <= 0)
    {
        snake.vx = 0;
        snake.vy = -rectH;
        tecla = null;
    }

    else if(tecla === 'ArrowDown' && snake.vy >= 0)
    {
        snake.vx = 0;
        snake.vy = rectH;
        tecla = null;
    }

    // ativa/desativa o som
    else if(tecla === 's')
    {
        playsound = !playsound;
        tecla = null;
    }

    // colisões nas bordas da tela
    // lado esquerdo, lado direto, em cima, em baixo da tela
    if(snake.x[0] < 0 ||
       snake.x[0] > canvas.width - rectW ||
       snake.y[0] < 0 ||
       snake.y[0] > canvas.height - rectH - 100)
    {
        ResetGame();
    }
}

// use essa função pra ver se a cobrinha comeu a comida
function CollideWithSnake()
{
    // se cabeça da cobrinha colidir com a comida
    if((snake.x[0] == apple.x) && (snake.y[0] == apple.y))
    {
        snake.tamanho = snake.tamanho+1;
        pontos = pontos+1;
        PlaceApple();
        if(playsound == 1)
        {
            PlaySound();
        }
    }
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



  // começo do programa
  LoadFiles();
  PlaceApple();
  ResetGame();



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