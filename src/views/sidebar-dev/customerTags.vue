<template>
  <div class="customer-tags">
    <van-nav-bar
      title="客户标签"
      :left-arrow="true"
      left-text="返回"
      :fixed="true"
      @click-left="goBack"
    >
      <template #left>
        <div class="left-arrow">
          <van-icon
            name="arrow-left"
            :class="isMobile ? 'left-arrow-icon-mobile' : 'left-arrow-icon'"
          />返回
        </div>
      </template>
    </van-nav-bar>
    <div class="placeholder-el"></div>
    <div class="tags-content">
      <div class="enterprise-tag">
        <div class="title-bar"><span class="bar-tag"></span>企业标签</div>
        <template v-if="cropTagList.length > 0">
          <div
            class="tag-group"
            v-for="(item, index) in cropTagList"
            :key="index"
          >
            <div class="group-title">{{ item.name }}</div>
            <div class="tag-list" v-if="isMobile">
              <div
                class="tag-item-mobile"
                v-for="(obj, idx) in item.tagList"
                :key="idx"
                :class="checkCropTagActive(obj) ? 'active' : ''"
                @click="onCropTagSelect(obj)"
              >
                {{ obj.name }}
              </div>
            </div>
            <div class="tag-list" v-else>
              <div
                class="tag-item"
                v-for="(obj, idx) in item.tagList"
                :key="idx"
                :class="checkCropTagActive(obj) ? 'active' : ''"
                @click="onCropTagSelect(obj)"
              >
                {{ obj.name }}
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="tag-no-data">暂无数据</div>
        </template>
      </div>
      <div class="personal-tag" v-if="isworkwechat!='not'">
        <div class="title-bar" style="justify-content: space-between">
          <div style="display: flex; align-items: center">
            <span class="bar-tag"></span>个人标签
          </div>
          <van-icon name="edit" class="edit-icon" @click="goToPersonalTags" />
        </div>
        <template v-if="personalTagList.length > 0">
          <div class="tag-group" style="margin-bottom: 0">
            <div class="tag-list" v-if="isMobile">
              <div
                class="tag-item-mobile"
                v-for="(obj, idx) in personalTagList"
                :key="idx"
                :class="checkPersonalTagActive(obj) ? 'compony-active' : ''"
                @click="onPersonalTagSelect(obj)"
              >
                {{ obj.name }}
              </div>
            </div>
            <div class="tag-list" v-else>
              <div
                class="tag-item"
                v-for="(obj, idx) in personalTagList"
                :key="idx"
                :class="checkPersonalTagActive(obj) ? 'compony-active' : ''"
                @click="onPersonalTagSelect(obj)"
              >
                {{ obj.name }}
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="tag-no-data">暂无数据</div>
        </template>
      </div>
      <div class="behavior-tag" v-if="isworkwechat!='not'">
        <div class="title-bar">
          <span class="bar-tag"></span>行为标签<span class="bar-tips"
            >（不支持修改）</span
          >
        </div>
        <template v-if="behaviorTagList.length > 0">
          <div
            class="tag-group"
            v-for="(item, index) in behaviorTagList"
            :key="index"
          >
            <div class="group-title">{{ item.name }}</div>
            <div class="tag-list" v-if="isMobile">
              <div
                class="tag-item-mobile personal-active"
                v-for="(obj, idx) in item.tagList"
                :key="idx"
              >
                {{ obj.name }}
              </div>
            </div>
            <div class="tag-list" v-else>
              <div
                class="tag-item personal-active"
                v-for="(obj, idx) in item.tagList"
                :key="idx"
              >
                {{ obj.name }}
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="tag-no-data">暂无数据</div>
        </template>
      </div>
    </div>
    <div class="btn-group">
      <div class="com-btn btn-cancel" @click="onCancel">取消</div>
      <div class="com-btn btn-commit" @click="onCommit">确定</div>
    </div>
    <!-- 添加个人标签弹窗 -->
    <com-popup
      :show="tagAdd.show"
      title="添加个人标签"
      @onCancel="tagAdd.show = false"
      @onCommit="tagCommit"
    >
      <div class="tag-popup">
        <van-field
          autofocus
          v-model="tagAdd.name"
          placeholder="标签名称(最多15个字符)"
          maxlength="15"
          :style="{
            background: '#F7F7F9',
            borderRadius: '3px',
            border: '1px solid #DFE2E8',
            padding: '5px 10px',
          }"
        />
      </div>
    </com-popup>
  </div>
