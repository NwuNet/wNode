// var render = require('electron')
// render.ipcRenderer.on('nwulogin',(event, message) =>{
//     document.getElementById('website').value = message
//     document.getElementById('webcontent').src = message
// })

const {ipcRenderer} = require('electron');

var webview = document.getElementById('webcontent')
webview.addEventListener('load-commit', () => {
    document.getElementById("mask").style.display = "block";
})
webview.addEventListener('did-frame-finish-load', () => {
    document.getElementById("mask").style.display = "none";
})
webview.addEventListener('dom-ready', () => {
    document.getElementById("mask").style.display = "none";
})
webview.addEventListener('did-finish-load', () => {
    document.getElementById("mask").style.display = "none";
})
webview.addEventListener('did-stop-loading', () => {
    document.getElementById("mask").style.display = "none";
})
webview.addEventListener('new-window', (e) => {
    var sub = window.open(`file://${__dirname}/subwindow.html`);
    var set = 'document.getElementById("website").value = "' + e.url +
              '";document.getElementById("webcontent").src ="' + e.url +'"';
    sub.eval(set);
})