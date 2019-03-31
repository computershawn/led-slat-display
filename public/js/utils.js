function transpose(arr) {
  return arr.map((item, index)=>arr[arr.length - 1 - index])
}


function startWebSocketThings() {
  connection = new WebSocket("ws://" + host + ":" + port + "/")
  // connection.onmessage = function (event) {
  //     console.log("Server says: " + event.data);
  // };
  connection.onopen = function (event) {
      console.log("Awesome, websocket is open on " + host + ":" + port + "!");
      connected = true;
  };
  connection.onerror = function (event) {
      console.error("Aw crap, websocket error observed:", event);
      connected = false;
  };
  connection.onclose = function (event) {
      console.log("WebSocket is closed now.");
      connected = false;
  };
}

// function sendToWebsocket() {
//   connection.send(byteArr.buffer);
// }

// function sendToWebsocket() {
//     for (let i = 0; i < NUM_STRIPS; i++) {
//         for (let j = 0; j < LEDS_PER; j++) {
//           let n = i * LEDS_PER + j;
//           for(let k = 0; k < colorMode; k++) {
//             byteArr[colorMode * n + k] = arrayToSend[colorMode * n + k];//round(random(0, 255));
//           }
//         }
//     }
//     connection.send(byteArr.buffer);
// }

// function sendToWebsocket() {
//     for (let i = 0; i < NUM_STRIPS; i++) {
//         for (let j = 0; j < LEDS_PER; j++) {
//           let n = i * LEDS_PER + j;
//           for(let k = 0; k < colorMode; k++) {
//             byteArr[colorMode * n + k] = round(random(0, 255));
//           }
//         }
//     }
//     connection.send(byteArr.buffer);
// }
