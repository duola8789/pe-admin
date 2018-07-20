<template>
  <div>
    <ul class="ul-container">
      <li>id : {{exampleInfo.id}}</li>
      <li>title: {{exampleInfo.title}}</li>
      <li>image: {{exampleInfo.image}}</li>
    </ul>
    <ElButton type="primary" icon="el-icon-plus" size="medium" @click="add">add</ElButton>
    <ElButton type="primary" icon="el-icon-edit" size="medium" @click="edit">edit</ElButton>
    <ElButton type="danger" icon="el-icon-delete" size="medium" @click="remove">delete</ElButton>
    <ElButton type="danger" icon="el-icon-back" size="medium" @click="back">Back</ElButton>
  </div>
</template>

<script>
  import * as API from '@/newwork/api';
  import * as uiHelper from '@/helper/uiHelper';

  export default {
    data() {
      return {
        exampleInfo: {
          id: '',
          title: '',
          image: '',
        }
      }
    },
    mounted() {
      this.init();
    },
    beforeRouteUpdate(to, from, next) {
      this.init(to.params.id)
    },
    computed: {},
    methods: {
      init(id = this.$route.params.id) {
        const self = this;
        this.$http.get(`${API.exampleAPI.find}/${id}/`)
          .then(res => {
            const data = res.data;
            if (data && data.success) {
              this.exampleInfo = {
                ...data.ret
              }
            } else {
              uiHelper.showMessage(data.retDsc, 'error', 1500, self.goBack)
            }
          })
          .catch(e => {
            console.log('查询example错误', e)
          })
      },
      goBack() {
        this.$router.push('/admin/')
      },
      add() {
        const exampleInfo = {
          title: new Date().toLocaleDateString(),
          image: new Date().toLocaleTimeString()
        };
        this.$http.post(API.exampleAPI.add, exampleInfo)
          .then(res => {
            const data = res.data;
            if (data && data.success) {
              uiHelper.showMessage(data.retDsc, 'success', 1000);
            } else {
              uiHelper.showMessage(data.retDsc, 'error', 1500);
            }
          })
          .catch(e => {
            console.log('查询example错误', e)
          })
      },
      edit() {
        const exampleInfo = {
          id: this.exampleInfo.id,
          title: new Date().toLocaleDateString(),
          image: new Date().toLocaleTimeString()
        };
        this.$http.put(API.exampleAPI.update, exampleInfo)
          .then(res => {
            const data = res.data;
            if (data && data.success) {
              uiHelper.showMessage(data.retDsc, 'success', 1000);
              this.exampleInfo = {
                ...exampleInfo
              }
            } else {
              uiHelper.showMessage(data.retDsc, 'error', 1500);
            }
          })
          .catch(e => {
            console.log('更新example错误', e)
          })
      },
      remove() {
        const self = this;
        this.$http.delete(`${API.exampleAPI.remove}/${this.exampleInfo.id}/`)
          .then(res => {
            const data = res.data;
            if (data && data.success) {
              uiHelper.showMessage(data.retDsc, 'success', 1000, self.goBack);
              this.exampleInfo = {
                ...exampleInfo
              }
            } else {
              uiHelper.showMessage(data.retDsc, 'error', 1500);
            }
          })
          .catch(e => {
            console.log('更新example错误', e)
          })
      },
      back() {
        console.log(this.$router.back())
      }
    },
    components: {}
  }
</script>

<style scoped>
  .ul-container {
    width: 450px;
    margin: 50px auto;
    border: 1px solid darkgoldenrod;
    border-radius: 10px;
    text-align: left;
  }
  .ul-container li {
    margin: 20px 0;
  }
</style>
