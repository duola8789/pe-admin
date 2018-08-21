<template>
  <header class="header-container">
    <div class="header">
      <img class='logo' src="@/assets/PE-logo-all.jpg">
      <div>
        <span class="nickname">{{nickname}}，你好！</span>
        <ElButton size="mini" type="primary" @click="handleLogout">退出</ElButton>
      </div>

    </div>
  </header>
</template>

<script>
  import { showMessage } from '@/helper/uiHelper'
  import URL from '@/router/url'

  export default {
    name: 'Header',
    props: [],
    data() {
      return {
        nickname: ''
      }
    },
    mounted() {
      this.nickname = window.sessionStorage.getItem('nickname')
    },
    computed: {},
    methods: {
      handleLogout() {
        window.sessionStorage.clear();
        showMessage('退出成功', 'success', 1000, () => {
          this.$router.push(URL.login)
        });
      }
    },
    components: {}
  }
</script>

<style scoped>
  .header-container {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1500px;
    margin: 0 auto;
  }
  .logo {
    width: 140px;
  }
  .nickname {
    vertical-align: middle;
    margin-right: 10px;
  }
</style>
