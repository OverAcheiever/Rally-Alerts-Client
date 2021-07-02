var socketIO = io("https://oa-live-alerts.herokuapp.com/", {
  path: "/websocket",
});
var settings;
var fieldData;
window.addEventListener("onWidgetLoad", (obj) => {
  function checkCoinExists() {
    return new Promise((res, rej) => {
      axios.get("https://api.rally.io/v1/creator_coins").then((response) => {
        coins = response.data;
        for (coin in coins) {
          if (coins[coin].coinSymbol == "{creatorCoinSymbol}".toUpperCase()) {
            res(true);
        }
      }
        res(false);
    });
  });
}

  async function coinSymbolError() {
    symbolExists = await checkCoinExists();
    symbolExists == false ? $(".error-container").css("opacity", "1") : null;
}

  fieldData = obj.detail.fieldData;
  settings = {
    coinSymbol: "{creatorCoinSymbol}",
    anonymousUsername: "{anonymousUsername}",
    donation: {
      alertMessage: "{donationAlertMessage}",
      usernameLimit: {donationUsernameLimit},
      decimalLimit: {donationAmountDecimalLimit},
      animationType: "{donationAnimation}",
      alertDuration: {donationAlertDuration},
  },
    purchase: {
      alertMessage: "{purchaseAlertMessage}",
      usernameLimit: {purchaseUsernameLimit},
      decimalLimit: {purchaseAmountDecimalLimit},
      animationType: "{purchaseAnimation}",
      alertDuration: {purchaseAlertDuration},
  },
};
});

var alertQueue = [];

socketIO.on("connect", () => {
  console.log("Connected to Server");
  setTimeout(() => {
    socketIO.emit("ping");
}, 10000);
  socketIO.on("donation", (obj) => {
    if ("{enableDonationAlerts}" == "true") {
      if (
        obj.coinKind == "{creatorCoinSymbol}" ||
        obj.coinKind == "{creatorCoinSymbol}".toLowerCase() ||
        obj.coinKind == "{creatorCoinSymbol}".toUpperCase()
      ) {
        alert("donation", obj.data);
    }
  }
});
  socketIO.on("purchase", (obj) => {
    if ("{enablePurchaseAlerts}" == "true") {
      if (
        obj.coinKind == "{creatorCoinSymbol}" ||
        obj.coinKind == "{creatorCoinSymbol}".toLowerCase() ||
        obj.coinKind == "{creatorCoinSymbol}".toUpperCase()
      ) {
        alert("purchase", obj.data);
    }
  }
});
});

window.addEventListener("onEventReceived", function (obj) {
  alert("{emulateAlertType}", {
    transactionId: "5ec31129-f5e6-4c25-9188-9a0401183d3d",
    fromUsername: "{emulateUsername}",
    amountOfCoin: {emulateAmount} * 100,
    costInUSCents: {emulateAmount},
    showMessage: "true",
    showMemo: "true",
    memo: "Do not fear a man who spams 1000 memes, Instead fear a man that spams a meme 1000 times",
    createdDate: "2021-02-09T10:09:00.133Z",
    completedDate: "2021-02-09T10:09:10.645Z",
});
});

