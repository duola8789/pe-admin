<template>
  <div class="table-container">
    <h1>EXAMPLES</h1>
    <ElTable :data="examples" border style="width: 100%" @row-click="goToAdmin">
      <ElTableColumn prop="id" width=50 label="id" align="center"></ElTableColumn>
      <ElTableColumn prop="title" label="标题" align="center"></ElTableColumn>
      <ElTableColumn prop="image" label="图片" align="center"></ElTableColumn>
    </ElTable>
  </div>
</template>

<script>
  import * as API from '@/newwork/api';
  export default {
    data() {
      return {
        examples: []
      }
    },
    mounted() {
      this.init()
    },
    computed: {},
    methods: {
      init() {
        const self = this;
        this.$http.get(API.exampleAPI.findAll)
          .then(res => {
            const data = res.data;
            if (data && data.success) {
              this.examples = data.ret;
            } else {
              this.$message({
                message: data.retDsc,
                type: 'error',
                duration: 1500,
              });
            }
          })
          .catch(e => {
            console.log('查询example错误', e)
          })
      },
      goToAdmin(row) {
        this.$router.push(`/admin/${row.id}`)
      },
    },
    components: {}
  }
</script>

<style scoped>
  .table-container {
    width: 50%;
    margin: 0 auto;
    padding-top: 20px;
  }
  .table {
    text-align: center;
  }
</style>
