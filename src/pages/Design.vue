<template>
  <!--<div>-->
  <!--<ul class="ul-container">-->
  <!--<li>id : {{exampleInfo.id}}</li>-->
  <!--<li>title: {{exampleInfo.title}}</li>-->
  <!--<li>image: {{exampleInfo.image}}</li>-->
  <!--</ul>-->
  <!--<ElButton type="primary" icon="el-icon-plus" size="medium" @click="add">add</ElButton>-->
  <!--<ElButton type="primary" icon="el-icon-edit" size="medium" @click="edit">edit</ElButton>-->
  <!--<ElButton type="danger" icon="el-icon-delete" size="medium" @click="remove">delete</ElButton>-->
  <!--<ElButton type="danger" icon="el-icon-back" size="medium" @click="back">Back</ElButton>-->
  <!--</div>-->
  <div class="container">
    <Header></Header>
    <div class="inner-container">
      <h1>{{designInfo.title || '新建项目'}}</h1>
      <div>
        <span class="creator-info">更新者: {{designInfo.creator}}</span>
        <span class="creator-info">更新时间: {{designInfo.createdAt}}</span>
      </div>
      <ElForm ref="form" :model="designInfo" label-width="100px" label-position="right" class="design-from">
         <ElRow :gutter="40">
           <el-col :span="24">
             <ElFormItem label="标题">
               <ElInput v-model="designInfo.title" clearable :maxlength="maxLength.title"
                        placeholder="请输入标题，不超过10个字"></ElInput>
             </ElFormItem>
           </el-col>
         </ElRow>
        <ElRow>
           <el-col :span="24">
             <ElFormItem label="所属类别">
               <ElSelect v-model="designInfo.category" placeholder="请选择所属类别" clearable>
                 <ElOption v-for="category in categories" :key="category" :value="category">
                 </ElOption>
               </ElSelect>
             </ElFormItem>
           </el-col>
         </ElRow>
        <ElRow>
          <el-col :span="24">
            <ElFormItem label="服务内容">
              <ElCheckboxGroup v-model="designInfo.service">
                <ElCheckboxButton v-for="service in services" :label="service"
                                  :key="service">{{service}}</ElCheckboxButton>
              </ElCheckboxGroup>
             </ElFormItem>
           </el-col>
        </ElRow>
        <ElRow :gutter="40">
          <el-col :span="24">
            <ElFormItem label="设计机构">
              <ElInput v-model="designInfo.designer" clearable placeholder="请输入设计机构"></ElInput>
            </ElFormItem>
          </el-col>
        </ElRow>
        <ElRow :gutter="40">
          <el-col :span="24">
            <ElFormItem label="发布时间">
              <ElDatePicker v-model="designInfo.releaseTime" type="year" placeholder="请选择发布年份"></ElDatePicker>
            </ElFormItem>
          </el-col>
        </ElRow>
        <ElRow :gutter="40">
          <el-col :span="24">
            <ElFormItem label="设计说明">
              <ElInput type="textarea" placeholder="请输入设计说明，不超过200个字" v-model="designInfo.description"
                       :maxlength="maxLength.description" :autosize="{ minRows: 5, maxRows: 10}">
              </ElInput>
            </ElFormItem>
          </el-col>
         </ElRow>
        <ElRow :gutter="40">
          <el-col :span="8">
            <ElFormItem label="缩略图">
              <template v-if="designInfo.thumbnail">
                <div class="thumbnail">
                  <img :src="designInfo.thumbnail" class="thumbnail-img">
                  <label class="thumbnail-upload-circle">
                    <i class="el-icon-edit thumbnail-replace-btn"></i>
                    <input ref="test" type="file" @change="previewThumbnail" accept="image/*" class="upload-input">
                  </label>
                  <ElButton type="danger" icon="el-icon-delete" circle class="thumbnail-del-btn"
                            @click="handleDelThumb"></ElButton>
                </div>
              </template>
              <template v-else>
                <label class="thumbnail-upload">
                  <i class="el-icon-plus upload-icon-plus"></i>
                  <input type="file" @change="previewThumbnail" accept="image/*" class="upload-input">
                </label>
              </template>
            </ElFormItem>
          </el-col>
          <el-col :span="12">
             <p class="input-tip">（缩略图用于网站首页，尺寸为不小于300X300像素的正方形）</p>
           </el-col>
        </ElRow>
        <ElRow :gutter="40">
          <el-col :span="24">
            <ElFormItem label="详情图">
              <template v-if="!designInfo.thumbnail">
                <PreviewImage @previewPics="getPics"></PreviewImage>
              </template>
              <template v-else>
                <label class="thumbnail-upload">
                  <i class="el-icon-plus upload-icon-plus"></i>
                  <input type="file" @change="previewThumbnail" accept="image/*" class="upload-input">
                </label>
              </template>
            </ElFormItem>
          </el-col>
        </ElRow>
        <ElRow :gutter="40">
          <el-col :span="24">
            <ElFormItem>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button>取消</el-button>
            </ElFormItem>
          </el-col>
        </ElRow>

      </ElForm>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import * as Request from '@/network/request';
  import PreviewImage from '@/components/PreviewImage'
  import { frontConf } from '@/config/common'
  import { previewImage, showMessage } from '@/helper/uiHelper'
  import { forData } from '@/helper/httpHelper'

  export default {
    data() {
      const MAX_LENGTH = {
        title: 10,
        description: 200
      };
      const CATEGORIES = ['电子产品', '工业设计', '手持终端', '医疗器械', '家具厨卫', '其他产品', '结构设计', '视觉设计', '包装设计',];
      const SERVICES = ['设计研究', '外观设计', '结构设计', '手板制作', '批量生产', '模具加工', '供应链'];
      return {
        designInfo: {
          title: '',
          image: '',
          creator: '老周',
          createdAt: new Date().toLocaleDateString(),
          category: '',
          service: [],
          designer: '品意创新',
          releaseTime: String(new Date().getFullYear()),
          description: '',
          thumbnail: '',
          pic: ''
        },
        imageFiles: [],
        maxLength: MAX_LENGTH,
        categories: CATEGORIES,
        services: SERVICES,
      }
    },
    mounted() {
      // console.log(this.$route.params.id)
      // console.log(this.$route.query.id)
      // this.init();
    },
    beforeRouteUpdate(to, from, next) {
      // this.init(to.params.id)
    },
    computed: {
      description() {
        return this.designInfo.description.replace(/[\n\r]/g, '<br>')
      }
    },
    methods: {
      // 添加缩略图
      previewThumbnail(e) {
        const { files } = e.target;
        previewImage(files).then(v => {
          this.designInfo.thumbnail = v[0].src;
        }).catch(error => {
          console.error('预览缩略图失败', error)
        });
      },

      // 删除缩略图
      handleDelThumb() {
        this.designInfo.thumbnail = ''
      },

      // 获取要上传的图片
      getPics(pics) {
        this.imageFiles = pics;
        console.log(pics)
      },

      async onSubmit() {
        // 获取上传token
        const uploadToken = await this.getUploadToken();

        const uploadImage = await this.uploadImage(this.imageFiles[0].file, uploadToken);

        console.log(uploadImage)
      },

      // 获取上传图片凭证
      async getUploadToken() {
        let token = this.$cookie.get('uploadToken');
        if (token) {
          return token
        }
        const res = await forData(Request.design.certificate());
        token = res.uploadToken;
        // cookie有效期10分钟
        const expireTime = new Date(Date.now() + 10 * 60 * 1000);
        this.$cookie.set('uploadToken', token, {
          expires: expireTime
        });
        return token
      },


      async uploadImage(file, token) {
        // 通过formData上传图片
        const data = {
          token,
          file,
          'resource_key': this.designInfo.title + Date.now()
        };
        // 上传到七牛
        const res = await forData(Request.design.upload(data));
        debugger
        return `${frontConf.qiuNiu.domain}/${res.key}`
      }

    },
    // methods: {
    //   init(id = this.$route.params.id) {
    //
    //     const self = this;
    //     this.$http.get(`${API.designAPI.find}/${id}/`)
    //       .then(res => {
    //         const data = res.data;
    //         if (data && data.success) {
    //           this.exampleInfo = {
    //             ...data.ret
    //           }
    //         } else {
    //           uiHelper.showMessage(data.retDsc, 'error', 1500, self.goBack)
    //         }
    //       })
    //       .catch(e => {
    //         console.log('查询example错误', e)
    //       })
    //   },
    //   goBack() {
    //     this.$router.push('/admin/')
    //   },
    //   add() {
    //     const exampleInfo = {
    //       title: new Date().toLocaleDateString(),
    //       image: new Date().toLocaleTimeString()
    //     };
    //     this.$http.post(API.designAPI.add, exampleInfo)
    //       .then(res => {
    //         const data = res.data;
    //         if (data && data.success) {
    //           uiHelper.showMessage(data.retDsc, 'success', 1000);
    //         } else {
    //           uiHelper.showMessage(data.retDsc, 'error', 1500);
    //         }
    //       })
    //       .catch(e => {
    //         console.log('查询example错误', e)
    //       })
    //   },
    //   edit() {
    //     const exampleInfo = {
    //       id: this.exampleInfo.id,
    //       title: new Date().toLocaleDateString(),
    //       image: new Date().toLocaleTimeString()
    //     };
    //     this.$http.put(API.exampleAPI.update, exampleInfo)
    //       .then(res => {
    //         const data = res.data;
    //         if (data && data.success) {
    //           uiHelper.showMessage(data.retDsc, 'success', 1000);
    //           this.exampleInfo = {
    //             ...exampleInfo
    //           }
    //         } else {
    //           uiHelper.showMessage(data.retDsc, 'error', 1500);
    //         }
    //       })
    //       .catch(e => {
    //         console.log('更新example错误', e)
    //       })
    //   },
    //   remove() {
    //     const self = this;
    //     this.$http.delete(`${API.exampleAPI.remove}/${this.exampleInfo.id}/`)
    //       .then(res => {
    //         const data = res.data;
    //         if (data && data.success) {
    //           uiHelper.showMessage(data.retDsc, 'success', 1000, self.goBack);
    //           this.exampleInfo = {
    //             ...exampleInfo
    //           }
    //         } else {
    //           uiHelper.showMessage(data.retDsc, 'error', 1500);
    //         }
    //       })
    //       .catch(e => {
    //         console.log('更新example错误', e)
    //       })
    //   },
    //   back() {
    //     console.log(this.$router.back())
    //   }
    // },
    components: {
      Header,
      PreviewImage
    }
  }
</script>

<style scoped>
  .container {

  }
  .inner-container {
    width: 1000px;
    margin: 10px auto;
  }
  .design-from {
    margin: 50px 0;
    text-align: justify;
  }
  .creator-info {
    margin: 0 20px;
  }
  .thumbnail {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 6px;
    overflow: hidden;
  }
  .thumbnail-upload {
    display: block;
    width: 200px;
    height: 200px;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  .thumbnail-upload:hover,
  .thumbnail-upload:active {
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .3em 1em rgba(0, 0, 0, 0.12);
  }
  .thumbnail-img {
    width: 100%;
    height: 100%
  }
  .thumbnail-del-btn {
    position: absolute;
    right: 4px;
    top: 5px;
    padding: 10px;
    border: none;
    opacity: 0.7;
    font-size: 14px;
  }
  .thumbnail-upload-circle {
    position: absolute;
    right: 42px;
    top: 5px;
    line-height: 0;
  }
  .thumbnail-replace-btn {
    border-radius: 50%;
    padding: 10px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    cursor: pointer;
    font-size: 14px;
    opacity: 0.7;
  }
  .thumbnail-replace-btn:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .thumbnail-replace-btn:active {
    outline: 0;
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .upload-icon-plus {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
</style>
