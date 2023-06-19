<script>
import NavBar from "@/common/navbar/NavBar.vue";

export default {
  name: 'DetailNavBar',
  components: {NavBar},
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<template>
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div v-for="(item,index) in titles"
             :key="index"
             class="title-item"
             :class="{active:index === currentIndex}"
             @click="itemClick(index)">
          {{ item }}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text)
}

.back img {
  margin-top: 12px;
}
</style>
