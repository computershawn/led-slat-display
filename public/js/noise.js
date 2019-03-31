"use strict";

let noiseVal;
let noiseScale = 0.28;
const xRate = 0.16;
const yRate = 0.16;

function getNoiseStrip(stripNum) {
  let temp = [];
  for (let x = 0; x < LEDS_PER; x++) {
    noiseVal = noise((mX + x) * noiseScale, (mY + stripNum) * noiseScale);
    //temp.push(noiseVal * 255);
    temp.push(round(noiseVal * 255));
    // noiseImage.stroke(noiseVal * 255);
    // noiseImage.point(x, stripNum);
  }
  return temp;
}
