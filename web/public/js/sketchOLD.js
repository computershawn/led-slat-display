const ROWS = 12;
const COLS = 12;
const SPACING = 36;
const GRID_WD = (COLS - 1) * SPACING;
const GRID_HT = (ROWS - 1) * SPACING;

//draw a plane with width 50 and height 50
function setup() {
  createCanvas(480, 480, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  //plane(50, 50);

  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 250, 250, -dirX, -dirY, 0.25);
  ambientMaterial(250);
  for(let i = 0; i < ROWS; i++) {
    let y = i * SPACING - GRID_HT/2;
    for(let j = 0; j < COLS; j++) {
      let x = j * SPACING - GRID_WD/2;
      push();
      translate(x, y, 0);
      sphere(8, 12, 8);
      pop();
    }
  }
  //sphere(10, 12, 8);
  //translate(100, 0, 0);
  //box(24, 48, 96);

  //point(100, 100, 10);
}