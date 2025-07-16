const canvas = document.getElementById('Janela');
const ctx = canvas.getContext('2d');

const tutorialImage = new Image();
const appleImage = new Image();


let imagesLoaded = 0;
  function onImageLoad()
  {
    imagesLoaded++;
    if (imagesLoaded === 2)
    {
      requestAnimationFrame(gameLoop);
    }
  }

  tutorialImage.onload = onImageLoad;
  appleImage.onload = onImageLoad;


  // use essa função pra carregar arquivos
  // nota: essa função só deve ser chamada no começo do program
  function LoadFiles()
  {
  	tutorialImage.src = 'gfx/tutorial.bmp';
  	appleImage.src = 'gfx/apple.bmp';
  }

  LoadFiles();


  // // use essa função pra desenhar uma imagem na tela
  function DrawImage(x, y, image)
  {
    ctx.drawImage(image, x, y);
  }



  // game loop
  function gameLoop()
  {

    DrawImage(0, 0, tutorialImage);
    DrawImage(20, 80, appleImage);

    requestAnimationFrame(gameLoop);
  }