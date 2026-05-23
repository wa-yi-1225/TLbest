
const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        title: '一键智能数据分析工具',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        },
        backgroundColor: '#1a1a2e'
    });

    mainWindow.loadFile('index.html');

    const menu = Menu.buildFromTemplate([
        {
            label: '文件',
            submenu: [
                {
                    label: '导入数据',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("fileInput").click()');
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: '视图',
            submenu: [
                { role: 'reload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: '帮助',
            submenu: [
                {
                    label: '使用说明',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('alert("使用说明：\\n1. 点击左侧按钮导入数据\\n2. 依次执行预处理、分析、图表\\n3. 或一键完成全部操作")');
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
