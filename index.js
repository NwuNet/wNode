// var render = require('electron')
// render.ipcRenderer.on('nwulogin',(event, message) =>{
//     document.getElementById('website').value = message
//     document.getElementById('webcontent').src = message
// })

nav1click()

var webview = document.getElementById('webcontent')
webview.addEventListener('did-start-loading', ()=>{
    document.getElementById("mask").style.display ="block";
})
webview.addEventListener('did-stop-loading',()=>{
    document.getElementById("mask").style.display ="none";
})