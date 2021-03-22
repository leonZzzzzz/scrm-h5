<template>
  <div class="personal-tags">
    <!-- <van-nav-bar
      title="编辑个人标签"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    /> -->
    <van-nav-bar
      title="编辑个人标签"
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
      <div class="tag-list" v-if="personalTagList.length > 0">
        <div class="tag-item" v-for="(item, index) in personalTagList" :key="index">
          <div :class="isMobile ? 'tag-name-mobile' : 'tag-name'">{{ item.name }}</div>
          <div class="item-right">
            <div class="item-right">
            <van-icon name="edit" class="edit-icon left-icon" @click="updateTag(item)" />
            <van-icon name="delete" class="edit-icon" @click="deleteTag(item.id)" />
          </div>
          </div>
        </div>
      </div>
      <van-empty v-else description="暂无数据">
        <template #image>
          <img src="../../assets/empty-data.png" />
        </template>
      </van-empty>
    </div>
    <div class="tag-add" @click="addTag">
      <van-icon name="plus" class="add-icon"></van-icon>添加
    </div>
    <!-- 添加/编辑个人标签弹窗 -->
    <com-popup
      :show="tagPopup.show"
      :title="tagPopup.title"
      @onCancel="tagPopup.show = false"
      @onCommit="tagCommit"
    >
      <div class="tag-popup">
        <van-field
          autofocus
          v-model="tagPopup.form.name"
          placeholder="标签名称(最多15个字符)"
          maxlength="15"
          :style="{
            background: '#F7F7F9',
            borderRadius: '3px',
            border: '1px solid #DFE2E8',
            padding: '5px 10px'
          }"
        />
      </div>
    </com-popup>
  </div>
</template>

<script>
import { Icon, Field, Notify, NavBar, Tag, Dialog } from "vant";
import ComPopup from "../../components/common/ComPopup";
export default {
  components: {
    vanIcon: Icon,
    vanField: Field,
    ComPopup,
    VanNavBar: NavBar,
    VanTag: Tag,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      personalTagList: [],
      tagPopup: {
        show: false,
        title: '',
        form: {
          name: "",
          sequence: 0,
          describe: ""
        }
      },
      page: {
        pageNum: 1,
        pageSize: 999,
        total: 0
      }
    }
  },
  created() {
    this.getPersonalList()
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#ffffff')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    getPersonalList() {
      this.$http.getPersonalTags(this.page).then(res => {
        this.personalTagList = res.data.data.list
      })
    },
    addTag() {
      this.tagPopup.title = "添加个人标签"
      this.tagPopup.show = true
      this.tagPopup.form = {name: "", sequence: 0, describe: ""}
    },
    updateTag(item) {
      this.tagPopup.title = "编辑个人标签"
      this.tagPopup.show = true
      this.tagPopup.form = Object.assign({}, item)
    },
    tagCommit() {
      if (this.tagPopup.form.name === "") {
        Notify({ type: "warning", message: "请输入标签名称" });
        return;
      } else {
        if (this.tagPopup.form.id) {
          this.$http.updatePersonalTags(this.tagPopup.form).then(() => {
            Notify({ type: "success", message: "修改成功" });
            this.tagPopup.show = false;
            this.getPersonalList();
          });
        } else {
          this.$http.addPersonalTag(this.tagPopup.form).then(() => {
            Notify({ type: "success", message: "添加成功" });
            this.tagPopup.show = false;
            this.getPersonalList();
          });
        }
      }
    },
    deleteTag(id) {
      Dialog.confirm({
        message: "删除标签后，客户的这个标签也会被删除"
      })
        .then(() => {
          console.log('删除个人标签')
          this.$http.deletePersonalTags({ id }).then(res => {
            this.getPersonalList()
            Notify({ type: "success", message: "删除成功" });
          })
        })
        .catch(() => {});
    },
    goBack() {
      this.$router.back();
      // console.log('返回')
    },
  }
}
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
.personal-tags {
  background-color: #ffffff;
  height: 100%;
  .tags-content {
    padding: 20px 20px 60px 20px;
    background: #ffffff;
    box-sizing: border-box;
    .tag-list {
      .tag-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .tag-name {
          flex: 1;
          padding: 6px 12px;
          border-radius: 3px;
          background-color: #f2f8fe;
          margin: 0 10px 0 0;
          cursor: pointer;
        }
        .tag-name-mobile {
          flex: 1;
          color: #4f73ad;
          padding: 3px 10px 0 10px;
          background-color: #e8f1fa;
          border-radius: 3px;
          margin: 0 5px 0 0;
          // height: 27px;
          line-height: 27px;
        }
        .item-right {
          display: flex;
          align-items: center;
          .edit-icon {
            font-size: 24px;
          }
          .left-icon {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.tag-add {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  border-top: 1px solid #ebedf0;
  .add-icon {
    margin-right: 5px;
  }
}
/deep/ .van-nav-bar .van-icon {
  color: #4f73ad;
}
/deep/ .van-nav-bar {
  z-index: 99;
}
</style>