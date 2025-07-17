import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { exportDatabase, Database } from 'src/db/db' // Get database

const Images = new Database('image_files')
const AudioDatabase = new Database('audio_files')

export default async () => {
    const zip = new JSZip()

    // 1. Dump Dexie DB
    const allTables = await exportDatabase()
    zip.file('database.json', JSON.stringify(allTables, null, 2))

    // 2. Add local images and audio files
    const imageExportList = await Images.getAll()
    for(const image of imageExportList){
      const filename = image.path;
      const res = await fetch(`/image_files/${filename}`)
      const blob = await res.blob()
      zip.folder('image_files').file(filename, blob)
    }

    const audioExportList = await AudioDatabase.getAll() 
    for(const image of audioExportList){
      const filename = image.path;
      const res = await fetch(`/audio_files/${filename}`)
      const blob = await res.blob()
      zip.folder('audio_files').file(filename, blob)
    }

    // Save to file system
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, 'tour-backup.zip')
}
