<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import {getHomeGoods, getHomeMultidata} from "@/network/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
import RecommendView from "@/views/home/childComps/RecommendView.vue";
import FeatureView from "@/views/home/childComps/FeatureView.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodList from "@/components/content/goods/GoodsList.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";

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
      isShowBackTop: false,
      saveY: 0
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
    showBackTop() {
      this.isShowBackTop = window.scrollY > window.innerHeight / 2;
    },
    onScroll() {
      //可滚动容器的高度
      let innerHeight = this.$el.clientHeight;
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      //避免切换时读取到异常高度
      if (scrollTop === 0) {
        innerHeight = 10000
      }
      if (innerHeight <= outerHeight + scrollTop) {
        //此处添加自定义操作
        this.getHomeGoods(this.currentType)
      }
    },
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
    window.addEventListener('scroll', this.showBackTop)
    window.addEventListener("scroll", this.onScroll);
  },
  activated() {
    document.documentElement.scrollTop = this.saveY
    document.body.scrollTop = this.saveY
  },
  beforeRouteLeave(to, from, next) {
    this.saveY = document.documentElement.scrollTop || document.body.scrollTop
    next()
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
      <div class="load-more"
           ref="load-more">
        上拉加载更多
      </div>
    </div>

    <back-top v-show="isShowBackTop"/>
  </div>
</template>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
}

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
  z-index: 7;
}

.load-more {
  display: block;
  width: 100%;
  line-height: 40px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
