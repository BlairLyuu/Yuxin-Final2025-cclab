let character = {
  hair: [],
  face: [],
  clothes: [],
  skin: []
};

let icons = {
  hair: [],
  face: [],
  clothes: [],
  skin: []
};

let categoryButtons = {
  skin: null,
  hair: null,
  face: null,
  clothes: null
};

let backgrounds = [];
let uiLayer;
let ulbianLayer;

let bgMusic;
let musicStarted = false;

let current = {
  hair: 0,
  face: 0,
  clothes: 0,
  skin: 0,
  background: 0
};

let currentCategory = 0;
let categories = ['skin', 'hair', 'face', 'clothes'];

// 缩放
let scaleFactor = 0.3;
let fullWidth = 1668;
let fullHeight = 2224;

function preload() {
  uiLayer = loadImage('ui.png');
  ulbianLayer = loadImage('Ulbian.png');
  
  // 加载背景音乐
  bgMusic = loadSound('music1.mp3');
  
  //category buttons
  categoryButtons.skin = loadImage('SKIN.png');
  categoryButtons.hair = loadImage('HAIR.png');
  categoryButtons.face = loadImage('FACE.png');
  categoryButtons.clothes = loadImage('CLOTHES.png');
  
  //character parts
  character.hair[0] = loadImage('HB0.png');
  character.hair[1] = loadImage('HW0.png');
  character.hair[2] = loadImage('HL0.png');
  character.hair[3] = loadImage('HD0.png');
  
  character.face[0] = loadImage('FR0.png');
  character.face[1] = loadImage('FU0.png');
  character.face[2] = loadImage('FA0.png');
  character.face[3] = loadImage('FB0.png');
  
  character.clothes[0] = loadImage('clP0.png');
  character.clothes[1] = loadImage('clB0.png');
  character.clothes[2] = loadImage('clW0.png');
  character.clothes[3] = loadImage('clR0.png');
  
  character.skin[0] = loadImage('skinG.png');
  character.skin[1] = loadImage('skinB.png');
  character.skin[2] = loadImage('skinP.png');
  character.skin[3] = loadImage('skinD.png');
  
  // Load icons
  icons.hair[0] = loadImage('HB.png');
  icons.hair[1] = loadImage('HW.png');
  icons.hair[2] = loadImage('HL.png');
  icons.hair[3] = loadImage('HD.png');
  
  icons.face[0] = loadImage('FR.png');
  icons.face[1] = loadImage('FU.png');
  icons.face[2] = loadImage('FA.png');
  icons.face[3] = loadImage('FB.png');
  
  icons.clothes[0] = loadImage('clP.png');
  icons.clothes[1] = loadImage('clB.png');
  icons.clothes[2] = loadImage('clW.png');
  icons.clothes[3] = loadImage('clR.png');
  
  icons.skin[0] = loadImage('sG.png');
  icons.skin[1] = loadImage('sB.png');
  icons.skin[2] = loadImage('sP.png');
  icons.skin[3] = loadImage('sD.png');
  
  // Load backgrounds
  backgrounds[0] = loadImage('1.png');
  backgrounds[1] = loadImage('2.png');
  backgrounds[2] = loadImage('3.png');
  backgrounds[3] = loadImage('4.png');
}

function setup() {
  createCanvas(fullWidth * scaleFactor, fullHeight * scaleFactor);
  imageMode(CORNER);
  randomizeOutfit();
  
  // 音乐音量和循环
  bgMusic.setVolume(0.3);
  bgMusic.loop();
}

function draw() {
  background(255);  

  if (backgrounds[current.background]) {
    image(backgrounds[current.background], 0, 0, width, height);
  }

  if (character.skin[current.skin]) {
    image(character.skin[current.skin], 0, 0, width, height);
  }

  if (character.clothes[current.clothes]) {
    image(character.clothes[current.clothes], 0, 0, width, height);
  }

  if (character.face[current.face]) {
    image(character.face[current.face], 0, 0, width, height);
  }

  if (character.hair[current.hair]) {
    image(character.hair[current.hair], 0, 0, width, height);
  }
  
  if (uiLayer) {
    image(uiLayer, 0, 0, width, height);
  }
  
  if (ulbianLayer) {
    image(ulbianLayer, 0, 0, width, height);
  }
  
  drawIconGallery();
  drawCategoryButtons();
  drawHints();
}

function drawCategoryButtons() {
  // 原始位置缩小
  let buttonY = 1480 * scaleFactor;
  let buttonWidth = 300 * scaleFactor;
  let buttonHeight = 90 * scaleFactor;
  let spacing = 42 * scaleFactor;
  let totalWidth = buttonWidth * 4 + spacing * 3;
  let startX = (width - totalWidth) / 2;
  
  for (let i = 0; i < categories.length; i++) {
    let x = startX + i * (buttonWidth + spacing);
    let categoryName = categories[i];
    
    // Selection highlight
    if (i === currentCategory) {
      fill(180, 210, 240, 120);
      noStroke();
      rect(x + 5, buttonY, buttonWidth - 10, buttonHeight, 10);
    }
    
    // Button image
    if (categoryButtons[categoryName]) {
      image(categoryButtons[categoryName], x + 10, buttonY + 5, buttonWidth - 20, buttonHeight - 10);
    }
  }
}

