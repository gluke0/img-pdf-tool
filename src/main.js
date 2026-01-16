import { createApp } from 'vue'
import App from './App.vue'

import jsPDF from 'jspdf';

createApp(App).mount('#app')

// expose helpers globally
window.jsPDF = jsPDF

window.imageToDataUrl = function (file, cb){
  let reader = new FileReader()
  reader.onload = e => cb(e.target.result)
  reader.readAsDataURL(file)
}

window.generatePdfFromImage = function (imageDataUrl){
  if (!imageDataUrl) return

  let pdf = new window.jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  })

  let pageWidth = pdf.internal.pageSize.getWidth()
  let pageHeight = pdf.internal.pageSize.getHeight()

  let img = new Image()
  img.onload = ()=>{
    let imgWidth = pageWidth
    let imgHeight = pageHeight
    let y = Math.max((pageHeight - imgHeight) / 2, 0)

    pdf.addImage(imageDataUrl, 'PNG', 0, y, imgWidth, imgHeight) // [web:11][web:52]
    pdf.save('image.pdf')
  }
  img.src = imageDataUrl
}