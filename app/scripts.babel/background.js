'use strict';

var defaultTimerInterval = 10000;
var timerRef = null;
var notificationSound = new Audio('sounds/sound.mp3')
var playNotification = true;

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

//chrome.browserAction.setBadgeText({text: '\'Allo'});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({'interval' : defaultTimerInterval}, () => {
    setNoticationLoop(defaultTimerInterval);
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get('interval', (healthPingOptions) => {
    setNoticationLoop(healthPingOptions.interval);
  });
});

function sendStandNotification(){
  let notificationOptions = {
    type: 'basic',
    iconUrl: 'images/icon-48.png',
    title: 'Unplug!',
    message: "Take a technology timeout!",
    requireInteraction: true
  };
  chrome.notifications.create(null, notificationOptions);
  if(playNotification == true)
    notificationSound.play();
}

function setNoticationLoop(interval){
    timerRef = setInterval(sendStandNotification, interval);
}

function clearNotificationLoop(){
  clearInterval(timerRef);
}

function toggleSound(){
  if(playNotification == true){
    playNotification = false;
  }
  else{
    playNotification = true;
  }
}

console.log('\'Allo \'Allo! Event Page for Browser Action');
