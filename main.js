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

    ipcMain.on('win-close', (e) => {
        mainWindow.close();
    })
    ipcMain.on('win-change', (e) => {
        if(mainWindow.isMaximized()){
            mainWindow.unmaximize();
        }else{
            mainWindow.maximize();
        }
    })
    ipcMain.on('win-min', (e) => {
        mainWindow.minimize();
    })
    ipcMain.on('focused-close', (e)=>{
        BrowserWindow.getFocusedWindow().close();
    })
    ipcMain.on('focused-change', (e)=>{
        let sub = BrowserWindow.getFocusedWindow(); 
        if(sub.isMaximized()){
            sub.unmaximize();
        }else{
            sub.maximize();
        }
    })
    ipcMain.on('focused-min', (e)=>{
        BrowserWindow.getFocusedWindow().minimize();
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
                label: '全屏', 
                accelerator: 'F11',
                click(item, foucusdWindow){
                    if(foucusdWindow){
                        if(foucusdWindow.isFullScreen()){
                            foucusdWindow.setFullScreen(false);
                        }else{
                            foucusdWindow.setFullScreen(true);
                        }
                    }
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