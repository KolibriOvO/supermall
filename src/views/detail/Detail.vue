<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar.vue";
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper.vue";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo.vue";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo.vue";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo.vue";
import GoodList from "@/components/content/goods/GoodsList.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar.vue";
import {mapActions} from "vuex";

export default {
  name: 'Detail',
  components: {
    DetailBottomBar,
    BackTop,
    GoodList,
    DetailCommentInfo,
    DetailParamInfo, DetailGoodsInfo, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      bodyHeight: 0,
      isActive: 0,
      isShowBackTop: false
    }
  },
  methods: {
    ...mapActions(['addCart']),
    showBackTop() {
      this.isShowBackTop = window.scrollY > window.innerHeight / 2;
    },
    imgLoad() {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      window.scrollTo({
        top: this.themeTopYs[index],
        left: 0,
        behavior: "smooth"
      })
    },
    showTitle() {
      this.bodyHeight = document.documentElement.scrollTop || document.body.scrollTop
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      this.addCart(product).then(res => {
        console.log(res);
      })
    },
    buyNow() {

    }
  },
  mounted() {
    window.addEventListener('scroll', this.showBackTop)
    window.addEventListener('scroll', this.showTitle)
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  watch: {
    bodyHeight: {
      handler(newVal) {
        if (newVal >= this.themeTopYs[0] && newVal < this.themeTopYs[1]) {
          this.isActive = 0
        }
        if (newVal >= this.themeTopYs[1] && newVal < this.themeTopYs[2]) {
          this.isActive = 1
        }
        if (newVal >= this.themeTopYs[2] && newVal < this.themeTopYs[3]) {
          this.isActive = 2
        }
        if (newVal >= this.themeTopYs[3]) {
          this.isActive = 3
        }
        if (newVal === 0) {
          this.isActive = 0
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" :isActive="isActive"/>
    <div ref="scroll" class="content">
      <DetailSwiper :top-images="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imgLoad="imgLoad" class="goods-info" ref="goodsInfo"/>
      <DetailParamInfo :param-info="paramInfo" ref="params"/>
      <DetailCommentInfo :comment-info="commentInfo" ref="comment"/>
      <GoodList :goods="recommends" ref="recommend"/>
    </div>
    <DetailBottomBar @addCart="addToCart" @buyNow="buyNow"/>
    <back-top v-show="isShowBackTop"/>
  </div>
</template>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 100px);
  overflow: hidden;
  position: relative;
  top: 44px;
}
</style>
