import { createApp } from 'vue'
import App from './App.vue'
import jsPDF from 'jspdf'

createApp(App).mount('#app')

// expose helpers globally
window.jsPDF = jsPDF

window.imageToDataUrl = function (file, cb){
  let reader = new FileReader()
  reader.onload = () => cb(reader.result)
  reader.readAsDataURL(file)
}

// convert to grayscale using canvas filter CanvasRenderingContext2D.filter API
window.convertToGrayscale = function (dataUrl){
  return new Promise((resolve) =>{
    let img = new Image()
    img.onload = () =>{
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      let ctx = canvas.getContext('2d')

      // apply grayscale filter and draw the image
      ctx.filter = 'grayscale(100%)'
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      let grayDataUrl = canvas.toDataURL('image/png')
      resolve(grayDataUrl)
    }
    img.src = dataUrl
  })
}

// main PDF generator
window.generatePdfFromImage = async function (imageDataUrl, isGrayscale){
  if (!imageDataUrl) return

  // if grayscale requested, convert first
  let imageToUse = imageDataUrl
  if (isGrayscale){
    imageToUse = await window.convertToGrayscale(imageDataUrl)
  }

  const pdf = new window.jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  })

  let pageWidth = pdf.internal.pageSize.getWidth()
  let pageHeight = pdf.internal.pageSize.getHeight()

  await new Promise((resolve) =>{
    let img = new Image()
    img.onload = () =>{
      let imgWidth = pageWidth
      let imgHeight = pageHeight
      let y = Math.max((pageHeight - imgHeight) / 2, 0)

      pdf.addImage(imageToUse, 'PNG', 0, y, imgWidth, imgHeight)
      pdf.save('image.pdf')
      resolve()
    }
    img.src = imageToUse
  })
}