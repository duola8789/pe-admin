<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Login from '@/components/Login';

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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
