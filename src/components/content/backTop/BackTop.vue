<script>
export default {
  name: 'BackTop',
  methods:{
    backClick(){
      document.documentElement.scrollTo({left:0,top:0,behavior:'smooth'});
      }
    }
}
</script>

<template>
  <div class="back-top"
       @click="backClick">
    <img src="@/assets/img/common/top.png" alt="">
  </div>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>
