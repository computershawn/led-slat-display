"use strict";

let strips = [];
let canv;
let p5graphix;
let tick;
const STEP = .09;
const DIAM = 3;
const NUM_STRIPS = 10;
const LEDS_PER = 32;
const HSPACING = 8;
const VSPACING = (LEDS_PER - 1) * HSPACING / (NUM_STRIPS - 1);
let noiseImage;
let noiseField;
let mX = 0;
let mY = 0;
let rowOffsets = [];
for(let i = 0; i < NUM_STRIPS; i++) {
    let n = Math.random() * (2 * Math.PI) - Math.PI;
    rowOffsets.push(n);
}

let host;
let port;
let connection;
let button01;
let byteArr;
let colorMode;
let arrayToSend;
let connected = false;

let animationMode = 1;


let socket;
