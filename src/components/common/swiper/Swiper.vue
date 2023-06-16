<script>
import Swiper from "swiper"
import 'swiper/css/swiper.min.css';

export default {
  name: "Swiper",
  mounted() {
    new Swiper('.swiper-container', {
      pagination: {
        el: ".swiper-pagination",
        clickable: false //允许分页点击跳转
      },
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false
      }
    })
  }
}
</script>

<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot name="swiper-item"></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<style scoped>
.swiper-container >>> .swiper-pagination-bullet-active {
  opacity: 1;
  background: red;
}
</style>
