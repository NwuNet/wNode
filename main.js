const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow

let mainWindow
function createWindow(){
    mainWindow = new BrowserWindow({width:800, height: 600})
    mainWindow.loadURL('http://10.0.1.237')

    mainWindow.on('closed', function(){
        mainWindow = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', ()=>{
    if(process.platform != 'darwin'){
        app.quit()
    }
})
app.on('activate', ()=>{
    if(mainWindow == null){
        createWindow()
    }
})

const template = [
    {
        label: '账户信息',
        submenu:[
            {label: '添加'},
            {label: '修改'},
            {label: '删除'}
        ]
    },
    {
        label: '退出',
        role: 'close'
    }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)