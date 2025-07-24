import html2pdf from 'html2pdf.js';
import Crunker from 'crunker'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// Export of individual tours
// For backup, refer to utils/onExport

export default {
  exportToPDF,
  exportHtmlToDocx,
  exportToZip,
  exportTourAudioZip,
}

async function exportToPDF(fileName = 'export', element) {
  const options = {
    margin: 10,
    filename: fileName + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: {
      mode: ['css', 'legacy'],
      before: ['.pdf-page-break']
    }
  }

  html2pdf().set(options).from(element).save()
}

async function exportHtmlToDocx(filename = 'export', htmlContent) {
  // Disabled
  // const docContent = htmlDocx.asBlob(htmlContent)
  // saveAs(docContent, filename + '.docx')
}

async function exportToZip(zipname, htmlContent) {
  const zip = new JSZip()

  // 1. Add the HTML page
  // UPdate file paths + inject html header
  htmlContent = htmlContent.replace(
  /(?:src|href)="[^"]*?\.tern\/(image_files|audio_files)\/([^"]+)"/g,
    (match, folder, filename) => `src="./${folder}/${filename}"`
  )
  htmlContent = _getHeader(zipname) + htmlContent
  zip.file('index.html', htmlContent)

  // 2. Extract and download assets
  const assetPaths = extractAssetPaths(htmlContent)

  for (const path of assetPaths) {
    const filename = path.split('/').pop()
    const folder = path.includes('image_files') ? 'image_files' : 'audio_files'
    const fullPath = folder === 'image_files'? await window.electronFs.getImageUrl(filename)
      : await window.electronFs.getAudioUrl(filename)

    try {      
      const buffer = await window.electronFs.readAssetFile(fullPath)
      zip.folder(folder)
         .file(filename, buffer)
    } catch (err) {
      console.warn(`Could not fetch ${path}`, err)
    }
  }

  // 3. Generate and save the zip
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, zipname+'.zip')
}

function _getHeader(zipname){
  return `
  <head>
    <title>${zipname}</title>
    <style>${getCustomCss()}</style>
  </head>
  `
}

function extractAssetPaths(html) {
  const assetRegex = /(?:src|href)="(?:\.\/)?(image_files|audio_files)\/([^"]+)"/g
  const paths = []
  let match

  while ((match = assetRegex.exec(html)) !== null) {
    const folder = match[1]
    const filename = match[2]
    paths.push(`${folder}/${filename}`)
  }

  return paths
}

function getCustomCss(){
  return `
    /* Typography */
    .text-h4 { font-size: 2rem; font-weight: 500; }
    .text-h5 { font-size: 1.5rem; font-weight: 500; margin-top: 1rem; }
    .text-h6 { font-size: 1.25rem; font-weight: 500; }
    .text-subtitle1 { font-size: 1.1rem; color: #666; }
    .text-subtitle2 { font-size: 1rem; color: #777; }
    .text-caption { font-size: 0.875rem; color: #999; }
    .text-weight-bold { font-weight: bold; }
    .text-center { text-align: center; }

    /* Spacing */
    .q-my-sm { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .q-mt-sm { margin-top: 0.5rem; }
    .q-mb-sm { margin-bottom: 0.5rem; }
    .q-mb-md { margin-bottom: 1rem; }
    .q-mb-lg { margin-bottom: 2rem; }
    .q-py-lg { padding-top: 2rem; padding-bottom: 2rem; }
    .q-pa-md { padding: 1rem; }

    /* Layout */
    .row {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 1rem;
    }
    .col {
      flex: 1;
    }

    /* Separator */
    .q-separator {
      display: block;
      border-bottom: 1px solid #ccc;
      margin: 0.5rem 0;
    }

    /* img */
    img {
      display: block;
      object-fit: cover;
      border-radius: 4px;
      max-width: 100%;
    }

    /* Audio */
    audio {
      width: 100%;
      max-width: 400px;
      margin-top: 0.5rem;
    }

    /* Utility */
    body {
      font-family: Roboto, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      background: white;
      color: #222;
      padding: 30px;
    }

    ol {
      padding-left: 1.5rem;
    }

    p {
      margin: 0.5rem 0;
    }
  `
}

async function exportTourAudioZip(fileName = 'export', tour) {
  const zip = new JSZip()
  const crunker = new Crunker()

  for (const [index, stop] of tour.stops.entries()) {
    // Flatten all audio paths for this stop
    const audioPaths = stop.transcripts
      .flatMap(script => script.audio || [])
      .map(a => `/audio_files/${a.path}`)

    if (audioPaths.length === 0) continue // no audio

    try {
      let finalAudioBlob
      let outputFileName = `${ index+1 }_${  stop.name.replace(' ', '') }.mp3`

      if (audioPaths.length === 1) {
        // Just rename and add single file
        const res = await fetch(audioPaths[0])
        const blob = await res.blob()
        finalAudioBlob = blob
      } else {
        // Load + merge multiple audio files
        const buffers = await crunker.fetchAudio(...audioPaths)
        const merged = crunker.concatAudio(buffers)
        const output = crunker.export(merged, 'audio/mp3')
        finalAudioBlob = output.blob
      }

      zip.file(outputFileName, finalAudioBlob)
    } catch (err) {
      console.warn(`Failed to process stop ${stop.name}:`, err)
    }
  }

  // Final ZIP output
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  saveAs(zipBlob, `${fileName}-audio.zip`)
}
