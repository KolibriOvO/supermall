<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar class="main-tab-bar"/>
  </div>
</template>

<style>
@import "./assets/css/base.css";
.main-tab-bar{
  z-index: 8;
}
</style>

<script setup>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'
</script>
