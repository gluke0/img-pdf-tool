<script>
export default{
  name: "Header",
  mounted(){
   // toggle the helper
   let questionMark = document.querySelector('.question');
   let helperText = document.querySelector('.helper-text');

    if (questionMark && helperText){
      let toggleHelper = () =>{
        helperText.classList.toggle('hidden');
      };

   questionMark.addEventListener('click', toggleHelper);
   helperText.addEventListener('click', toggleHelper);

    }
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
      <div class="helper-text hidden">
         <span>
            Instant photo-to-PDF: Choose color or B&W and download your file!
            <br>
            It's easy. It's PImg!
         </span>
      </div>
   </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>