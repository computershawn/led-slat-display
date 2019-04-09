//var host = '10.0.1.24';
var host = 'localhost';
//var host = '192.168.1.102';
//var host = '10.0.0.47';
var port = '5678';
let connection;
let ps;

function startThings() {
    connection = new WebSocket("ws://" + host + ":" + port + "/")
    // connection.onmessage = function (event) {
    //     console.log("Server says: " + event.data);
    // };
    connection.onopen = function (event) {
        console.log("Awesome, websocket is open on " + host + ":" + port + "!");
    };
    connection.onerror = function (event) {
        console.error("Aw crap, websocket error observed:", event);
    };
    connection.onclose = function (event) {
        console.log("WebSocket is closed now.");
    };
}

function sendMsgToServer() {
    console.log("Sending messages to server...");
    let ob = {
        "phrases": [
            {phrase: "Take it easy I'm just a messenger."},
            {phrase: "I brought you a drink."},
            {phrase: "Why are you asking me all these questions?"},
            {phrase: "We know that you know, Mr. Caul."},
            {phrase: "For your own sake, don't get involved any further."}
        ]
    }
    let msg = JSON.stringify(ob);
    connection.send(msg);
}


let w1 = 320;
let ht1 = 320;
let w2 = 16;//64;//16;
let ht2 = 16;//64;//16;
let margin = 20;
let balls = [];
let graphics;
let button01;
let byteArr = new Uint8Array(w2 * ht2 * 3)

function setup() {
    startThings();
    rectMode(CENTER);
    createCanvas(w1 + w2 + 3 * margin, ht1 + 2 * margin);

    for (let i = 0; i < 20; i++) {
        let r = round(random(20, 40));
        let x = random(w1 - 2 * r) + r;
        let y = random(ht1 - 2 * r) + r;
        let xS = (random() > 0.5 ? 1 : -1) * random(.25, 1.5);
        let yS = (random() > 0.5 ? 1 : -1) * random(.25, 1.5);
        let pos = createVector(x, y);
        let speed = createVector(xS, yS);
        ball = new Ball(r, pos, speed);
        balls.push(ball);
    }
    button01 = createButton('send to websocket', 10, 10);
    button01.mousePressed(sendToWebsocket);
    //button01.mousePressed(sendMsgToServer);
    graphics = createGraphics(w1, ht1);
    //frameRate(30);
    frameRate(24);
}

function draw() {
    background(215);
    render();
    noFill();
    stroke(255);
    //sendToWebsocket();
}


function sendToWebsocket() {
    let p0 = createVector(w1 + 2 * margin, margin);
    //let unicornArray = [];
    for (let i = 0; i < ht2; i++) {
        let y = p0.y + i;
        for (let j = 0; j < w2; j++) {
            let x = p0.x + j;
            let co = get(x, y);
            //unicornArray.push(red(co), green(co), blue(co));
            let n = i * w2 + j;
            byteArr[3 * n + 0] = red(co);
            byteArr[3 * n + 1] = green(co);
            byteArr[3 * n + 2] = blue(co);
            //console.log(unicornArray.length);
        }
    }
    //console.log(byteArr.length);
    connection.send(byteArr.buffer);
}


class Ball {
    constructor(r, pos, speed) {
        this.radius = r;
        this.position = pos;
        this.speed = speed;
        let hue = round(random(0, 360));
        let sat = round(random(75, 100));
        this.color = color(`hsb(${hue}, ${sat}%, 100%)`);
    }
    update() {
        this.position.add(this.speed);
        if (this.position.x >= graphics.width - this.radius) this.speed.x *= -1;
        if (this.position.x <= this.radius) this.speed.x *= -1;
        if (this.position.y >= graphics.height - this.radius) this.speed.y *= -1;
        if (this.position.y <= this.radius) this.speed.y *= -1;
    }
    display() {
        graphics.fill(this.color);
        graphics.ellipse(this.position.x, this.position.y, 2 * this.radius, 2 * this.radius);
    }
}

function render() {
    graphics.background(0);
    graphics.fill(255, 0, 0);
    graphics.noStroke();

    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].display();
    }
    image(graphics, margin, margin);
    image(graphics, margin * 2 + w1, margin, w2, ht2);
}
