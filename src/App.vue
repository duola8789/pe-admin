<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Login from '@/pages/Login';

  export default {
    name: 'App'
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  #app {
    font-family: 'PingFangSC-Regular', '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #444;
  }
  .thumbnail {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    vertical-align: middle;
  }
  .table-text {
    margin: 0 auto;
    max-height: 68px;
    text-align: center;
    word-break: break-all;
    overflow: hidden;
  }
  .text-overflow-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .upload-input {
    display: none;
  }
  .input-tip {
    font-size: 14px;
    font-weight: bold;
    color: #E6A23C;
    margin: 0
  }
</style>
