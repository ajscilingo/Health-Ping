'use strict';

console.log('Health Ping Options');
var timerRef = null;

function onChangeInterval(){
    let standInterval = document.getElementById('interval').value;
    if(standInterval){
        chrome.storage.sync.set({'interval' : standInterval}, () =>{
            chrome.runtime.getBackgroundPage( (bgpage) => { 
                bgpage.clearNotificationLoop();
                bgpage.setNoticationLoop(standInterval);
                close();
            });
        });
    }
}

/*function onSelectChangeInterval(){
    let standInterval = document.getElementById('intervalSelect').value;
    if(standInterval){
        chrome.storage.sync.set({'interval' : standInterval}, () => {
            chrome.runtime.getBackgroundPage( (bgpage) => {
                bgpage.clearNotificationLoop();
                bgpage.setNoticationLoop(standInterval);
                close();
            });
        })
    }
}*/

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('interval', (healthPingOptions) => {
        let standInterval = document.getElementById('interval');
        //let selectStandInterval = document.getElementById('intervalSelect');
        //selectStandInterval.value = healthPingOptions.interval;
        standInterval.value = healthPingOptions.interval;
    });
    document.getElementById('changeInterval').addEventListener('click', onChangeInterval);
});

function sendStandNotification(){
    let notificationOptions = {
      type: 'basic',
      iconUrl: 'images/icon-48.png',
      title: 'Welcome!',
      message: "Get Ready to Stand!"
    };
    chrome.notifications.create(null, notificationOptions);
    clearInterval(timerRef);
  }