<template>
  <div class="customer-tags">
    <van-nav-bar
      title="添加标签"
      :left-arrow="true"
      left-text="返回"
      :fixed="true"
      @click-left="goBack">
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
      <!-- <div class="cont-title">添加标签</div> -->
      <div class="enterprise-tag">
        <template v-if="cropTagList.length > 0">
          <div
            class="tag-group"
            v-for="(item, index) in cropTagList"
            :key="index"
          >
          <div class="title-bar"><span class="bar-tag"></span>{{item.name}}</div>
            <!-- <div class="group-title">{{ item.name }}</div> -->
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
    </div>
    <div class="btn-group">
      <div class="com-btn btn-cancel" @click="onCancel">取消</div>
      <div class="com-btn btn-commit" @click="onCommit">确定</div>
    </div>
  </div>
</template>

<script>
import { Icon, Field, Notify, NavBar, Tag } from "vant";
export default {
  components: {
    vanIcon: Icon,
    vanField: Field,
    VanNavBar: NavBar,
    VanTag: Tag
  },
  data() {
    return {
      customerId: "",
      cropTagList: [], // 企业标签列表
      selectedCropTags: [], // 当前选中的企业标签
      selectedValue:[],
      tagAdd: {
        show: false,
        name: ""
      },
      behaviorTagList: [], // 行为标签列表
      activityid:''
    };
  },
  created() {
    this.activityid = this.$route.query.id
    this.getCustomerTagList();
    // if (this.$route.query.id) {
    //   this.customerId = this.$route.query.id;
    //   this.getCustomerTagList();
    // }
  },
  methods: {
    getCustomerTagList() {
      // let id = this.customerId;
      this.$http.getAllLabelTags().then(res => {
        this.cropTagList=res.data.data
        var tagList=this.$store.state.tagList
        console.log('tag111',tagList)
        let selectedCropTags = [];
        let selectedValue=[]
        this.cropTagList.forEach(item => {
          item.tagList.forEach(val=>{
            tagList.forEach(obj => {
              if (obj.id==val.id) {
                selectedCropTags.push(obj.id);
                selectedValue.push(val);
              }
            });
          })
        });
        this.selectedCropTags = selectedCropTags;
        this.selectedValue=selectedValue
      });
    },
    // 判断是否被选中，选中标记为蓝色底
    checkCropTagActive(obj) {
      if (this.selectedCropTags.indexOf(obj.id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    // 选中/未选中
    onCropTagSelect(obj) {
      if (this.selectedCropTags.indexOf(obj.id) > -1) {
        this.selectedCropTags.splice(this.selectedCropTags.indexOf(obj.id), 1);
      } else {
        this.selectedCropTags.push(obj.id);
      }
      console.log(this.selectedCropTags)
    },


    onCancel() {
      this.$router.back();
      this.$store.commit("getNewTagLists", this.selectedValue);
    },
    // 确定
    onCommit() {
      var tags=[]
      this.selectedCropTags.forEach(item=>{
        var list={}
        list.tagId=item
        tags.push(list)
      })
      let param = {
        id:this.activityid,
        tags:tags
      };
      this.$http.AddorUpdatetag(param).then(() => {
        Notify({ type: "success", message: "设置成功" });
        this.$store.commit("getNewTagLists", this.selectedValue);
        this.$router.back();
      });
    },
    goBack() {
      this.$router.back();
      // console.log('返回')
    },
  }
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
      background-color: #f2f8fe;
      margin: 0 10px 10px 0;
      cursor: pointer;
    }
    .tag-item-mobile {
      color: #4f73ad;
      padding: 3px 10px 0 10px;
      background-color: #e8f1fa;
      border-radius: 3px;
      margin: 0 5px 10px 0;
      height: 27px;
      line-height: 27px;
    }
    .active {
      background-color: #4f73ad;
      color: #ffffff;
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