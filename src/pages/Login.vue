<template>
  <div class="login-wrapper">
    <div class="header">
      <img src="../assets/logo.png">
    </div>
    <div class="main">
      <div>
        <ElRow type="flex" class="row-bg" justify="center">
          <ElCol :span="6">
            <ElInput type="text"
                   placeholder="请输入用户名"
                   v-model.trim="username"
                   clearable
                   autofocus="true"
                   @keyup.enter.native="login">
            </ElInput>
          </ElCol>
        </ElRow>
        <ElRow type="flex" class="row-bg" justify="center">
          <ElCol :span="6">
            <ElInput type="password"
                      placeholder="请输入密码"
                      v-model.trim="password"
                      clearable
                      @keyup.enter.native="login">
            </ElInput>
          </ElCol>
        </ElRow>
        <ElRow type="flex" class="row-bg" justify="center">
          <ElCol :span="6">
            <ElButton type="primary" class="login-button" @click="login">登陆</ElButton>
          </ElCol>
        </ElRow>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from '@/network/api';
  import * as uiHelper from '@/helper/uiHelper';
  import URL from '@/router/url'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {},
    methods: {
      login() {
        const self = this;
        if (!this.username) {
          uiHelper.showMessage('请输入用户名', 'error');
          return;
        }
        if (!this.password) {
          uiHelper.showMessage('请输入密码', 'error');
          return;
        }

        const userInfo = {
          username: this.username,
          password: this.password,
        };

        // 将信息发送给后端
        this.$http.post(API.userAPI.login, userInfo)
          .then(res => {
            const data = res.data;
            if (!data.success) {
              uiHelper.showMessage(data.retDsc, 'error');
            } else {
              sessionStorage.setItem('userToken', data.ret.token);
              sessionStorage.setItem('nickname', data.ret.nickname);
              uiHelper.showMessage(data.retDsc, 'success', 1000, self.goInside);
            }
          })
          .catch((e) => {
            console.log('登陆错误', e)
          })
      },
      goInside() {
        this.$router.push(URL.designAll)
      }
    },
    components: {}
  }
</script>

<style scoped>
  .login-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-top: 100px;
    background-image: linear-gradient(to right, #7A88FF, #7AFFAF);
    overflow: auto;
  }
  .el-row {
    margin: 0 0 20px;
  }
  .main {
    margin-top: 50px;
  }
  .login-button {
    width: 100%;
  }
</style>
