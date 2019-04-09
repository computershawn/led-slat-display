"use strict";

function getWaveStrip(rowOffset) {
  let temp = [];
  for(let i = 0; i < LEDS_PER; i++) {
    let angle = 2 * Math.PI * i / LEDS_PER + rowOffset + tick;
    let shade = (cos(angle) / 2 + 0.5) * 225 + 30;
    //temp.push(shade);
    temp.push(round(shade));
  }
  return temp;
}
