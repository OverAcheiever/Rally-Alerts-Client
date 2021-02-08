// Global Variables
let fieldData = {};
let amount = 0;
// Grab Field Data onWidgetLoad
window.addEventListener("onWidgetLoad", function (obj) {
  fieldData = obj.detail.fieldData;
});

// Initialise WebSocket Connection to Server
const socket = new WebSocket(
  "wss://rally-alerts-server.herokuapp.com/rally/alerts/websocket"
);

// Reconnect on Close
socket.addEventListener("close", () => {
  console.log("Reconnecting to Server");
 setInterval(function () {
    new WebSocket(
      "wss://rally-alerts-server.herokuapp.com/rally/alerts/websocket"
    );
  }, 5000);
});

socket.addEventListener('open', (event) => {
  setInterval(function(){socket.send('Hello Server!');},20000)
});

// Listen to Data
socket.addEventListener("message", (event) => {
  socket.send('Received!')
  if (event.data.slice(0, 1) !== "{") {
    console.log("SERVER: ", event.data);
  } else {
    console.log("Donation Receieved");
    if (JSON.parse(event.data).coinKind == String(fieldData.creatorCoin)) {
      console.log(event.data)
      Alert(event);
    }
  }
});

//Alerts
function Alert(event) {
  console.log("ALERTS: Playing Alert");
  
  $(".username").html(JSON.parse(event.data).data.fromUsername);
  $(".amount").html(JSON.parse(event.data).data.amountOfCoin.toFixed(2));

  gsap
    .timeline()
    .fromTo(".img", { opacity: 0 }, { opacity: 1 })
    .fromTo(".username", { y: -10, opacity: 0 }, { y: 0, opacity: 1 })
    .fromTo(".message", { y: -10, opacity: 0 }, { y: 0, opacity: 1 });

  setTimeout(function () {
    gsap
      .timeline({
        onComplete: resumeQueue,
      })
      .fromTo(".img", { opacity: 1 }, { opacity: 0 })
      .fromTo(".username", { y: 0, opacity: 1 }, { y: -10, opacity: 0 })
      .fromTo(".message", { y: 0, opacity: 1 }, { y: -10, opacity: 0 });
  }, 3000);
	setTimeout(resumeQueue,6000)
  function resumeQueue() {
    SE_API.resumeQueue();
  }
}

window.addEventListener("onEventReceived", function (obj) {
  if ("widget-button" === obj.detail.event.listener) {
    $(".username").html("OverAchiever");
  $(".amount").html(50);

  gsap
    .timeline()
    .fromTo(".img", { opacity: 0 }, { opacity: 1 })
    .fromTo(".username", { y: -10, opacity: 0 }, { y: 0, opacity: 1 })
    .fromTo(".message", { y: -10, opacity: 0 }, { y: 0, opacity: 1 });

  setTimeout(function () {
    gsap
      .timeline({
        onComplete: resumeQueue,
      })
      .fromTo(".img", { opacity: 1 }, { opacity: 0 })
      .fromTo(".username", { y: 0, opacity: 1 }, { y: -10, opacity: 0 })
      .fromTo(".message", { y: 0, opacity: 1 }, { y: -10, opacity: 0 });
  }, 3000);
	setTimeout(resumeQueue,6000)
  function resumeQueue() {
    SE_API.resumeQueue();
  }
  } else {
    SE_API.resumeQueue();
  }
});
