"use strict";




function setup() {
  // ...
  //button01 = createButton('connect to websocket');
  //button01.position(10, 10);
  //button01.mousePressed(sendToWebsocket);
  //button01.mousePressed(console.log("Need to add code to connect to websocket."));
  colorMode = 1;

  // ...
  byteArr = new Uint8Array(LEDS_PER * NUM_STRIPS * colorMode);
  //host = 'localhost';
  //host = '10.0.1.27';
  host = '127.0.0.1';
  //port = '5678';
  port = '8080';

  let wd = 320;
  let ht = 320;
  canv = createCanvas(wd, ht);
  p5graphix = createGraphics(wd, ht);
  noiseImage = createGraphics(LEDS_PER, NUM_STRIPS);
  noiseImage.noiseDetail(6, 0.125);

  // Initialize Strips...
  for(let i = 0; i < NUM_STRIPS; i++) {
    strips.push(new Strip(i));
  }


//socket = io();

  // ...
  tick = 0;
  p5graphix.rectMode(CENTER);
  p5graphix.noStroke();
  frameRate(30);
}

function draw() {
  background(0);
  play();
  image(p5graphix, 0, 0);
  //image(noiseImage, 0, 0, 128, 40);
}

function play() {
  arrayToSend = [];
  p5graphix.background(0);
  switch(animationMode) {
    case 1:
      tick += STEP;
      for(let i = 0; i < NUM_STRIPS; i++) {
        arrayToSend = arrayToSend.concat(strips[i].updateStripWavy());
        strips[i].renderStrip();
      }
      break;

    case 2:
      noiseImage.background(0);
      mX += xRate;
      mY += yRate;

      for(let i = 0; i < NUM_STRIPS; i++) {
        arrayToSend = arrayToSend.concat(strips[i].updateStripNoisy());
        strips[i].renderStrip();
      }
      break;

    default:
      tick += STEP;
      for(let i = 0; i < NUM_STRIPS; i++) {
        arrayToSend = arrayToSend.concat(strips[i].updateStripWavy());
        strips[i].renderStrip();
      }
      break;
  }
  
  // IF WE'RE CONNECTED TO OUR WEBSOCKET, SEND THE DATA
  if(connected) {
    // Copy data from 'arrayToSend' into 'byteArr'
    arrayToSend.map(
      (item, index) => {
        byteArr[index] = item;
      }
    );
    // Send the data!
    connection.send(byteArr.buffer);
  }
}
