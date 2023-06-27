<script>
import CartListItem from "@/views/cart/childComps/CartListItem.vue";
import {mapGetters} from "vuex";

export default {
  name: 'CartList',
  components: {CartListItem},
  computed: {
    ...mapGetters([
      'cartList'
    ])
  }
}
</script>

<template>
  <div class="cart-list">
    <div class="content" ref="scroll">
      <CartListItem v-for="(item,index) in cartList"
                    :product="item"
                    :key="index"/>
    </div>
  </div>
</template>

<style scoped>
.cart-list {
  height: calc(100% - 44px);
}

.content {
  height: calc(100% - 95px);
  overflow: hidden;
}
</style>
