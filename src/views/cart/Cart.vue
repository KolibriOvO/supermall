<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import {mapGetters} from "vuex";

export default {
  name: 'Cart',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <template v-slot:center>购物车{{ length }}</template>
    </NavBar>
  </div>
</template>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.cart {
  height: 100vh;
}
</style>