function alert(alertType, obj) {
  console.log(obj.showUsername);
  obj.costInUSCents = obj.costInUSCents / 100;

  function cropDecimal(amount) {
    var indexOfDecimal = String(amount).indexOf(".");
    return String(amount).slice(
      0,
      indexOfDecimal + 1 + settings[alertType].decimalLimit
    );
}

  function cropUsername(username) {
    return username.length < settings[alertType].usernameLimit
      ? username.slice(0, settings[alertType].usernameLimit)
      : username.slice(0, settings[alertType].usernameLimit) + "...";
}

  if (obj.fromUsername == null || obj.fromUsername == "null") {
    username = cropUsername(settings.anonymousUsername);
} else {
    if (obj.showUsername == false) {
      console.log("Hidden");
      username = cropUsername(settings.anonymousUsername);
  } else {
      username = cropUsername(obj.fromUsername);
  }
}
  if (alertType == "donation") {
    if (!obj.showMemo) {
      memo = "";
  } else {
      memo = obj.memo;
  }
}

  var variationObject = {
    showMessage: fieldData[`${alertType}DefaultShowMessage`],
    TTS: fieldData[`${alertType}DefaultTTS`],
    textColor: fieldData[`${alertType}DefaultTextColor`],
    usernameColor: fieldData[`${alertType}DefaultUsernameColor`],
    amountColor: fieldData[`${alertType}DefaultAmountColor`],
    messageColor: fieldData[`${alertType}DefaultMessageColor`],
    sound: fieldData[`${alertType}DefaultAlertSound`],
    soundDuration: fieldData[`${alertType}DefaultSoundDuration`],
    mediaType: fieldData[`${alertType}DefaultAlertMediaType`],
    image: fieldData[`${alertType}DefaultAlertImage`],
    video: fieldData[`${alertType}DefaultAlertVideo`],
};

  if (
    fieldData[`${alertType}Var1`] == "true" &&
    obj[fieldData[`${alertType}Var1ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var1Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var1ShowMessage`],
      TTS: fieldData[`${alertType}Var1TTS`],
      textColor: fieldData[`${alertType}Var1TextColor`],
      usernameColor: fieldData[`${alertType}Var1UsernameColor`],
      amountColor: fieldData[`${alertType}Var1AmountColor`],
      messageColor: fieldData[`${alertType}Var1MessageColor`],
      sound: fieldData[`${alertType}Var1AlertSound`],
      soundDuration: fieldData[`${alertType}Var1SoundDuration`],
      mediaType: fieldData[`${alertType}Var1AlertMediaType`],
      image: fieldData[`${alertType}Var1AlertImage`],
      video: fieldData[`${alertType}Var1AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var2`] == "true" &&
    obj[fieldData[`${alertType}Var2ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var2Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var2ShowMessage`],
      TTS: fieldData[`${alertType}Var2TTS`],
      textColor: fieldData[`${alertType}Var2TextColor`],
      usernameColor: fieldData[`${alertType}Var2UsernameColor`],
      amountColor: fieldData[`${alertType}Var2AmountColor`],
      messageColor: fieldData[`${alertType}Var2MessageColor`],
      sound: fieldData[`${alertType}Var2AlertSound`],
      soundDuration: fieldData[`${alertType}Var2SoundDuration`],
      mediaType: fieldData[`${alertType}Var2AlertMediaType`],
      image: fieldData[`${alertType}Var2AlertImage`],
      video: fieldData[`${alertType}Var2AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var3`] == "true" &&
    obj[fieldData[`${alertType}Var3ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var3Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var3ShowMessage`],
      TTS: fieldData[`${alertType}Var3TTS`],
      textColor: fieldData[`${alertType}Var3TextColor`],
      usernameColor: fieldData[`${alertType}Var3UsernameColor`],
      amountColor: fieldData[`${alertType}Var3AmountColor`],
      messageColor: fieldData[`${alertType}Var3MessageColor`],
      sound: fieldData[`${alertType}Var3AlertSound`],
      soundDuration: fieldData[`${alertType}Var3SoundDuration`],
      mediaType: fieldData[`${alertType}Var3AlertMediaType`],
      image: fieldData[`${alertType}Var3AlertImage`],
      video: fieldData[`${alertType}Var3AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var4`] == "true" &&
    obj[fieldData[`${alertType}Var4ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var4Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var4ShowMessage`],
      TTS: fieldData[`${alertType}Var4TTS`],
      textColor: fieldData[`${alertType}Var4TextColor`],
      usernameColor: fieldData[`${alertType}Var4UsernameColor`],
      amountColor: fieldData[`${alertType}Var4AmountColor`],
      messageColor: fieldData[`${alertType}Var4MessageColor`],
      sound: fieldData[`${alertType}Var4AlertSound`],
      soundDuration: fieldData[`${alertType}Var4SoundDuration`],
      mediaType: fieldData[`${alertType}Var4AlertMediaType`],
      image: fieldData[`${alertType}Var4AlertImage`],
      video: fieldData[`${alertType}Var4AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var5`] == "true" &&
    obj[fieldData[`${alertType}Var5ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var5Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var5ShowMessage`],
      TTS: fieldData[`${alertType}Var5TTS`],
      textColor: fieldData[`${alertType}Var5TextColor`],
      usernameColor: fieldData[`${alertType}Var5UsernameColor`],
      amountColor: fieldData[`${alertType}Var5AmountColor`],
      messageColor: fieldData[`${alertType}Var5MessageColor`],
      sound: fieldData[`${alertType}Var5AlertSound`],
      soundDuration: fieldData[`${alertType}Var5SoundDuration`],
      mediaType: fieldData[`${alertType}Var5AlertMediaType`],
      image: fieldData[`${alertType}Var5AlertImage`],
      video: fieldData[`${alertType}Var5AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var6`] == "true" &&
    obj[fieldData[`${alertType}Var6ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var6Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var6ShowMessage`],
      TTS: fieldData[`${alertType}Var6TTS`],
      textColor: fieldData[`${alertType}Var6TextColor`],
      usernameColor: fieldData[`${alertType}Var6UsernameColor`],
      amountColor: fieldData[`${alertType}Var6AmountColor`],
      messageColor: fieldData[`${alertType}Var6MessageColor`],
      sound: fieldData[`${alertType}Var6AlertSound`],
      soundDuration: fieldData[`${alertType}Var6SoundDuration`],
      mediaType: fieldData[`${alertType}Var6AlertMediaType`],
      image: fieldData[`${alertType}Var6AlertImage`],
      video: fieldData[`${alertType}Var6AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var7`] == "true" &&
    obj[fieldData[`${alertType}Var7ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var7Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var7ShowMessage`],
      TTS: fieldData[`${alertType}Var7TTS`],
      textColor: fieldData[`${alertType}Var7TextColor`],
      usernameColor: fieldData[`${alertType}Var7UsernameColor`],
      amountColor: fieldData[`${alertType}Var7AmountColor`],
      messageColor: fieldData[`${alertType}Var7MessageColor`],
      sound: fieldData[`${alertType}Var7AlertSound`],
      soundDuration: fieldData[`${alertType}Var7SoundDuration`],
      mediaType: fieldData[`${alertType}Var7AlertMediaType`],
      image: fieldData[`${alertType}Var7AlertImage`],
      video: fieldData[`${alertType}Var7AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var8`] == "true" &&
    obj[fieldData[`${alertType}Var8ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var8Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var8ShowMessage`],
      TTS: fieldData[`${alertType}Var8TTS`],
      textColor: fieldData[`${alertType}Var8TextColor`],
      usernameColor: fieldData[`${alertType}Var8UsernameColor`],
      amountColor: fieldData[`${alertType}Var8AmountColor`],
      messageColor: fieldData[`${alertType}Var8MessageColor`],
      sound: fieldData[`${alertType}Var8AlertSound`],
      soundDuration: fieldData[`${alertType}Var8SoundDuration`],
      mediaType: fieldData[`${alertType}Var8AlertMediaType`],
      image: fieldData[`${alertType}Var8AlertImage`],
      video: fieldData[`${alertType}Var8AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var9`] == "true" &&
    obj[fieldData[`${alertType}Var9ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var9Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var9ShowMessage`],
      TTS: fieldData[`${alertType}Var9TTS`],
      textColor: fieldData[`${alertType}Var9TextColor`],
      usernameColor: fieldData[`${alertType}Var9UsernameColor`],
      amountColor: fieldData[`${alertType}Var9AmountColor`],
      messageColor: fieldData[`${alertType}Var9MessageColor`],
      sound: fieldData[`${alertType}Var9AlertSound`],
      soundDuration: fieldData[`${alertType}Var9SoundDuration`],
      mediaType: fieldData[`${alertType}Var9AlertMediaType`],
      image: fieldData[`${alertType}Var9AlertImage`],
      video: fieldData[`${alertType}Var9AlertVideo`],
  };
}

  if (
    fieldData[`${alertType}Var10`] == "true" &&
    obj[fieldData[`${alertType}Var10ThresholdCurrencyType`]] >=
      parseInt(fieldData[`${alertType}Var10Threshold`])
  ) {
    variationObject = {
      showMessage: fieldData[`${alertType}Var10ShowMessage`],
      TTS: fieldData[`${alertType}Var10TTS`],
      textColor: fieldData[`${alertType}Var10TextColor`],
      usernameColor: fieldData[`${alertType}Var10UsernameColor`],
      amountColor: fieldData[`${alertType}Var10AmountColor`],
      messageColor: fieldData[`${alertType}Var10MessageColor`],
      sound: fieldData[`${alertType}Var10AlertSound`],
      soundDuration: fieldData[`${alertType}Var10SoundDuration`],
      mediaType: fieldData[`${alertType}Var10AlertMediaType`],
      image: fieldData[`${alertType}Var10AlertImage`],
      video: fieldData[`${alertType}Var10AlertVideo`],
  };
}

  console.log(variationObject);

  async function playAlert() {
    mediaSrc =
      variationObject.mediaType == "img"
        ? variationObject.image
        : variationObject.video;
    $(".alert-media").html(
      `<${variationObject.mediaType} src="${mediaSrc}" autoplay></${variationObject.mediaType}>`
    );

    document.querySelector("#alert-sound").src = variationObject.sound;
    document.querySelector("#alert-sound").load();
    document.querySelector("#alert-sound").play();

    if (
      alertType == "donation" &&
      variationObject.TTS == "true" &&
      memo !== ""
    ) {
      setTimeout(() => {
        async function TTS() {
          var body = await axios.get(
            `https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(
              memo.trim()
            )}`,
            {headers: {}}
          );
          TTS_URL = body.request.responseURL;
          document.querySelector(".alert-sound").src = TTS_URL;
          document.querySelector(".alert-sound").load();
          console.log(document.querySelector(".alert-sound").duration);
          document.querySelector(".alert-sound").play();
      }
        TTS();
    }, variationObject.soundDuration * 1000 + 100);
  }

    cc = cropDecimal(obj.costInUSCents);
    usd = cropDecimal(obj.amountOfCoin);
    var alertTextHtml =
      `<div class="alert-text" id="alert-text">${settings[alertType].alertMessage}</div>`
        .replaceAll("{username}", `<span class="username">${username}</span>`)
        .replaceAll("{usd}", `<span class="amount">$${usd}</span>`)
        .replaceAll("{cc}", `<span class="amount">${cc}</span>`)
        .replaceAll("{/}", "<br>");
    $(`.alert-text`).html(alertTextHtml);
    if (alertType == "donation") {
      memoHtml = variationObject.showMessage == "true" ? memo : "";
      $(`.alert-message`).html(memoHtml);
  }

    $(".alert-text").css("color", variationObject.textColor);
    $(".username").css("color", variationObject.usernameColor);
    $(".amount").css("color", variationObject.amountColor);
    $(".alert-message").css("color", variationObject.messageColor);

    var splitAlertText = new SplitText($("#alert-text"), {type: "words"});
    var splitDonationMessage = new SplitText($(".alert-message"), {
      type: "words",
  });
    console.log(settings[alertType].animationType);
    switch (settings[alertType].animationType) {
      case "fade":
        console.log("def");
        gsap.timeline().to(`.alert-media,.alert-text div, .alert-message div`, {
          opacity: 1,
      });

        break;
      case "stagger1":
        gsap
          .timeline()
          .to(`.alert-media`, {opacity: 1})
          .fromTo(`.alert-text div`, {y: 10}, {y: 0, opacity: 1}, "-=0.3")
          .fromTo(`.alert-message div`, {y: 10}, {y: 0, opacity: 1});

        break;
      case "stagger2":
        gsap
          .timeline()
          .to(`.alert-media`, {opacity: 1})
          .fromTo(
            `.alert-text div`,
            {y: 30},
            {y: 0, opacity: 1, stagger: 0.2}
          )
          .fromTo(
            `.alert-message div`,
            {y: 15},
            {y: 0, opacity: 1, duration: 0.5},
            "-=0.3"
          );
        break;
      case "stagger3":
        console.log(1);
        gsap
          .timeline()
          .to(`.alert-media`, {opacity: 1})
          .fromTo(
            `.alert-text div`,
            {y: 30},
            {y: 0, opacity: 1, stagger: 0.2}
          )
          .fromTo(
            `.alert-message div`,
            {y: 15},
            {y: 0, opacity: 1, duration: 0.5, stagger: 0.08},
            "-=0.3"
          );
        break;
  }

    setTimeout(() => {
      document.querySelector(".alert-sound").pause();
      gsap.to(`.alert-media, .alert-text div, .alert-message div`, {
        opacity: 0,
    });
  }, settings.donation.alertDuration * 1000);
}

  playAlert();
}
