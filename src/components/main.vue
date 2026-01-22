<script>
export default{
  name: 'Main',
  data(){
    return{
      imageDataUrl: null,
      isGrayscale: false,
    }
  },
  methods:{
    onFileChange(event){
      const file = event.target.files[0]
      if (!file) return

      window.imageToDataUrl(file, (dataUrl) =>{
        this.imageDataUrl = dataUrl
      })
    },

    async downloadPdf(){
      if (!this.imageDataUrl) return
      // pass data url and grayscale if there
      await window.generatePdfFromImage(this.imageDataUrl, this.isGrayscale)
    },
  },
}
</script>

<template>
  <div class="main-div">
    <input type="file" accept="image/*" @change="onFileChange" />
    <div class="preview-div" v-if="imageDataUrl">
      <h3>Preview</h3>
      <img :src="imageDataUrl" alt="preview" :style="{ filter: isGrayscale ? 'grayscale(100%)' : 'none' }"/>
      <div class="bew">
        <input type="checkbox" v-model="isGrayscale" />
        <span class="bew-text">Black and white</span>
      </div>
    </div>
    <div class="div-div" v-if="imageDataUrl" @click="downloadPdf">
      <button class="download-div">
        <i class="fa-regular fa-file-pdf"></i>
        <span>Download PDF</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>