</template>

<script>
import { Icon, Field, Notify, NavBar, Tag } from "vant";
import ComPopup from "../../components/common/ComPopup";
export default {
  components: {
    vanIcon: Icon,
    vanField: Field,
    ComPopup,
    VanNavBar: NavBar,
    VanTag: Tag,
  },
  data() {
    return {
      customerId: "",
      personalTagList: [], // 个人标签列表
      cropTagList: [], // 企业标签列表
      selectedPersonalTags: [], // 当前选中的个人标签
      selectedCropTags: [], // 当前选中的企业标签
      tagAdd: {
        show: false,
        name: "",
      },
      behaviorTagList: [], // 行为标签列表
      isworkwechat:'',
    };
  },
  created() {
    if (this.$route.query.id) {
      this.customerId = this.$route.query.id;
      this.isworkwechat = this.$route.query.isworkwechat;
      this.getCustomerTagList();
    }
  },
  methods: {
    getCustomerTagList() {
      let id = this.customerId;
      if(this.isworkwechat=='not'){
        this.$http.acquireTagsnotCorporate({ id }).then((res) => {
          let cropTags = res.data.data.list;
          this.cropTagList = cropTags;
          // isAlive为false时重新获取选中的标签
          if (this.$store.state.isAlive) {
            this.selectedCropTags = this.$store.state.cropTags;
          } else {
            let selectedCropTags = [];
            cropTags.forEach((item) => {
              item.tagList.forEach((obj) => {
                if (obj.isCheck) {
                  selectedCropTags.push(obj.id);
                }
              });
            });
            this.selectedCropTags = selectedCropTags;
          }
        });
      }else{
        this.$http.getCustomerTagList({ id }).then((res) => {
          let personalTags = res.data.data.personalTagList;
          let cropTags = res.data.data.cropTagList;
          let behaviorTagList = res.data.data.behaviorTagList;
          this.personalTagList = personalTags;
          this.cropTagList = cropTags;
          this.behaviorTagList = behaviorTagList;
          // isAlive为false时重新获取选中的标签
          if (this.$store.state.isAlive) {
            this.selectedPersonalTags = this.$store.state.personalTags;
            this.selectedCropTags = this.$store.state.cropTags;
          } else {
            let selectedPersonalTags = [];
            let selectedCropTags = [];
            personalTags.forEach((item) => {
              if (item.isCheck) {
                selectedPersonalTags.push(item.id);
              }
            });
            cropTags.forEach((item) => {
              item.tagList.forEach((obj) => {
                if (obj.isCheck) {
                  selectedCropTags.push(obj.id);
                }
              });
            });
            this.selectedPersonalTags = selectedPersonalTags;
            this.selectedCropTags = selectedCropTags;
          }
        });
      } 
    },
    checkCropTagActive(obj) {
      if (this.selectedCropTags.indexOf(obj.id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    onCropTagSelect(obj) {
      if (this.selectedCropTags.indexOf(obj.id) > -1) {
        this.selectedCropTags.splice(this.selectedCropTags.indexOf(obj.id), 1);
      } else {
        this.selectedCropTags.push(obj.id);
      }
    },
    // 是否被选中
    checkPersonalTagActive(obj) {
      // console.log('标签名称' + obj.name)
      if (this.selectedPersonalTags.indexOf(obj.id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    // 选择标签
    onPersonalTagSelect(obj) {
      // 当前已经选中则取消选择，否则选中当前项
      if (this.selectedPersonalTags.indexOf(obj.id) > -1) {
        this.selectedPersonalTags.splice(
          this.selectedPersonalTags.indexOf(obj.id),
          1
        );
      } else {
        this.selectedPersonalTags.push(obj.id);
      }
    },
    showTagAddPopup() {
      this.tagAdd.name = "";
      this.tagAdd.show = true;
    },
    tagCommit() {
      if (this.tagAdd.name === "") {
        Notify({ type: "warning", message: "请输入标签名称" });
        return;
      } else {
        let params = {
          name: this.tagAdd.name,
          sequence: 0,
          describe: "",
        };
        this.$http.addPersonalTag(params).then(() => {
          Notify({ type: "success", message: "添加成功" });
          this.tagAdd.show = false;
          this.getCustomerTagList();
        });
        // this.$router.back()
      }
    },
    onCancel() {
      this.$router.back();
      this.$store.commit("updateIsAlive", false);
    },
    onCommit() {
      let personalTagId = this.selectedPersonalTags
        .map((item) => item)
        .join("_");
      let cropTagId = this.selectedCropTags.map((item) => item).join("_");
      // console.log('提交列表' + personalTagId + '/////' + cropTagId)
      let param = {},url='';
      if(this.isworkwechat=='not'){
        param={id:this.customerId,tagId:cropTagId}
        url='notEnterpriseLabel'
      }else{
        param = {
          customerId: this.customerId,
          cropTagId: cropTagId,
          personalTagId: personalTagId,
        };
        url='saveCustomerTag'
      }
      this.$http[url](param).then(() => {
      // this.$http.saveCustomerTag(param).then(() => {
        Notify({ type: "success", message: "设置成功" });
        this.$store.commit("updateIsAlive", false);
        this.$router.back();
      });
    },
    goBack() {
      this.$router.back();
      // console.log('返回')
    },
    goToPersonalTags() {
      this.$router.push("/sidebar/personalTags");
    },
  },
};
</script>

<style lang="less" scoped>
.left-arrow {
  display: flex;
  align-items: center;
  height: 46px;
  line-height: 46px;
  color: #4f73ad;
  .left-arrow-icon {
    font-size: 16px;
    margin-top: -1px;
    margin-right: 3px;
  }
  .left-arrow-icon-mobile {
    font-size: 16px;
    margin-top: -3px;
    margin-right: 3px;
  }
}
.placeholder-el {
  height: 46px;
}
.customer-tags {
  background-color: #ffffff;
  height: 100%;
  .tags-content {
    padding: 10px 20px;
    background-color: #ffffff;
    box-sizing: border-box;
    // font-size: 12px;
    padding-bottom: 80px;
    .cont-title {
      text-align: center;
      // font-size: 13px;
      color: #222222;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
}
.title-bar {
  display: flex;
  align-items: center;
  // font-size: 13px;
  font-weight: bold;
  color: #222222;
  margin-bottom: 12px;
  .bar-tag {
    width: 4px;
    height: 12px;
    border-radius: 2px;
    background-color: #4f73ad;
    margin-right: 8px;
  }
  .bar-tips {
    font-weight: normal;
    color: #5e6166;
  }
  .edit-icon {
    font-size: 20px;
    cursor: pointer;
  }
}
.tag-group {
  border-bottom: 1px solid #e4e9ef;
  margin-bottom: 20px;
  padding: 0 10px 5px 10px;
  box-sizing: border-box;
  .group-title {
    color: #5e6166;
    margin-bottom: 12px;
  }
  .tag-list {
    display: flex;
    flex-flow: wrap;
    .tag-item {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 3px;
      background-color: #eff0f0;
      margin: 0 10px 10px 0;
      color: #919191;
      cursor: pointer;
    }
    .tag-item-mobile {
      color: #919191;
      padding: 3px 10px 0 10px;
      background-color: #eff0f0;
      border-radius: 3px;
      margin: 0 5px 10px 0;
      height: 27px;
      line-height: 27px;
    }
    .active {
      background-color: #e8f1fa;
      color: #4f73ad;
    }
    .compony-active {
      background-color: #ffe5d4;
      color: #bf5b16;
    }
    .personal-active {
      background-color: #c8efd4;
      color: #138535;
    }
    .tag-add {
      display: flex;
      padding: 6px 12px;
      background-color: #f2f8fe;
      border-radius: 3px;
      margin: 0 10px 10px 0;
      align-items: center;
      cursor: pointer;
      .add-icon {
        margin-right: 5px;
      }
    }
  }
}
.tag-group:last-child {
  border-bottom: unset;
}
.tag-no-data {
  padding: 0 10px;
  box-sizing: border-box;
  font-weight: normal;
  color: #5e6166;
  margin-bottom: 20px;
}
.personal-tag {
  margin-bottom: 20px;
}
.behavior-tag {
  margin-bottom: 20px;
}
.btn-group {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
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
.tag-popup {
  padding: 10px;
}
/deep/ .van-nav-bar .van-icon {
  color: #4f73ad;
}
/deep/ .van-nav-bar {
  z-index: 99;
}
</style>