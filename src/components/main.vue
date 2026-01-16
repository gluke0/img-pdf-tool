<script>
export default{
  name: 'Main',
  data(){
    return{
      imageDataUrl: null,
    };
  },
  methods: {
    onFileChange(event){
      const file = event.target.files[0];
      if (!file) return;
      window.imageToDataUrl(file, (dataUrl) =>{
        this.imageDataUrl = dataUrl;
      });
    },
    downloadPdf() {
      if (!this.imageDataUrl) return;
      window.generatePdfFromImage(this.imageDataUrl); // global helper
    },
  },
};
</script>

<template>
   <div class="main-div">
      <input type="file" accept="image/*" @change="onFileChange"/>
      <div class="preview-div" v-if="imageDataUrl">
         <h3>Preview</h3>
         <img :src="imageDataUrl" alt="preview"/>
      </div>
      <button v-if="imageDataUrl" @click="downloadPdf">
      <i class="fa-solid fa-download"></i> <span class="download-word">Download</span> <span>PDF</span>
      </button>
  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>