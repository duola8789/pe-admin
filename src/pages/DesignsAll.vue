<template>
  <div class="container">
    <Header></Header>
    <div class="table-container">
      <h1>管理系统</h1>
      <div class="query-container">
        <ElCard shadow="never" :body-style="{padding: '10px 20px', textAlign: 'left'}">
          <ElButton type="primary" icon="el-icon-search">查询</ElButton>
          <ElButton type="primary" icon="el-icon-plus">新建</ElButton>
        </ElCard>
      </div>
    <ElTable :data="examples" border>
      <ElTableColumn align="center" type="index" width="50"></ElTableColumn>
      <ElTableColumn
        align="center"
        v-for="column in columns"
        :key="column.id"
        :prop="column.prop"
        :label="column.title"
        :width="column.width"
        :min-width="column.minWidth || 100">
        <template slot-scope="scope">
          <div v-html="formatters(column.formatter, scope.row, column)">
          </div>
        </template>
      </ElTableColumn>
       <ElTableColumn
         align="center"
         label="操作"
         :width="85">
        <template slot-scope="scope">
          <ElButton class="table-button" size="mini" type="primary" icon="el-icon-view" @click="goToAdmin">查看</ElButton>
          <ElButton class="table-button" size="mini" type="primary" icon="el-icon-edit">编辑</ElButton>
          <ElButton class="table-button" size="mini" type="danger" icon="el-icon-delete">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import * as Request from '@/network/request';
  import { previewImage, showMessage } from '@/helper/uiHelper'
  import { forData } from '@/helper/httpHelper'
  import { formatters } from '@/helper/formatter'

  const CONF_QIU_NIU = {
    UploadUrl: 'http://up-z1.qiniup.com',
    domain: 'http://design.oldzhou.cn'
  };


  export default {
    data() {
      const columns = [
       {
          prop: 'title',
          title: '标题',
        }, {
          prop: 'category',
          title: '服务内容',
        }, {
          prop: 'designer',
          title: '设计机构',
          width: 80
        }, {
          prop: 'releaseTime',
          title: '发布时间',
          width: 80
        }, {
          prop: 'description',
          title: '设计说明',
          formatter: 'makeText'
        }, {
          prop: 'thumbnail',
          title: '缩略图',
          width: 150,
          formatter: 'makeImage',
        }, {
          prop: 'creator',
          title: '创建者',
          width: 120
        }, {
          prop: 'updater',
          title: '更新者',
          width: 120
        }, {
          prop: 'comment',
          title: '备注',
          formatter: 'makeText'
        },
      ];
      return {
        examples: [
          {
            id: 1,
            title: '豪华版声波经络理疗仪',
            designer: '品意设计',
            releaseTime: '2018年',
            creator: '周杰伦<br>2018-08-02',
            updater: '周杰伦<br>2018-08-02',
            category: '设计研究/外观设计/结构设计/手板制作/批量生产',
            thumbnail: 'https://i.pinimg.com/originals/3a/9b/dd/3a9bdd452ff107dd46c8f13be9596dd6.jpg',
            description: '声波经络理疗仪家族的桌面式豪华版本。取自层层叠叠，如浪似涛的波纹概涛的波纹概波纹概涛的波纹概波纹概涛的波纹概波纹概涛的波纹概波纹概涛的波纹概波纹概波纹概波概的波概...'
          },
          { id: 1 },
          { id: 1 }],
        previewImages: [],
        images: [],
        exampleInfo: {
          name: 'example1'
        },
        queryMerge: {},
        paginationInfo: {
          currentPage: 1,
          recordPerPage: 20,
          totalRecord: 0
        },
        columns: columns
      }
    },
    mounted() {
      this.refresh()
    },
    computed: {},
    methods: {
      async refresh() {
        this.examples = await forData(Request.design.findAll(this.queryMerge));
      },
      goToAdmin(row) {
        this.$router.push(`/admin/${row.id}`)
      },

      formatters(foos, row, column) {
        const val = row[column.prop];
        if (!foos) {
          if (val === undefined || val === null) {
            return '--'
          } else {
            return val
          }
        }
        return foos.split('|').reduce((val, foo) => {
          return formatters[foo](val, row)
        }, row[column.prop])
      },
    },


    components: {
      Header
    }
  }
</script>

<style scoped>
  .table-container {
    width: 1500px;
    margin: 10px auto;
  }
  .query-container {
    margin: 20px 0;
  }
  .table {
    text-align: center;
  }
  .table-button-wrap {
    text-align: center;
  }
  .table-button {
    margin: 4px 0!important;
    padding: 5px 10px;
  }
</style>
