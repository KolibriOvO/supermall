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

export default {
  name: 'Detail',
  components: {
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
      themeTopYs:[]
    }
  },
  methods: {
    imgLoad() {
      // 给navbar中的item定位到对应的位置
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
    },
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
    });
  }
}
</script>

<template>
  <div id="detail">
    <DetailNavBar class="detail-nav"/>
    <DetailSwiper :top-images="topImages"/>
    <DetailBaseInfo :goods="goods"/>
    <DetailShopInfo :shop="shop"/>
    <DetailGoodsInfo :detail-info="detailInfo" @imgLoad="imgLoad" class="goods-info" ref="goodsInfo"/>
    <DetailParamInfo :param-info="paramInfo" ref="params"/>
    <DetailCommentInfo :comment-info="commentInfo" ref="comment"/>
    <GoodList :goods="recommends" ref="recommend"/>
  </div>
</template>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
