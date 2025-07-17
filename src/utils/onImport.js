import JSZip from 'jszip'
import { db, importDatabase } from 'src/db/db' // Get database

export default async () => {
  const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.zip'

    input.onchange = async () => {
      const file = input.files[0]
      if (!file) return

      const zip = await JSZip.loadAsync(file)

      // 1. Restore Dexie
      const dbJson = await zip.file('database.json').async('string')
      const data = JSON.parse(dbJson)
      await importDatabase(data) // assumes wrapper method to load data

      // 2. Write files to file system (you need Electron fs access)
      const userDataPath = window.electronAPI.getUserDataPath()

      zip.forEach(async (relativePath, zipEntry) => {
        if (zipEntry.dir) return
        if (
          relativePath.startsWith('image_files') ||
          relativePath.startsWith('audio_files')
        ) {
          const fullPath = window.electronAPI.pathJoin(userDataPath, relativePath)
          const content = await zipEntry.async('nodebuffer')

          window.electronAPI.fsMkdir(path.dirname(fullPath))
          window.electronAPI.fsWriteFile(fullPath, content)
        }
      })


      alert('Import complete')
    }

    input.click()
}