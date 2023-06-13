<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<style>
@import "./assets/css/base.css";
</style>

<script setup>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'
</script>
