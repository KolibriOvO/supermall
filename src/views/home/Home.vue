<script>
import NavBar from "@/common/navbar/NavBar.vue";
import {getHomeGoods, getHomeMultidata} from "@/network/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
import RecommendView from "@/views/home/childComps/RecommendView.vue";
import FeatureView from "@/views/home/childComps/FeatureView.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodList from "@/components/content/goods/GoodsList.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";
import backTop from "@/components/content/backTop/BackTop.vue";

export default {
  name: 'Home',
  components: {
    BackTop,
    GoodList,
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    NavBar
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    },
    handleScroll() {
      this.isShowBackTop = window.scrollY > window.innerHeight / 2;

    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
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

    <div class="content" ref="scroll">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <FeatureView/>
      <TabControl :titles="['流行','新款','精选']"
                  class="tab-control"
                  @tabClick="tabClick"/>
      <GoodList :goods="showGoods"/>
    </div>

    <back-top v-show="isShowBackTop"/>
  </div>
</template>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 43px;
  z-index: 9;
}
</style>
