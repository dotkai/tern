import JSZip from 'jszip'
import { importDatabase } from 'src/db/db'

export default async () => {
  const filePath = await window.electronAPI.openFileDialog()
  if (!filePath) return

  try { 
    const zip = await JSZip.loadAsync(await window.electronFs.fsReadFile(filePath))
    const dbJson = await zip.file('database.json').async('string')
    const data = JSON.parse(dbJson)
    await importDatabase(data)

    // Write other files like before...
    for (const entry of Object.values(zip.files)) {
      // Directory
      if (entry.dir){
        await window.electronFs.fsMkdir(entry.name)
        continue;
      }
      // Images
      if(
        entry.name.startsWith('image_files') ||
        entry.name.startsWith('audio_files')
      ){
        const content = await entry.async('arraybuffer')
        await window.electronFs.importFile(content, entry.name)
      }
    }
  } catch(e){
    console.error(e)
  }
}