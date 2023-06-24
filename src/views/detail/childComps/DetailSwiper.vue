<script>
import Swiper from "@/components/common/swiper/Swiper.vue";

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper
  }
}
</script>

<template>
  <swiper v-if="topImages.length>1" class="detail-swiper">
    <template v-slot:swiper-item>
      <div v-for="(item,index) in topImages" :key=index class="swiper-slide">
        <img :src="item" alt="">
      </div>
    </template>
  </swiper>
</template>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}

.detail-swiper img {
  width: 100%;
}
</style>
