'use strict';

console.log('Popup Open');

function redirectToOptions(){
	console.log('RUNNING');
	chrome.runtime.openOptionsPage();
}