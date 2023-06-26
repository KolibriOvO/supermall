<script>
export default {
  name: 'CheckedButton',
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<template>
  <div>
    <div class="check-button" :class="{'check':isChecked}">
      <img src="@/assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  border-color: red;
  background-color: red;
}
</style>
