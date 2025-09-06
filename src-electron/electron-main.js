import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron'
import path from 'path'
import fs from 'fs'
import os from 'os'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()
// Get a writable user-specific folder like ~/.tern or %APPDATA%/.tern
const TERN_FOLDER = path.join(app.getPath('userData'), '.tern')

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      sandbox: false,
      enableRemoteModule: true,
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
      
      // Allow access to local files
      webSecurity: false, // Disable same-origin restriction
      allowRunningInsecureContent: true // Needed for some file:// URIs
    }
  })
  const template = [
  {
    label: 'File',
    submenu: [
      {
      label: 'Export Backup',
      click: () => {
        mainWindow.webContents.send('trigger-export-backup')
      }
    },
    {
      label: 'Import Backup',
      click: () => {
        mainWindow.webContents.send('trigger-import-backup')
      }
    },
    { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }
  // remove Help menu
]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  mainWindow.loadURL(process.env.APP_URL)

  // Setup stile system
  setupFileLocation()

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function setupFileLocation(){
  // Ensure the folder exists
  console.log(TERN_FOLDER)
  if (!fs.existsSync(TERN_FOLDER)) {
    fs.mkdirSync(TERN_FOLDER, { recursive: true })
    fs.mkdirSync(path.join(TERN_FOLDER, 'image_files'), { recursive: true })
    fs.mkdirSync(path.join(TERN_FOLDER, 'audio_files'), { recursive: true })
  }
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.handle('get-tern-path', (_event, dir) => {
  return path.resolve(TERN_FOLDER, dir);
})

ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select Backup File',
    filters: [{ name: 'Zip Files', extensions: ['zip'] }],
    properties: ['openFile']
  })

  if (result.canceled || result.filePaths.length === 0) return null
  return result.filePaths[0]
})