/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.js you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
import { contextBridge, webUtils, ipcRenderer } from 'electron'
import path from 'path'
// import { nanoid } from 'nanoid'
import fs from 'fs'
import { app } from '@electron/remote'

contextBridge.exposeInMainWorld('electronFs', {
    // copyFile: fs.copyFile,
  copyFile: async (image, generatedId, targetFolder) => {
    try{  
      const source = webUtils.getPathForFile(image)
      const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER, targetFolder) 
      const extension = image.name.split('.').pop();
      const savedName = `${generatedId}.${extension}`
      fs.copyFileSync(source, path.join(publicFolder, savedName))
      return {
        generatedId,
        originalName: image.name,
        savedName
      }
    } catch(e){
      console.log(e)
    }
  },
  removeFile: async (filePath, publicLocation) => {
    try {
      const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER, publicLocation)
      fs.unlinkSync(path.join(publicFolder, filePath));
    } catch(e){
      console.log(e)
    }
  }
})

contextBridge.exposeInMainWorld('electronAPI', {
  onExportBackup: (callback) => ipcRenderer.on('trigger-export-backup', callback),
  onImportBackup: (callback) => ipcRenderer.on('trigger-import-backup', callback),
  getUserDataPath: () => app.getPath('userData'),
  pathJoin: (...args) => path.join(...args),
  fsWriteFile: (filePath, buffer) => fs.writeFileSync(filePath, buffer),
  fsMkdir: (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }
})
