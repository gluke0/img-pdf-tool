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
      window.imageToDataUrl(file, (dataUrl) =>{ // global helper [web:48][web:51]
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
      <div v-if="imageDataUrl">
         <h3>Preview</h3>
         <img :src="imageDataUrl" alt="preview" style="max-width: 300px;"/>
      </div>
      <button v-if="imageDataUrl" @click="downloadPdf">
      Download PDF
      </button>
  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>