<script>
import NavBar from "@/common/navbar/NavBar.vue";
import {getHomeMultidata} from "@/network/home";

export default {
  name: 'Home',
  components: {
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
      this.banners = res.data.banners.list;
      this.recommends = res.data.recommends.list
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
  </div>
</template>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
