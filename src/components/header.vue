<script>

export default{
   name: "Header",
   data(){
      return{
      }
   },
   components:{
   }
};
</script>

<template>
   <div class="title-pj">
      <h1>PImg</h1>
      <div class="subt">
         <h2>Your photos turn into PDFs.</h2>
         <p class="question">
            <i class="fa-regular fa-circle-question"></i>
         </p>
      </div>
      <div class="helper-text">
         <span>
            Instant photo-to-PDF: Choose color or B&W and download your file!
            <br>
            It is easy. It is PImg!
         </span>
      </div>
   </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>