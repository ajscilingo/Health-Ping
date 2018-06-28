'use strict';

var defaultTimerInterval = 10000;
var timerRef = null;


chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

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
    iconUrl: 'images/icon-38.png',
    title: 'Unplug!',
    message: "Take a technology timeout!",
    requireInteraction: true
  };
  chrome.notifications.create(null, notificationOptions);
}

function setNoticationLoop(interval){
    timerRef = setInterval(sendStandNotification, interval);
}

function clearNotificationLoop(){
  clearInterval(timerRef);
}



console.log('\'Allo \'Allo! Event Page for Browser Action');
