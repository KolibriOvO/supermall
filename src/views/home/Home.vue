<script>
import NavBar from "@/common/navbar/NavBar.vue";
import {getHomeMultidata} from "@/network/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    NavBar
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<template>
  <div id="home">
    <NavBar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </NavBar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
