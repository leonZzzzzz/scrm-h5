<template>
  <div class="container">
    <div class="header">
      <p class="header-tips"><span class="iconfont icon-zhuyi"></span>  需拍摄到本人脸部，单个视频建议不超过20MB</p>
      <p class="header-title">请上传您的培训影像</p>
    </div>
    <p class="label-title">培训影像一</p>
    <div class="upload-wrap">
      <!-- before-read、after-read、before-delete回调函数第二个参数，可以拿到name
      拿到name后就能把file存到表单对应字段，提交时一起上传 -->
      <van-uploader v-if="!model.fileUrl1" name="1" :accept="accept" result-type="file" :after-read="afterRead"></van-uploader>
      <p v-if="player1ErrMsg" class="video-errMsg" v-html="player1ErrMsg"></p>
      <div v-show="model.fileUrl1 && !player1ErrMsg" style="width: 100%;">
        <video 
          id="player1"
          class="player-video" 
          :src="model.fileUrl1"
          controls
          preload="auto" 
          playsinline 
          webkit-playsinline 
          x5-playinline 
          x5-video-player-type="h5"
          ></video>
      </div>
      <!-- <div class="iconfont icon-cuowu delete-icon" @click="onDeleteItem('1')"></div> -->
    </div>
    <div class="submit-btn" v-if="!update1" @click="onSubmit('video', '1')">上传</div>
    <div class="submit-btn" v-else @click="onDeleteItem('1')">重新上传</div>
    <p class="label-title">培训影像二</p>
    <div class="upload-wrap">
      <van-uploader v-if="!model.fileUrl2" name="2" :accept="accept" result-type="file" :after-read="afterRead"></van-uploader>
      <p v-if="player2ErrMsg" class="video-errMsg" v-html="player2ErrMsg"></p>
      <div v-show="model.fileUrl2 && !player2ErrMsg" style="width: 100%;">
        <video 
          id="player2"
          class="player-video" 
          :src="model.fileUrl2"
          controls
          preload="auto" 
          playsinline 
          webkit-playsinline 
          x5-playinline 
          x5-video-player-type="h5"
          ></video>
      </div>
      <!-- <div class="iconfont icon-cuowu delete-icon" @click="onDeleteItem('2')"></div> -->
    </div>
    <div class="submit-btn" v-if="!update2" @click="onSubmit('video', '2')">上传</div>
    <div class="submit-btn" v-else @click="onDeleteItem('2')">重新上传</div>

    <div class="images-wrap">
      <p class="images-title">请上传3张您的培训照片</p>
      <div class="images-boxs">
        <div class="image-box">
          <van-uploader v-if="!model.photo1" name="photo1" accept="image/*" result-type="file" :after-read="afterReadImage"></van-uploader>
          <img v-if="model.photo1" class="image-box-img" :src="$imgHost + model.photo1" alt="" />
          <span v-if="model.photo1" class="iconfont icon-cuowu delete-img" @click.stop="model.photo1 = ''"></span>
        </div>
        <div class="image-box">
          <van-uploader v-if="!model.photo2" name="photo2" accept="image/*" result-type="file" :after-read="afterReadImage"></van-uploader>
          <img v-if="model.photo2" class="image-box-img" :src="$imgHost + model.photo2" alt="" />
          <span v-if="model.photo2" class="iconfont icon-cuowu delete-img" @click.stop="model.photo2 = ''"></span>
        </div>
        <div class="image-box">
          <van-uploader v-if="!model.photo3" name="photo3" accept="image/*" result-type="file" :after-read="afterReadImage"></van-uploader>
          <img v-if="model.photo3" class="image-box-img" :src="$imgHost + model.photo3" alt="" />
          <span v-if="model.photo3" class="iconfont icon-cuowu delete-img" @click.stop="model.photo3 = ''"></span>
        </div>
      </div>
      <div class="submit-btn" @click="onSubmit('image')">保存</div>
    </div>
  </div>
</template>

