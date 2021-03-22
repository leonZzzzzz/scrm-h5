<template>
  <div class="customer-form">
    <div class="form-content" :style="isIphone ? {height: docmHeight + 'px', overflowY: 'auto'} : ''">
      <div class="cont-title">编辑客户信息</div>
      <div class="input-item">
        <div class="item-label">备注名</div>
        <van-field
          autofocus
          placeholder="备注名(最多20个字符)"
          maxlength="20"
          v-model="customerForm.remarks"
        />
      </div>
      <div class="input-item">
        <div class="item-label">企业</div>
        <van-field
          placeholder="企业(最多20个字符)"
          maxlength="20"
          v-model="customerForm.corpFullName"
        />
      </div>
      <!-- <div class="input-item">
        <div class="item-label">职位</div>
        <van-field
          placeholder="职位(最多128个字符)"
          maxlength="128"
          v-model="customerForm.position"
        />
      </div> -->
      <div class="input-item">
        <div class="item-label">电话</div>
        <van-field
          placeholder="电话(最多40个字符)"
          maxlength="40"
          v-model="customerForm.mobile"
        />
      </div>
      <div class="input-item">
        <div class="item-label">邮箱</div>
        <van-field
          placeholder="邮箱(最多40个字符)"
          maxlength="40"
          v-model="customerForm.email"
        />
      </div>
      <!-- <template v-if="externalProfileList && externalProfileList.length > 0">
        <div
          class="input-item"
          v-for="(item, index) in externalProfileList"
          :key="index"
        >
          <div class="item-label">{{ item.name }}</div>
          <van-field
            :placeholder="item.name + maxLengthStr"
            maxlength="30"
            v-model="item.value"
          />
        </div>
      </template> -->

      <template v-if="externalProfileList && externalProfileList.length > 0">
        <div v-for="(item, index) in externalProfileList" :key="index">
          <div class="input-item" v-if="item.type === 'text'">
            <div class="item-label">{{ item.name }}</div>
            <van-field
              :placeholder="item.name + maxLengthStr"
              maxlength="40"
              v-model="item.value"
            />
          </div>
          <div class="input-item" v-if="item.type === 'radio'">
            <div class="item-label">{{ item.name }}</div>
            <!-- <van-radio-group v-model="item.value" direction="horizontal">
              <van-radio v-for="(value, key) in item.optionName" :key="key" :name="value" checked-color="#4f73ad">{{ value }}</van-radio>
            </van-radio-group> -->
            <!-- <van-button plain type="info" size="small" class="edit-btn" @click="showPopup(index)">编辑</van-button> -->
            <van-field
              placeholder="请选择"
              maxlength="40"
              v-model="item.value"
              @focus="showPopup(index)"
              readonly
            />
          </div>
          <div class="input-item" v-if="item.type === 'checkbox'">
            <div class="item-label">{{ item.name }}</div>
            <!-- <van-checkbox-group v-model="item.value" direction="horizontal">
              <van-checkbox v-for="(value, key) in item.optionName" :key="key" :name="value" shape="square" checked-color="#4f73ad">{{ value }}</van-checkbox>
            </van-checkbox-group> -->
            <!-- <van-button
              plain
              type="info"
              size="small"
              class="edit-btn"
              @click="showPopup(index)"
              >编辑</van-button
            > -->
            <van-field
              placeholder="请选择"
              maxlength="40"
              v-model="item.checkBoxValue"
              @focus="showPopup(index)"
              readonly
            />
          </div>
          <div class="input-item image-input" v-if="item.type === 'image'">
            <div class="item-label">{{ item.name }}</div>
            <div>
              <div class="image-tips">可上传9张，单张图片像素不可大于5MB</div>
              <div class="image-list">
                <!-- <upload-image
                  :fileList="item.imageList"
                  :count="9"
                  :multiple="true"
                  :acceptTypes="'.jpg,.jpeg,.png'"
                >
                </upload-image> -->
                <upload-image
                  :fileList="item.imageList"
                  :count="9"
                  :multiple="true"
                >
                </upload-image>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="input-item">
        <div class="item-label">描述</div>
        <van-field
          rows="2"
          type="textarea"
          placeholder="描述(最多150个字符)"
          maxlength="150"
          v-model="customerForm.description"
        />
      </div>

    </div>
    <template v-if="isIphone">
      <div class="btn-group btn-group-iphone">
        <div class="com-btn btn-cancel" @click="onCancel">取消</div>
        <div class="com-btn btn-commit" @click="onCommit">确定</div>
      </div>
    </template>
    <template v-else>
      <div class="btn-group" v-show="hideshow">
        <div class="com-btn btn-cancel" @click="onCancel">取消</div>
        <div class="com-btn btn-commit" @click="onCommit">确定</div>
      </div>
    </template>
    <!-- loading -->
    <dia-loading :loading="isLoading"></dia-loading>
    <!-- 底部弹出层--勾选表单 -->
    <van-popup
      v-model="popup.show"
      :closeable="
        popup.externalIndex != -1 &&
        externalProfileList[popup.externalIndex].type === 'radio'
      "
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div class="popup-name" v-if="popup.externalIndex != -1">
        {{ externalProfileList[popup.externalIndex].name }}
      </div>
      <div class="popup-wrapper">
        <div
          class="popup-btn"
          @click="popup.show = false"
          v-if="
            popup.externalIndex != -1 &&
            externalProfileList[popup.externalIndex].type === 'checkbox'
          "
        >
          确定
        </div>
        <div class="popup-content outer-container">
          <div class="inner-container">
            <div
              :class="isMobile ? 'select-content-mobile' : 'select-content-pc'"
              v-if="
                popup.externalIndex != -1 &&
                externalProfileList[popup.externalIndex].type === 'radio'
              "
            >
              <van-radio-group
                v-model="externalProfileList[popup.externalIndex].value"
                @change="hideVanRadio"
              >
                <van-radio
                  v-for="(value, key) in externalProfileList[
                    popup.externalIndex
                  ].optionName"
                  :key="key"
                  :name="value"
                  checked-color="#4f73ad"
                  class="van-radio"
                >
                  {{ value }}
                </van-radio>
              </van-radio-group>
            </div>
            <div
              :class="isMobile ? 'select-content-mobile' : 'select-content-pc'"
              v-if="
                popup.externalIndex != -1 &&
                externalProfileList[popup.externalIndex].type === 'checkbox'
              "
            >
              <van-checkbox-group
                v-model="externalProfileList[popup.externalIndex].value"
                @change="vanCheckboxGroup"
              >
                <van-checkbox
                  v-for="(value, key) in externalProfileList[
                    popup.externalIndex
                  ].optionName"
                  :key="key"
                  :name="value"
                  shape="square"
                  checked-color="#4f73ad"
                  class="van-checkbox"
                >
                  {{ value }}
                </van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Field,
  Notify,
  Overlay,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Popup,
} from "vant";
import Utils from "../../utils/utils";
// import UploadImage from "../../components/common/UploadImage.vue";
import DiaLoading from "../../components/common/loading";
import UploadImage from "../../components/common/ComUploadImage.vue";
export default {
  components: {
    vanField: Field,
    vanOverlay: Overlay,
    vanRadio: Radio,
    vanRadioGroup: RadioGroup,
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    vanPopup: Popup,
    UploadImage,
    DiaLoading,
  },
  data() {
    return {
      customerId: "",
      wxCustomerId: "",
      customerForm: {
        id: "",
        corpFullName: "", // 公司
        position: "",
        mobile: "",
        email: "",
        remarks: "", // 备注名
        description: "", // 描述
      },
      externalProfileList: [], // 扩展信息
      maxLengthStr: "(最多40个字符)",
      isLoading: false,
      timer: "", // 定时器
      popup: {
        // 底部弹出层
        show: false,
        externalIndex: -1, // 需要修改的扩展信息索引值
      },
      docmHeight: 0, //默认屏幕高度
      showHeight: 0, //实时屏幕高度
      hideshow: true, //显示或者隐藏footer
      isShowPopup: 0,
      contextType: '', // 判断是从群聊还是单聊进入 single group
      authorizeUserId: '',
      isworkwechat:'',
    };
  },
  created() {
    if (this.$route.query.id) {
      this.isworkwechat=this.$route.query.isworkwechat;
      this.customerId = this.$route.query.id;
      this.wxCustomerId = this.$route.query.wxId;
      this.contextType = this.$route.query.contextType;
      this.authorizeUserId = this.$route.query.authorizeUserId;
      // console.log('返回值' + this.wxCustomerId)
      this.getCustomerDetail();
      this.getExternalProfile();
    }
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#ffffff");
    // 默认屏幕高度
    this.docmHeight = document.documentElement.clientHeight;
    this.showHeight = document.documentElement.clientHeight;
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      // 实时屏幕高度
      this.showHeight = document.documentElement.clientHeight;
      // console.log('默认屏幕高度', this.docmHeight, this.showHeight)
    };
  },
  watch: {
    // 监听高度变化
    showHeight() {
      console.log('实时高度', this.showHeight, '初始化高度', this.docmHeight)
      if (this.docmHeight > this.showHeight) {
        this.hideshow = false;
      } else {
        this.hideshow = true;
      }
    },
  },
  destroyed() {
    window.onresize = "";
  },
  methods: {
    getCustomerDetail() {
      let params = {},url=''
      if (this.contextType == 'single') {
        params = {
          id: this.customerId,
          wxUserId: this.authorizeUserId
        }
        url='getCustomerDetailById'
      } else {
        params = {
          id: this.customerId
        }
        url='getCustomerDetailById'
      }
      if(this.isworkwechat=='not'){
        params={id:this.customerId}
        url='notEnterproseMicro'
      }
      this.$http[url](params).then((res) => {
      // this.$http.getCustomerDetailById(params).then((res) => {
        // console.log(res.data.code)
        if (res.data.code === 40001) {
          // 调用同步数据接口同步数据
          this.refreshData();
        } else {
          if (this.contextType == 'single') {
            let obj = res.data.data;
            this.customerForm.id = obj.id;
            this.customerForm.corpFullName = obj.followUserList.length > 0 ? obj.followUserList[0].corpName : "";
            this.customerForm.position = obj.position || "";
            this.customerForm.mobile = obj.followUserList.length > 0 ? obj.followUserList[0].mobiles : "";
            this.customerForm.email = obj.email || "";
            this.customerForm.remarks = obj.followUserList.length > 0 ? obj.followUserList[0].remark : "";
            this.customerForm.description = obj.followUserList.length > 0 ? obj.followUserList[0].description : "";
          } else {
            let obj = res.data.data;
            this.customerForm.id = obj.id;
            this.customerForm.corpFullName = obj.corpFullName || "";
            this.customerForm.position = obj.position || "";
            this.customerForm.mobile = obj.mobile || "";
            this.customerForm.email = obj.email || "";
            this.customerForm.remarks = obj.remarks || "";
            this.customerForm.description = obj.description || "";
          }
          if(this.isworkwechat=='not'){
            let obj=res.data.data;
            this.customerForm.id = obj.id;
            this.customerForm.name = obj.name;
            this.customerForm.mobile = obj.mobile;
            this.customerForm.remarks = obj.remarks;
            this.customerForm.description = obj.description;
            this.customerForm.email = obj.email;
            this.customerForm.corpFullName = obj.corpFullName;
            this.customerForm.list = [];

          }
        }
      });
    },
    // getExternalProfile() {
    //   let id = this.customerId;
    //   this.$http.getExternalProfileById({ id }).then((res) => {
    //     this.externalProfileList = res.data.data;
    //     this.externalProfileList.forEach((item) => {
    //       if (item.type === "radio" || item.type === "checkbox") {
    //         item.optionName = item.optionName.split("_");
    //       }
    //       if (item.type == "checkbox") {
    //         this.$set(item, "checkBoxValue", "");
    //         if (!item.value) {
    //           this.$set(item, "value", []);
    //         } else {
    //           item.checkBoxValue = item.value.replace(/_/g, "/");
    //           item.value = item.value.split("_");
    //         }
    //       }
    //     });
    //   });
    // },
    getExternalProfile() {
      let id = this.customerId;
      this.$http.getExternalProfileById({ id }).then((res) => {
        this.externalProfileList = []
        let list = res.data.data;
        list.forEach((item) => {
          if (item.type === "radio" || item.type === "checkbox") {
            item.optionName = item.optionName.split("_");
          }
          if (item.type == "checkbox") {
            this.$set(item, "checkBoxValue", "");
            if (!item.value) {
              this.$set(item, "value", []);
            } else {
              item.checkBoxValue = item.value.replace(/_/g, "/");
              item.value = item.value.split("_");
            }
          }
          if (item.type == "image") {
            item.imageList = []
            if (!item.value) {
              this.$set(item, "value", [])
            } else {
              let newArr = item.value.split("_")
              newArr.forEach(obj => {
                if (obj) {
                  item.imageList.push({
                    url: this.imgHost + obj,
                    status: "done",
                    message: ""
                  })
                }
              })
            }
          }
          this.externalProfileList.push(item)
        });
      });
    },
    vanCheckboxGroup() {
      let value = this.externalProfileList[this.popup.externalIndex].value;
      console.log(value);
      if (!value) {
        return "";
      }
      this.externalProfileList[
        this.popup.externalIndex
      ].checkBoxValue = this.externalProfileList[
        this.popup.externalIndex
      ].value.join("/");
    },
    onCancel() {
      this.$router.back();
    },
    onCommit() {
      // if (this.customerForm.mobile !== "" && this.customerForm.mobile !== undefined) {
      //   if (!Utils.checkPhone(this.customerForm.mobile)) {
      //     Notify({ type: "warning", message: "手机格式错误" })
      //     return
      //   }
      // }
      // if (this.customerForm.email !== "" && this.customerForm.email !== undefined) {
      //   if (!Utils.checkEmail(this.customerForm.email)) {
      //     Notify({ type: "warning", message: "邮箱格式错误" })
      //     return
      //   }
      // }
      let url=''
      if(this.isworkwechat=='not'){
        url='notUpdateEnterPrise'
      }else{
        url='updateCustomer'
      }
      console.log(url)
      this.$http[url](this.customerForm).then(() => {
      // this.$http.updateCustomer(this.customerForm).then(() => {
        // 修改客户扩展信息
        if (this.externalProfileList.length <= 0) {
          Notify({ type: "success", message: "编辑成功" });
          this.$router.back();
        } else {
          this.onExternalEditCommit();
        }
      });
    },
    // onExternalEditCommit() {
    //   this.externalProfileList.forEach((item) => {
    //     if (item.type == "checkbox") {
    //       item.value = item.value.join("_");
    //     }
    //     if (item.optionName) {
    //       item.optionName = item.optionName.join("_");
    //     }
    //   });
    //   let params = {
    //     id: this.customerId,
    //     externalProfileList: this.externalProfileList,
    //   };
    //   this.$http.updateExternalProfile(params).then(() => {
    //     Notify({ type: "success", message: "编辑成功" });
    //     this.$router.back();
    //   });
    // },
    onExternalEditCommit() {
      let externalList = []
      this.externalProfileList.forEach((item) => {
        if (item.type == "checkbox") {
          item.value = item.value.join("_");
        }
        if (item.optionName) {
          item.optionName = item.optionName.join("_");
        }
        if (item.type == 'image') {
          let value = ""
          let reg = new RegExp(this.imgHost)
          if (item.imageList.length > 0) {
            let newList = []
            item.imageList.forEach(obj => {
              let url = obj.url.split(reg)[1]
              if (url) {
                newList.push(url)
              }
            })
            value = newList.join("_")
          }
          let obj = {
            appId: item.appId,
            createTime: item.createTime,
            id: item.id,
            isChecked: item.isChecked,
            isDeleted: item.isDeleted,
            isEnabled: item.isEnabled,
            isImmutable: item.isImmutable,
            name: item.name,
            optionName: item.optionName,
            sequence: item.sequence,
            type: item.type,
            value: value,
          }
          item = obj
        }
        externalList.push(item)
      });
      let params = {
        id: this.customerId,
        externalProfileList: externalList,
      }
      this.$http.updateExternalProfile(params).then(() => {
        Notify({ type: "success", message: "编辑成功" });
        this.$router.back();
      });
    },
    // 同步数据
    refreshData() {
      this.isLoading = true;
      // let customerId = this.wxCustomerId
      this.$http
        .customerDataSync({ customerId: this.wxCustomerId })
        .then(() => {
          this.getCustomerData();
          this.getExternalProfile();
          this.isLoading = false;
          clearTimeout(this.timer);
        })
        .catch((e) => {
          this.isLoading = false
          console.log('customerDataSync', e)
        })
    },
    getCustomerData() {
      let params = {}
      if (this.contextType == 'single') {
        params = {
          id: this.customerId,
          wxUserId: this.authorizeUserId
        }
      } else {
        params = {
          id: this.customerId
        }
      }
      this.$http.getCustomerDetailById(params).then((res) => {
        if (this.contextType == 'single') {
          let obj = res.data.data;
          this.customerForm.id = obj.id;
          this.customerForm.corpFullName = obj.followUserList.length > 0 ? obj.followUserList[0].corpName : "";
          this.customerForm.position = obj.position || "";
          this.customerForm.mobile = obj.followUserList.length > 0 ? obj.followUserList[0].mobiles : "";
          this.customerForm.email = obj.email || "";
          this.customerForm.remarks = obj.followUserList.length > 0 ? obj.followUserList[0].remark : "";
          this.customerForm.description = obj.followUserList.length > 0 ? obj.followUserList[0].description : "";
        } else {
          let obj = res.data.data;
          this.customerForm.id = obj.id;
          this.customerForm.corpFullName = obj.corpFullName || "";
          this.customerForm.position = obj.position || "";
          this.customerForm.mobile = obj.mobile || "";
          this.customerForm.email = obj.email || "";
          this.customerForm.remarks = obj.remarks || "";
          this.customerForm.description = obj.description || "";
        }
      });
    },
    // 显示编辑弹窗
    showPopup(index) {
      if (this.popup.externalIndex == index) {
        this.isShowPopup = 1;
      } else if (this.popup.externalIndex == -1) {
        this.isShowPopup = 1;
      } else {
        this.isShowPopup = 0;
      }
      this.popup.externalIndex = index;
      this.popup.show = true;
    },
    hideVanRadio() {
      if (this.isShowPopup != 0) {
        this.popup.show = false;
      }
      this.isShowPopup = this.isShowPopup + 1;
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style lang="less" scoped>
.customer-form {
  position: relative;
  .form-content {
    padding: 20px 20px 85px 20px;
    background-color: #ffffff;
    box-sizing: border-box;
    // font-size: 12px;
    .cont-title {
      text-align: center;
      // font-size: 13px;
      color: #222222;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .input-item {
      display: flex;
      align-items: center;
      color: #5e6166;
      margin-bottom: 8px;
      .item-label {
        margin-right: 10px;
        flex: 0 0 62px;
      }
      .edit-btn {
        width: 60px;
        color: #4f73ad;
        border-color: #4f73ad;
      }
    }
    .form-divider {
      width: 100%;
      height: 1px;
      background-color: #e4e9ef;
      margin: 18px 0;
    }
    .image-input {
      align-items: unset;
      .image-tips {
        margin-bottom: 10px;
        color: #c8c9cc;
      }
    }
  }
  .btn-group {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px -1px 2px 1px #f7f8fa;
    .com-btn {
      padding: 8px 20px;
      margin: 0 8px;
      background-color: #4f73ad;
      color: #ffffff;
      border-radius: 3px;
      cursor: pointer;
    }
    .btn-cancel {
      background-color: #dfe1e8;
      color: #222222;
    }
    .btn-commit {
      font-weight: bold;
    }
  }
  .btn-group-iphone {
    position: absolute;
  }
}
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.loading-overlay {
  background-color: rgba(0, 0, 0, 0);
}
.loading-img {
  width: 75px;
}
.popup-name {
  position: absolute;
  top: 18px;
  left: 20px;
  color: #323233;
}
.popup-btn {
  font-size: 14px;
  color: #4f73ad;
  position: absolute;
  top: 18px;
  right: 16px;
}
.popup-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  position: relative;
  .popup-content {
    height: 100%;
    overflow-y: auto;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    .van-radio {
      flex-flow: row-reverse;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ebedf0;
      margin: 0;
    }
    .van-checkbox {
      flex-flow: row-reverse;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ebedf0;
      margin: 0;
    }
  }
  .outer-container {
    position: relative;
    overflow: hidden;
  }
  .inner-container {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .select-content-mobile {
    padding: 0 37px 20px 20px;
    box-sizing: border-box;
  }
  .select-content-pc {
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
  }
}
/deep/ .van-field {
  background: #f7f7f9;
  border-radius: 3px;
  padding: 5px 10px;
}
/deep/ .van-radio {
  margin: 5px 20px 5px 0;
}
/deep/ .van-checkbox {
  margin: 5px 20px 5px 0;
}
/deep/ .van-checkbox__label {
  margin-left: 0;
}
/deep/ .van-radio__label {
  margin-left: 0;
}
/deep/ .van-uploader__preview-image {
  width: 70px;
  height: 70px;
}
/deep/ .van-uploader__upload {
  width: 70px;
  height: 70px;
}
</style>