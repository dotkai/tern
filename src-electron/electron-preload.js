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
import fs from 'fs'

async function getTernPath(dir){
  return ipcRenderer.invoke('get-tern-path', dir) 
}

contextBridge.exposeInMainWorld('electronFs', {
  getImageUrl: async (fileName) => {
    const imageFolder = await getTernPath('image_files')
    return path.join(imageFolder, fileName)
    // return new Promise((resolve, reject) => {
    //   fs.readFile(filePath, (err, data) => {
    //     if (err) return reject(err)

    //     const ext = path.extname(fileName).slice(1) // e.g. 'jpeg', 'png'
    //     const mime = ext === 'jpg' ? 'jpeg' : ext   // handle jpg vs jpeg
    //     const base64 = data.toString('base64')

    //     resolve(`data:image/${mime};base64,${base64}`)
    //   })
    // })
  },
  getAudioUrl: async (fileName) => {
    const audioFolder = await getTernPath('audio_files')

    return path.join(audioFolder, fileName)
  },
  readAssetFile: (fullPath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fullPath, (err, data) => {
        if (err) return reject(err)
        resolve(data) // returns Node Buffer
      })
    })
  },
  fsMkdir: async (dir) => {
    const publicFolder = await getTernPath(dir) 
    if (!fs.existsSync(publicFolder)) return;
    fs.mkdirSync(dir, { recursive: true })
  },
  fsReadFile: fs.readFileSync,
  importFile: async(arrayBuffer, name) => {        
    const buffer = Buffer.from(arrayBuffer)
    const copyTo = await getTernPath(name) 
    fs.writeFileSync(copyTo, buffer)
  },
  copyFile: async (image, generatedId, targetFolder) => {
    try{  
      const source = webUtils.getPathForFile(image)
      const publicFolder = await getTernPath(targetFolder) 
      const extension = image.name.split('.').pop();
      const savedName = `${generatedId}.${extension}`
      fs.copyFileSync(source, path.join(publicFolder, savedName))
      return {
        generatedId,
        originalName: image.name,
        savedName
      }
    } catch(e){
      console.error(e)
    }
  },
  removeFile: async (filePath, publicLocation) => {
    try {
      const publicFolder = await getTernPath(publicLocation) 
      fs.unlinkSync(path.join(publicFolder, filePath));
    } catch(e){
      console.error(e)
    }
  }
})

contextBridge.exposeInMainWorld('electronAPI', {
  onExportBackup: (callback) => ipcRenderer.on('trigger-export-backup', callback),
  onImportBackup: (callback) => ipcRenderer.on('trigger-import-backup', callback),
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile')
})
