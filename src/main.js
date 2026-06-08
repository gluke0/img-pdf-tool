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
  if (!imageDataUrl) return;

  // grayscale 
  let imageToUse = imageDataUrl;
  if (isGrayscale){
    imageToUse = await window.convertToGrayscale(imageDataUrl);
  }

  await new Promise((resolve) => {
    let img = new Image();
    img.onload = () =>{
      // landscape or portrait
      let orientation = img.width > img.height ? 'landscape' : 'portrait';

      let pdf = new window.jsPDF({
        orientation: orientation,
        unit: 'pt',
        format: 'a4',
      });

      let pageWidth = pdf.internal.pageSize.getWidth();
      let pageHeight = pdf.internal.pageSize.getHeight();

      // get img dimensions
      let imgWidth = img.width;
      let imgHeight = img.height;

      // scaling
      let widthRatio = pageWidth / imgWidth;
      let heightRatio = pageHeight / imgHeight;
      let minRatio = Math.min(widthRatio, heightRatio);

      // scale only if it can't fit in the a4 page and center
      if (minRatio < 1) {
        imgWidth = imgWidth * minRatio;
        imgHeight = imgHeight * minRatio;
      }
      let x = Math.max((pageWidth - imgWidth) / 2, 0);
      let y = Math.max((pageHeight - imgHeight) / 2, 0);

      pdf.addImage(imageToUse, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('image.pdf');
      
      resolve();
    };
    img.src = imageToUse;
  });
};