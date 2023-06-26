<script>
import CheckedButton from "@/views/cart/childComps/CheckButton.vue";

export default {
  name: 'CartListItem',
  components: {CheckedButton},
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    }
  }
}
</script>

<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckedButton @click.native="checkClick" :is-checked="product.checked"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
