<template>
  <div class="table-container">
    <h1>EXAMPLES</h1>
    <ElTable :data="examples" border style="width: 100%" @row-click="goToAdmin">
      <ElTableColumn prop="id" width=50 label="id" align="center"></ElTableColumn>
      <ElTableColumn prop="title" label="标题" align="center"></ElTableColumn>
      <ElTableColumn prop="image" label="图片" align="center"></ElTableColumn>
    </ElTable>
    <div class="upload-wrap">
      <div class="upload-button-wrap">
        <label class="upload-input-label">
          <span>选择图片</span><input type="file" multiple @change="previewHandler" accept="image/*" class="upload-input">
        </label>
        <ElButton size="mini" type="primary" @click="handleSubmit">提交</ElButton>
    </div>
      <ul class="preview-image-container">
        <li v-for="image in previewImages" :key="image.id" class="preview-item">
          <div class="preview-img-wrap">
            <img :src="image.src" class="preview-img">
          </div>
          <div class="preview-button-wrap">
            <label class="upload-input-label">
              <span>替换</span><input type="file" @change="event => replaceImageHandler(event, image)" accept="image/*"
                                    class="upload-input">
            </label>
            <ElButton @click="deleteImageHandler(image)" size="mini" type="primary">删除</ElButton>
          </div>
        </li>
         <li class="preview-item placement-wrap">
          <label class="placement">
            +<input type="file" @change="previewHandlerSingle" accept="image/*" class="upload-input"></label>
        </li>
    </ul>
    </div>

  </div>
</template>

<script>
  import * as API from '@/network/api';
  import { previewImage, showMessage } from '@/helper/uiHelper'

  export default {
    data() {
      return {
        examples: [],
        previewImages: []
      }
    },
    mounted() {
      // this.init()
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

      // 预览图片
      previewHandler(e) {
        const { files } = e.target;
        if (files && files.length > 0) {
          previewImage(e.target.files).then(v => {
            this.previewImages = v
          }).catch(error => {
            e.target.value = '';
          })
        }
      },

      // 替换图片
      replaceImageHandler(e, image) {
        const { id, src } = image;
        const { files } = e.target;
        // 图片已存在
        if (this.imageExist(files[0].name)) {
          return;
        }
        previewImage(files).then(v => {
          let index = this.previewImages.findIndex(v => v.id === id);
          this.previewImages.splice(index, 1, v[0])
        }).catch(error => {
          e.target.value = src;
        });
      },

      // 添加单张
      previewHandlerSingle(e) {
        const { files } = e.target;
        // 图片已存在
        if (this.imageExist(files[0].name)) {
          return;
        }
        previewImage(files).then(v => {
          this.previewImages = [
            ...this.previewImages,
            v[0]
          ]
        }).catch(error => {
          e.target.value = src;
        });
      },

      // 删除图片
      deleteImageHandler(e) {
        const { id } = e;
        this.previewImages.splice(this.previewImages.findIndex(v => v.id === id), 1);
        showMessage('删除成功', 'success');
      },

      // 图片已存在
      imageExist(fileName) {
        return !!this.previewImages.find(v => v.name === fileName) && !showMessage('图片已存在', 'error');
      },

      // 提交表单
      handleSubmit() {
        if (!this.previewImages.length) {
          showMessage('请上传图片', 'error');
          return false;
        }
        this.$confirm('确定要提交吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.submitAll()
        }).catch(() => {
          showMessage('已取消', 'info')
        })
      },

      async submitAll() {
        // 获取上传token
        const res = await this.$http.get(API.exampleAPI.upload);
        const uploadToken = res.data.ret.uploadToken;
        // 参数
        const Qiniu_UploadUrl = 'http://up-z1.qiniup.com';
        const domain = 'http://design.oldzhou.cn';
        // 通过formData上传图片
        let formData = new FormData();
        formData.append('token', uploadToken);
        formData.append('file', this.previewImages[0].file);

        this.$http.post(Qiniu_UploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: false
        }).then(res => {
          const src = `${domain}/${res.key}`
        });
      }
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
  .upload-wrap {
    width: 800px;
    margin: 10px auto;
  }
  .preview-image-container {
    margin: 0;
    padding: 2px 5px;
    border: 1px solid #333;
    overflow: hidden;
  }
  .preview-item {
    float: left;
    width: 25%;
    height: 300px;
    margin: 10px 0;
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;
  }
  .placement-wrap {
    padding-bottom: 5px;
  }
  .placement {
    height: 90%;
    line-height: 270px;
    font-size: 80px;
    border-radius: 6px;
    color: #909399;
    border: 1px solid antiquewhite;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
  }
  .placement:active {
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .3em 1em rgba(0, 0, 0, 0.12);
  }
  .preview-img-wrap {
    height: 90%;
    margin-bottom: 5px;
    border-radius: 6px;
    overflow: hidden;
  }
  .preview-img {
    width: 100%;
    border-radius: 6px;
  }
  .upload-button-wrap {
    margin: 10px 0;
  }
  .upload-input-label {
    display: inline-block;
    margin: 0 5px;
    padding: 6px 8px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    cursor: pointer;
  }
  .upload-input {
    width: 0;
    font-size: 0;
    visibility: hidden;
  }
</style>