function drawIconGallery() {
  let galleryY = 1700 * scaleFactor;
  let iconSize = 350 * scaleFactor;
  let spacing = 42 * scaleFactor;
  let totalWidth = iconSize * 4 + spacing * 3;
  let startX = (width - totalWidth) / 2;
  
  let categoryName = categories[currentCategory];
  let currentIcons = icons[categoryName];
  
  for (let i = 0; i < 4; i++) {
    let x = startX + i * (iconSize + spacing);
    
    // Selection highlight
    if (current[categoryName] === i) {
      fill(180, 210, 240, 150);
      stroke(100, 150, 200);
      strokeWeight(1.5);
      rect(x - 10, galleryY - 10, iconSize + 20, iconSize + 20, 15);
    }
    
    // Icon image
    noStroke();
    if (currentIcons[i]) {
      image(currentIcons[i], x, galleryY, iconSize, iconSize);
    }
  }
}

function drawHints() {
  fill(38, 62, 150);
  textSize(14);
  textAlign(CENTER);
  noStroke();
  text('Press B to change background | Press R to randomize | Press F to save', width/2, 20);
}

function mousePressed() {

  //category button clicks
  let buttonY = 1480 * scaleFactor;
  let buttonWidth = 300 * scaleFactor;
  let buttonHeight = 90 * scaleFactor;
  let spacing = 42 * scaleFactor;
  let totalWidth = buttonWidth * 4 + spacing * 3;
  let startX = (width - totalWidth) / 2;
  
  for (let i = 0; i < categories.length; i++) {
    let x = startX + i * (buttonWidth + spacing);
    
    if (mouseX > x && mouseX < x + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      currentCategory = i;
      console.log('Switched to category: ' + categories[i]);
      return;
    }
  }
  
  //icon clicks
  checkIconClick();
}

function checkIconClick() {
  let galleryY = 1700 * scaleFactor;
  let iconSize = 350 * scaleFactor;
  let spacing = 42 * scaleFactor;
  let totalWidth = iconSize * 4 + spacing * 3;
  let startX = (width - totalWidth) / 2;
  
  let categoryName = categories[currentCategory];
  
  for (let i = 0; i < 4; i++) {
    let x = startX + i * (iconSize + spacing);
    
    if (mouseX > x && mouseX < x + iconSize &&
        mouseY > galleryY && mouseY < galleryY + iconSize) {
      current[categoryName] = i;
      console.log('Switched ' + categoryName + ' to ' + i);
    }
  }
}

function keyPressed() {
  // F save
  if (key === 'f' || key === 'F') {
    saveCharacter();
  }
  
  // B key: cycle background
  if (key === 'b' || key === 'B') {
    current.background = (current.background + 1) % 4;
    console.log('Background: ' + current.background);
  }
  
  // R randomize
  if (key === 'r' || key === 'R') {
    randomizeOutfit();
  }
}

function saveCharacter() {
  let cropX = -48;
  let cropY = -7;
  let cropW = 1764;
  let cropH = 1474;
  
  let canvasW = fullWidth;
  let canvasH = fullHeight;
  
  let actualX = max(0, cropX);
  let actualY = max(0, cropY);
  let actualW = min(canvasW - actualX, cropX + cropW - actualX);
  let actualH = min(canvasH - actualY, cropY + cropH - actualY);
  
  let fullCanvas = createGraphics(canvasW, canvasH);
  
  //all layers
  if (backgrounds[current.background]) {
    fullCanvas.image(backgrounds[current.background], 0, 0);
  }
  
  if (character.skin[current.skin]) {
    fullCanvas.image(character.skin[current.skin], 0, 0);
  }
  
  if (character.clothes[current.clothes]) {
    fullCanvas.image(character.clothes[current.clothes], 0, 0);
  }
  
  if (character.face[current.face]) {
    fullCanvas.image(character.face[current.face], 0, 0);
  }
  
  if (character.hair[current.hair]) {
    fullCanvas.image(character.hair[current.hair], 0, 0);
  }
  
  if (ulbianLayer) {
    fullCanvas.image(ulbianLayer, 0, 0);
  }
  
  // Crop
  let cropped = fullCanvas.get(actualX, actualY, actualW, actualH);
  
  let timestamp = year() + '-' + month() + '-' + day() + '_' + 
                  hour() + '-' + minute() + '-' + second();
  save(cropped, 'character_' + timestamp + '.png');
  
  console.log('Character saved!');
}

function randomizeOutfit() {
  current.hair = floor(random(4));
  current.face = floor(random(4));
  current.clothes = floor(random(4));
  current.skin = floor(random(4));
  current.background = floor(random(4));
  
  console.log('Randomized!');
}