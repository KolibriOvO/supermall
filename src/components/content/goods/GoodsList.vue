<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem.vue";

export default {
  name: 'GoodList',
  components: {GoodsListItem},
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<template>
  <div class="goods">
    <GoodsListItem v-for="(item,index) in goods"
                   :key="index"
                   :goods-item="item"/>
  </div>
</template>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
