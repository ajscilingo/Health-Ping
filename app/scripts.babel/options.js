'use strict';

console.log('Health Ping Options');
var playNotification = true;

function onSelectChangeInterval(){
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
}

function onSoundToggle(){
    
    chrome.runtime.getBackgroundPage( (bgpage) => {
        bgpage.toggleSound();
        toggleSound();
        getToggleDisplayState();
    })
}

function toggleSound(){
    if(playNotification == true){
       playNotification = false;
    }
    else{
      playNotification = true;
    }
}

function getToggleDisplayState(){
    let soundToggleControl = document.getElementById('sounds');
   soundToggleControl.checked = !soundToggleControl.checked;
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('interval', (healthPingOptions) => {
        let selectStandInterval = document.getElementById('intervalSelect');
        selectStandInterval.value = healthPingOptions.interval;
    });
    document.getElementById('changeInterval').addEventListener('click', onSelectChangeInterval);
    document.getElementById('sounds').addEventListener('click', onSoundToggle);
});
