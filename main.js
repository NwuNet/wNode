const {app, BrowserWindow, Menu, dialog, ipcMain} = require('electron')

let mainWindow
function createWindow(){
    mainWindow = new BrowserWindow({width:800, height: 600, frame: false})
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    let contents = mainWindow.webContents
    // contents.openDevTools()

    mainWindow.on('closed', function(){
        mainWindow = null
    })

    contents.on('did-finish-load',()=>{
        contents.send('nwulogin','http://115.29.55.23/thinkphp')
    })

    ipcMain.on('winclose', (e) => {
        mainWindow.close();
    })
    ipcMain.on('winchange', (e) => {
        if(mainWindow.isMaximized()){
            mainWindow.unmaximize();
        }else{
            mainWindow.maximize();
        }
    })
    ipcMain.on('winmin', (e) => {
        mainWindow.minimize();
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
        label: 'WebNode是校园网接入服务平台'
    },
    {
        label: '窗口',
        submenu:[
            {
                label: '刷新', 
                accelerator: 'CmdOrCtrl+R',
                click(item, foucusdWindow){
                    if(foucusdWindow) foucusdWindow.reload()
                }
            },
            {
                label: '退出',
                accelerator: 'CmdOrCtrl+Q',
                role: 'close'
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)