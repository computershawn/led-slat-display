"use strict";

class LED {
  constructor(x, y) {
    this.position = createVector(x, y);
    //let temp = round(random(0, 255));
    //let red = round(random(0, 255));
    //let grn = round(random(0, 255));
    //let blu = round(random(0, 255));
    this.color = color(0);
  }

  // For starters let's just use
  // varying shades of white;
  updateLED(co) {
    this.color = color(255, co);
  }

  // renderLED() {
  //   p5graphix.fill(this.color);
  //   p5graphix.rect(this.position.x, this.position.y, DIAM, DIAM);
  //   //p5graphix.rect(this.position.x, this.position.y, 8, DIAM);
  // }
 
  renderLED() {
    let a0 = alpha(this.color);
    let a1 = a0 * .85;
    let a2 = a0 * .80;
    let a3 = a0 * .75;

    p5graphix.fill(255, a0);
    p5graphix.ellipse(this.position.x, this.position.y, DIAM, DIAM);

    p5graphix.fill(255, a1);
    p5graphix.rect(this.position.x-1.5, this.position.y, DIAM, DIAM);
    p5graphix.rect(this.position.x+1.5, this.position.y, DIAM, DIAM);

    p5graphix.fill(255, a2);
    p5graphix.rect(this.position.x-2.5, this.position.y, DIAM, DIAM);
    p5graphix.rect(this.position.x+2.5, this.position.y, DIAM, DIAM);

    p5graphix.fill(255, a3);
    p5graphix.rect(this.position.x-3.5, this.position.y, DIAM, DIAM);
    p5graphix.rect(this.position.x+3.5, this.position.y, DIAM, DIAM);
  }  
}