<script>
import { APPID } from '@/utils/config';
export default {
  data() {
    return {
      // 腾讯云点播appID
      appID: '1255600302',
      // 支持的视频MIME类型
      accept: 'video/*',
      // 接口参数对象
      model: {
        fileId1:"",
        fileId2:"",
        fileUrl1:"",
        fileUrl2:"",
        id:"",
        photo1:"",
        photo2:"",
        photo3:"",
      },
      // 是否显示修改按钮
      update1: false,
      update2: false,
      pageLoading: false,
      // 错误信息
      player1ErrMsg: '',
      player2ErrMsg: '',
      // 云点播上传实例
      uploader: null,
      // 两个播放器实例
      player1: null,
      player2: null,
    }
  },
  watch: {
    // 'model.fileId1'(val) {
    //   if (val) {
    //     this.$nextTick(() => {
    //       this.createVideo('player1', val)
    //     })
    //   }
    // },
    // 'model.fileId2'(val) {
    //   if (val) {
    //     this.$nextTick(() => {
    //       this.createVideo('player2', val)
    //     })
    //   }
    // },
  },
  created() {
    this.getDetai()

    let list = []
    list.filter(item => list.find(item2 => item.groupId === item2.groupId))
    


  },
  beforeDestroy() {
    // 销毁播放器
    this.player1 && this.player1.dispose()
    this.player2 && this.player2.dispose()
  },
  methods: {
    // 获取详情
    getDetai() {
      this.$loading.show()
      this.$api.getStudyVideo().then(res => {
        if (!res.data.data) return
        this.model = Object.assign(this.model, res.data.data || {})
        // 显示修改
        if (this.model.fileId1) this.update1 = true
        if (this.model.fileId2) this.update2 = true
      }).finally(() => {
        this.$loading.hide()
      })
    },
    
    // 删除视频字段，重新上传
    onDeleteItem(key) {
      this.model['fileUrl'+key] = ''
      this.model['fileId'+key] = ''
      this['player'+key] && this['player'+key].pause() // 暂停播放
      // 隐藏修改按钮
      this['update'+key] = false
    },
    // 提交表单
    onSubmit(type, key) {
      if (this.pageLoading) return;
      // type用来区分按钮
      if (type == 'video') {
        // 用fileUrl来做修改的判断，实际播放使用的是fileId
        if (!this.model['fileUrl'+key]) return this.$toast('请先选择视频')
      } else if (type == 'image') {
        if (!this.model.photo1 && !this.model.photo2 && !this.model.photo3) return this.$toast('请先选择照片')
      }
      
      // 开始提交数据
      this.$loading.show('正在提交')
      this.pageLoading = true
      this.$api.updateStudyVideo(this.model).then(res => {
        // 提交成功
        this.$toast('上传成功')
      })
      .finally(() => {
        this.pageLoading = false
        setTimeout(() => this.$loading.hide(), 1500)
      })
    },
    // 播放视频
    createVideo(key, fileId) {
      if (!this[key]) {
        // 初始化播放
        this[key] = TCPlayer(key, {
          appID: APPID, // 请传入点播账号的 appID（必须）
          fileID: fileId, // 请传入需要播放的视频 filID（必须）
          plugins:{
            ContinuePlay: { // 开启续播功能
              auto: true, //[可选] 是否在视频播放后自动续播
              // text:'上次播放至 ', //[可选] 提示文案
              // btnText: '恢复播放' //[可选] 按钮文案
            },
          }
        });
        this[key].on('loadedmetadata', () => {
          // 设置初始播放位置
          // this[key].currentTime(1)
          this.errMsg = ''
        })
        this[key].on('error', err => {
          console.log('err == ', err.data);
          if (err.data && err.data.code == 13) {
            this[key+'ErrMsg'] = '视频转码中…<br />您可以继续点击按钮上传<br />如需播放请上传成功后过一分钟刷新'
          }
        })
      } else {
        // 切换ID播放
        console.log('切换ID播放')
        this[key].loadVideoByID({
          appID: APPID,
          fileID: fileId,
        });
      }
    },
    // 读取文件后
    afterRead(obj, detail) {
      console.log(obj.file, detail)
      if (obj.file.size > (50 * 1024 * 1024)) {
        // 大于50Mb
        this.$toast('视频最大不能超过50MB哦~')
        return
      }
      // this.uploadFile(obj.file, detail.name) // 用腾讯云上传
      this.uploadVideo(obj.file, detail.name) // 用自己接口上传
    },
    uploadVideo(file, key) {
      this.pageLoading = true;
      this.errMsg = "";
      this.percent = 0;
      let fileData = new FormData(); // 创建form对象
      fileData.append('file', file, file.name); // 通过append向form对象添加数据
      this.$loading.show('上传中')
      this.$api.uploadStudyVideo(fileData).then(res => {
        this.pageLoading = false;
        this.$loading.hide()
        // 注意某些视频类型后台需要转码，所以上传完马上播放的话可能会报错提示转码失败，（刷新下页面，或者延迟一会再播放就可以了）
        this.$toast.success('上传成功')
        this.model['fileUrl'+key] = res.data.data.host + res.data.data.url
      })
      .catch(() => {
        this.pageLoading = false;
        setTimeout(() => {
          this.$loading.hide()
        }, 1500)
      })
    },
    // 获取腾讯云上传签名
    getSignature() {
      return this.$api.uploadVideoSignature().then((res) => {
        return res.data.data.signature;
      });
    },
    uploadFile(file, key) {
      this.pageLoading = true;
      this.errMsg = "";
      this.percent = 0;
      this.$loading.show('上传中')
      try {
        // CDN方式
        const tcVod = new TcVod.default({
          getSignature: this.getSignature, // 前文中所述的获取上传签名的函数
        });

        const uploader = tcVod.upload({
          mediaFile: file, // 媒体文件（视频或音频或图片），类型为 File
          // coverFile: this.coverFile,
        });

        this.uploader = uploader;
        // console.log(this.uploader)

        uploader.on("media_progress", (info) => {
          this.$loading.show(`上传中 ${(info.percent * 100).toFixed(0)}%`)
          // console.log('上传进度==》'+info.percent) // 进度
        });

        uploader
          .done()
          .then((doneResult) => {
            this.pageLoading = false;
            this.$loading.hide()
            // 注意某些视频类型后台需要转码，所以上传完马上播放的话可能会报错提示转码失败，（刷新下页面，或者延迟一会再播放就可以了）
            this.$toast.success('上传成功')
            this.model['fileId'+key] = doneResult.fileId
            this.model['fileUrl'+key] = doneResult.video.url
          })
          .catch((err) => {
            console.log(err)
            this.pageLoading = false;
            let errMsg =
              err && err.data && err.data.data.message
                ? err.data.data.message
                : JSON.stringify(err);
            this.$loading.hide()
            this.$alert({
              message: "上传失败，请重试" + errMsg,
              confirmButtonColor: '#33CC99'
            })
          })
      } catch (err) {
        console.log(err);
        this.pageLoading = false;
        this.$loading.hide()
        this.$alert({
          message: "上传失败，请重试" + errMsg,
          confirmButtonColor: '#33CC99'
        })
      }
      // 回调结果说明
      // type doneResult = {
      //   fileId: string,
      //   video: {
      //     url: string
      //   },
      //   cover: {
      //     url: string
      //   }
      // }
    },
    // 取消上传
    cancelUpload() {
      if (!this.uploader.appId) {
        return;
      }
      this.uploader.cos.cancelTask(this.uploader.taskId);
      this.pageLoading = false;
      this.$loading.hide()
      this.errMsg = "";
    },
    // 读取文件后
    afterReadImage(obj, detail) {
      console.log(obj.file, detail)
      let imgFile  = obj.file
      // 大于1Mb的图片才压缩
      if (imgFile.size <= (1 * 1024 * 1024)) {
        this.uploadImage(imgFile, imgFile, detail)
        return
      }
      this.$loading.show('正在压缩')
      this.zipImgPromise(imgFile).then(blob => {
        this.$loading.hide()
        // 压缩后的图片还是超过大小限制
        if (blob.size > (3 * 1024 * 1024)) {
          return this.$toast('图片不能大于 3Mb')
        }
        // 开始上传图片（跑腾讯云的接口单独上传）
        this.uploadImage(blob, imgFile, detail)
      }).catch(error => {
        // 处理zipImgPromise和前一个回调函数运行时发生的错误
        console.log('压缩图片发生错误', error);
        this.$loading.hide()
        this.$toast('压缩失败')
        this.uploadImage(imgFile, imgFile, detail)
      });
    },
    /**
     * 上传图片
     * @param blob 压缩后的图片数据
     * @param originFile 压缩前的file对象
     * @param detail 表单对象里面有name用于区分是哪个字段
     */
    async uploadImage(blob, originFile, detail) {
      let file = new FormData(); // 创建form对象
      file.append('file', blob, originFile.name); // 通过append向form对象添加数据
      file.append('imageType', 'studyMedia'); // 添加form表单中其他数据
      try {
        this.$loading.show('正在保存')
        let res = await this.$api.uploadImage(file)
        this.$loading.hide()
        this.$toast('保存成功')
        console.log(res.data.data)
        if (!res.data.data) return this.$toast('上传失败')
        this.model[detail.name] = res.data.data.imageUrl
      } catch (error) {
        console.log(error)
        this.$loading.hide()
      }
    },
    // 压缩图片
    zipImgPromise(imgFile) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();    // 定义一个fileReader
        reader.readAsDataURL(imgFile);    // 将图片转换成base64后可以得到图片的宽高
        let img = new Image();
        reader.onload = () => {
          img.src = reader.result;
        }
        img.onload = () => {
          // 图片原始尺寸
          let originWidth = img.width;
          let originHeight = img.height;
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          // 最大尺寸限制
          let maxWidth = 800, maxHeight = 800;
          // 目标尺寸
          let targetWidth = originWidth, targetHeight = originHeight;
          // 图片尺寸超过800x800的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
              if (originWidth / originHeight > maxWidth / maxHeight) {
                  // 更宽，按照宽度限定尺寸
                  targetWidth = maxWidth;
                  targetHeight = Math.round(maxWidth * (originHeight / originWidth));
              } else {
                  targetHeight = maxHeight;
                  targetWidth = Math.round(maxHeight * (originWidth / originHeight));
              }
          }
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩
          context.drawImage(img, 0, 0, targetWidth, targetHeight);

          // canvas转换成dataUrl
          let dataUrl = canvas.toDataURL('image/png');
          // 转换成formdata格式用于上传图片
          let blob = this.dataURItoBlob(dataUrl, );

          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Error！！'));
          }
        }
      });
    },
    // dataUrl转换成formdata格式用于上传图片
    dataURItoBlob(dataUrl) {
      let byteString = atob(dataUrl.split(',')[1]);
      let mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      let bb = new Blob([ab], { "type": mimeString });
      return bb;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // 腾讯云等比率自适应
  .player-video {
    // width: 100%;
    // height: 400px;
    // background: #000;

    // z-index: -1;
    // width: 100%;
    // max-width: 100%;
    // height: 0;
    // padding-top: 56.25%;
    display: block;
    margin: 0 auto;
    width: 600px;
    height: 300px;
  }

  .header {
    background: #fff;
    overflow: hidden;
  }
  .header-tips {
    padding: 16px 30px;
    line-height: 1.5;
    font-size: 26px;
    color: $theme-color;
    background: #DFFDF3;
    .iconfont {
      font-size: 30px;
      color: $theme-color;
    }
  }
  .header-title {
    margin: 40px 0;
    font-size: 32px;
    text-align: center;
    line-height: 1.5;
    font-weight: bold;
  }
  // 视频板块
  .label-title {
    padding: 0 30px;
    height: 70px;
    line-height: 70px;
    font-size: 30px;
    background: #f6f6f6;
  }

  .upload-wrap{
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 30px;
    padding-top: 40px;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    .upload-box {
      margin: 0 auto;
      width: 600px;
      img {
        display: block;
        width: 100%;
      }
    }
    .delete-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      display: inline-block;
      padding: 10px;
      font-size: 40px;
      color: red;
      border-radius: 50%;
      background: #fff;
    }
    .video-errMsg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 400px;
      padding: 0 40px;
      box-sizing: border-box;
      color: #fff;
      font-size: 30px;
      line-height: 1.5;
      text-align: center;
      background: #000;
    }
  }

  .submit-btn {
    margin: 40px 30px;
    margin-top: 50px;
    height: 90px;
    line-height: 90px;
    color: #fff;
    font-size: 34px;
    font-weight: bold;
    text-align: center;
    background: $theme-color;
    border-radius: 45px;
  }

  // 图片板块
  .images-wrap {
    margin-top: 80px;
    .images-title {
      margin-bottom: 30px;
      font-size: 32px;
      text-align: center;
      line-height: 1.5;
      font-weight: bold;
    }
    .images-boxs {
      display: flex;
      justify-content: center;
      .image-box {
        position: relative;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
        .image-box-img {
          width: 160px;
          height: 160px;
          border-radius: 10px;
        }
        .delete-img {
          position: absolute;
          top: 0;
          right: 0;
          width: 50px;
          height: 50px;
          padding: 10px;
          text-align: right;
          color: red;
          opacity: .8;
          font-size: 40px;
        }
      }
    }
  }

}
</style>


