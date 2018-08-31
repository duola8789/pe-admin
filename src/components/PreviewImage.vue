<template>
  <div class="upload-wrap">
    <div class="upload-button-wrap">
      <label class="upload-input-label-all">
        <i class="el-icon-edit image-choose-btn"></i><span>选择图片</span>
        <input type="file" multiple @change="previewHandler" accept="image/*" class="upload-input">
      </label>
      <span class="input-tip">（详情图用于案例详情页，尺寸不小于1800*1200，比例保持一致）</span>
      <!--<ElButton size="mini" type="primary" @click="handleSubmit" icon="el-icon-upload">提交</ElButton>-->
    </div>
    <ul class="preview-image-container">
      <li v-for="image in previewImages" :key="image.id" class="preview-item">
        <div class="preview-img-wrap">
          <img :src="image.src" class="preview-img">
           <label class="upload-input-label">
             <i class="el-icon-edit image-replace-btn"></i>
             <input type="file" @change="event => replaceImageHandler(event, image)" accept="image/*" class="upload-input">
          </label>
          <ElButton type="danger" icon="el-icon-delete" circle class="image-del-btn" size="mini"
                    @click="deleteImageHandler(image)"></ElButton>
        </div>
      </li>
      <li class="preview-item">
        <label class="preview-icon"><i class="el-icon-plus image-edit-icon"></i><input type="file" @change="previewHandlerSingle" accept="image/*" class="upload-input">
        </label>
      </li>
    </ul>
  </div>
</template>
<script>
  import { previewImage, showMessage } from '@/helper/uiHelper'
  import * as Request from '@/network/request';
  import { forData } from '@/helper/httpHelper'


  export default {
    name: 'PreviewImage',
    props: {
      border: {
        type: Boolean,
        default: false
      },
      type: {
        type: Boolean,
      }
    },
    data() {
      return {
        previewImages: []
      }
    },
    watch: {
      previewImages() {
        this.$emit('previewPics', this.previewImages)
      }
    },
    computed: {},
    methods: {
      test() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(222)
          }, 5000)
        })
      },
      // 预览图片
      previewHandler(e) {
        const { files } = e.target;
        if (files && files.length > 0) {
          previewImage(e.target.files).then(v => {
            this.previewImages = v;
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
          this.previewImages.splice(index, 1, v[0]);
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
          ];
          e.target.value = ''
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

      async submitAll(file) {
        // 获取上传token
        const uploadToken = await this.getUploadToken();

        const uploadImage = await this.uploadImage(file[0], uploadToken);

        this.images.push(uploadImage)
      },

      // 获取上传token
      async getUploadToken() {
        let token = this.$cookie.get('uploadToken');
        if (token) {
          return token
        }
        const res = await forData(Request.design.certificate());
        token = res.data.ret.uploadToken;
        const expireTime = new Date(Date.now() + 60 * 1000);
        this.$cookie.set('uploadToken', token, {
          expires: expireTime
        });
        return token
      },

      async uploadImage(file, uploadToken) {
        // 通过formData上传图片
        let formData = new FormData();
        formData.append('token', uploadToken);
        formData.append('file', file);
        console.log(file)
        formData.append('resource_key', this.exampleInfo.name + Date.now());
        // 上传到七牛
        // const res = this.$http.post(CONF_QIU_NIU.UploadUrl, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   withCredentials: false
        // });
        // const src = `${domain}/${res.key}`

      }
    },
    components: {}
  }
</script>

<style scoped>
  .preview-image-container {
    margin: 0;
    padding: 0 ;
    font-size: 0;
  }
  .preview-item {
    display: inline-block;
    width: 290px;
    height: 200px;
    margin: 0 8px 8px 0;
    list-style: none;
    vertical-align: top;
  }
  .preview-icon {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 80px;
    border-radius: 6px;
    color: #909399;
    border: 1px solid antiquewhite;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
    user-select: none;
  }
  .preview-icon:active,
  .preview-icon:hover {
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .3em 1em rgba(0, 0, 0, 0.12);
  }
  .image-edit-icon {
    margin-top: 55px;
  }
  .preview-img-wrap {
    width: 100%;
    height: 100%;
    margin-bottom: 5px;
    border-radius: 6px;
    /*overflow: hidden;*/
  }
  .preview-img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  .upload-button-wrap {
    margin: 0 0 10px 0;
  }
  .preview-img-wrap {
    position: relative;
  }
  .upload-input-label-all {
    display: inline-block;
    margin: 0;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 14px;
    border-radius: 3px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    cursor: pointer;
  }
  .upload-input-label-all:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .upload-input-label-all:active {
    outline: 0;
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .image-choose-btn {
    margin-right: 5px
  }
  .upload-input-label {
    position: absolute;
    right: 42px;
    top: 5px;
    line-height: 0;
    border-radius: 50%;
  }
  .upload-input-label:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .upload-input-label:active {
    outline: 0;
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .image-del-btn {
    position: absolute;
    right: 4px;
    top: 5px;
    padding: 10px;
    border: none;
    opacity: 0.7;
    font-size: 14px;
  }
  .upload-input {
    width: 0;
    font-size: 0;
    visibility: hidden;
  }
  .image-replace-btn {
    border-radius: 50%;
    padding: 10px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    cursor: pointer;
    font-size: 14px;
    opacity: 0.7;
  }
  .input-tip {
    margin-left: 30px;
  }
</style>
