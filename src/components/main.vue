<script>

export default{
   name: "Main",
   data(){
      return{
      }
   },
   components:{
   }
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