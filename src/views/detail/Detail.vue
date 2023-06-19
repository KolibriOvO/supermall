<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar.vue";

export default {
  name:'Detail',
  components: {DetailNavBar},
  data(){
    return{
      iid:null
    }
  },
  created() {
    this.iid = this.$route.params.iid
  }
}
</script>

<template>
<div id="detail">
  <DetailNavBar/>
</div>
</template>

<style scoped>

</style>
