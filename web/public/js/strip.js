"use strict";

class Strip {
  constructor(rowNum) {
    this.row = rowNum;
    this.rowOffset = rowOffsets[rowNum];
    this.leds = [];
    for(let i = 0; i < LEDS_PER; i++) {
      let x = (p5graphix.width - HSPACING * (LEDS_PER - 1)) / 2 + i * HSPACING;
      let y = (p5graphix.height - VSPACING * (NUM_STRIPS - 1)) / 2 + rowNum * VSPACING;
      let led = new LED(x, y);
      this.leds.push(led);
    }
  }

  updateStripWavy() {
    let stripArray = getWaveStrip(this.rowOffset);
    stripArray.map((shade, index) => {this.leds[index].updateLED(shade)});
    if(this.row % 2 === 1) stripArray = transpose(stripArray);
    return stripArray;
  }

  updateStripNoisy() {
    let stripArray = getNoiseStrip(this.row);
    stripArray.map((shade, index) => {this.leds[index].updateLED(shade)});
    if(this.row % 2 === 1) stripArray = transpose(stripArray);    
    return stripArray;
  }

  renderStrip() {
    for(let i = 0; i < this.leds.length; i++) {
      this.leds[i].renderLED();
    }
  }
}