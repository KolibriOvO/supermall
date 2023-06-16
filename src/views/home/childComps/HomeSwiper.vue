<script>
import Swiper from "@/components/common/swiper/Swiper.vue";

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components:{
    Swiper
  }
}
</script>

<template>
  <swiper v-if="banners.length>1" class="swiper">
    <template v-slot:swiper-item>
      <div v-for="(item,index) in banners" class="swiper-slide" :key=index>
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </div>
    </template>
  </swiper>
</template>

<style scoped>
.swiper{
  width: 100%;
}
.swiper img{
  width: 100%;
}
</style>
