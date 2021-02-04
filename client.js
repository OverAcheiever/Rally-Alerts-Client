// Global Variables
let fieldData = {};
let amount = 0;
// Grab Field Data onWidgetLoad
window.addEventListener("onWidgetLoad", function (obj) {
  const fieldData = obj.detail.fieldData;
});

// Initialise WebSocket Connection to Server
const socket = new WebSocket(
  "wss://rally-alerts-server.herokuapp.com/rally/alerts/websocket"
);

// Reconnect on Close
socket.addEventListener("close", () => {
  console.log("Reconnecting");
  setInterval(function () {
    new WebSocket(
      "wss://rally-alerts-server.herokuapp.com/"
    );
  }, 1000);
});

// Listen to Data
socket.addEventListener("message", (event) => {
  if (event.data.slice(0, 1) !== "{") {
    console.log("SERVER: ", event.data);
  } else {
    console.log("Donation Receieved");
    if (event.coinKind == fieldData.creatorCoin) {
      Alert(
        event.data.fromUsername,
        parseInt(JSON.parse(event.data).amountOfCoin)
      );
    }
  }
});

//Alerts
function Alert(name, amount) {
  console.log("ALERTS: Playing Alert");
  function upto2Decimal(num) {
    if (num > 0) return Math.floor(num * 100) / 100;
    else return Math.ceil(num * 100) / 100;
  }
  amount = upto2Decimal(amount);
  $(".username").html(name);

  $(".amount").html(`$${amount}`);

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

  function resumeQueue() {
    SE_API.resumeQueue();
  }
}

window.addEventListener("onEventReceived", function (obj) {
  if ("widget-button" === obj.detail.event.listener) {
    Alert("OverAchiever", "50");
  } else {
    SE_API.resumeQueue();
  }
});
