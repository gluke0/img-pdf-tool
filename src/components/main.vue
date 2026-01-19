<script>
export default {
  name: 'Main',
  data() {
    return {
      imageDataUrl: null,
      isGrayscale: false, // b/w?
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      window.imageToDataUrl(file, (dataUrl) =>{
        this.imageDataUrl = dataUrl;
      });
    },

    downloadPdf(){
      if (!this.imageDataUrl) return;
      window.generatePdfFromImage(this.imageDataUrl, this.isGrayscale);
    },
  },
};
</script>

<template>
  <div class="main-div">
    <input type="file" accept="image/*" @change="onFileChange"/>
    <div class="preview-div" v-if="imageDataUrl">
      <h3>Preview</h3>
      <img 
        :src="imageDataUrl" 
        alt="preview"
        :style="{filter: isGrayscale ? 'grayscale(100%)' : 'none'}"/>
      <div class="bew">
        <div class="bew">
          <input type="checkbox" v-model="isGrayscale"/>
          Black and white
        </div>
      </div>
    </div>
    <button v-if="imageDataUrl" @click="downloadPdf">
      <i class="fa-solid fa-download"></i>
      <span class="download-word">Download</span>
      <span>PDF</span>
    </button>
  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>