const canvas = document.getElementById('Janela');
const ctx = canvas.getContext('2d');


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
  // nota: essa função só deve ser chamada no começo do program
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



  // game loop
  function gameLoop()
  {

    DrawImage(0, 0, tutorialImage);

    DrawImageFrame(0,0,whitefontImage,16,16,65-32);
    DrawText(0,18,greenfontImage,"Eu gosto de programar",16,32);
    DrawText(0,36,greenfontImage,"C++ é muito bom",16,32);

    requestAnimationFrame(gameLoop);
  }