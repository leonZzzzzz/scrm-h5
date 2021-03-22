<template>
  <div>
    <div class="nav-bar">
      <van-icon
        name="arrow-left"
        class="left-arrow"
        :class="isMobile ? 'left-arrow-icon-mobile' : 'left-arrow-icon'"
        @click="$router.go(-1)"
        />
      <p class="page-title">选择发布的成员</p>
      <div :class="['submit', { active: isHas }]" @click="success">确定</div>
    </div>
    <div class="list">
      <van-radio-group v-model="visibility" checked-color="#294a7b">
        <van-radio name="all">
          <p>全部</p>
          <p>全部成员可见</p>
        </van-radio>
        <van-radio name="some">
          <p>指定成员</p>
          <p>选中的成员可见</p>
        </van-radio>
      </van-radio-group>
      <van-list
        v-if="visibility == 'some'"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell v-for="item in customerList" :key="item.id">
          <van-checkbox
            v-model="item.isChecked"
            checked-color="#294A7B"
            @change="change"
          >
            <div class="van-checkbox-content">
              <van-image
                width="22px"
                height="22px"
                fit="cover"
                :src="item.avatar"
              />
              {{ item.name }}
              <span class="position" v-if="item.position">@{{item.position}}</span>
            </div>
          </van-checkbox>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import {Checkbox, CheckboxGroup } from "vant";
import QcNavBar from "../../components/common/QcNavBar.vue";
import uniqWith from 'lodash/uniqWith'
export default {
  components: {
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    QcNavBar,
  },
  data() {
    return {
      customerList: [], // 成员列表
      loading: false,   // 加载状态
      finished: false,  // 完成状态
      isHas: true, // 是否选中成员
      visibility: 'all' // 盆友圈谁可以见
    };
  },
  watch: {
    'visibility'(val) {
      if (val === 'all') {
        // 公开
        this.customerList.forEach(item => {
          item.isChecked = true
          this.isHas = true
        })
      } else {
        // 指定成员
        this.customerList.forEach(item => {
          item.isChecked = false
          this.isHas = false
        })
      }
      sessionStorage.setItem('momentVisibility', val) 
    }
  },
  created() {
    this.visibility = sessionStorage.getItem('momentVisibility') || this.visibility;
    this.getCropDeptTrees();
  },
  methods: {
    // 设置数据
    setTreeData(options) {
      options.forEach((item) => {
        if (!item.childs) {
          this.$set(item, "childs", []);
        }
        if (item.userList && item.userList.length > 0) {
          for (var i = item.userList.length - 1; i >= 0; i--) {
            item.childs.unshift(item.userList[i]);
          }
        }
        if (item.childs.length > 0) {
          this.setTreeData(item.childs);
        }
      })
    },
    // 设置唯一id
    setMyId(options, myId) {
      options.forEach((item, index) => {
        item.myId = `${myId}-${index}`;
        if (item.childs.length == 0) {
          this.$set(item, "isChecked", false);
          this.customerList.push(item);
        }
        if (item.childs.length == 0) {
          for (var i = 0, len = this.customerList.length; i < len; i++) {
            for (var j = i + 1, len = this.customerList.length; j < len; j++) {
              if (this.customerList[i].id == this.customerList[j].id) {
                this.customerList.splice(j, 1);
                j--;
                len--;
              }
            }
          }
          return
        } else {
          this.setMyId(item.childs, item.myId);
        }
      });
    },
    change() {
      for (var i = 0; i < this.customerList.length; i++) {
        if (this.customerList[i].isChecked) {
          this.isHas = true;
          return;
        } else {
          this.isHas = false;
        }
      }
    },
    success() {
      if (!this.isHas) {
        return;
      }
      let customerIsCheckList = [];
      this.customerList.forEach((item) => {
        if (item.isChecked) {
          customerIsCheckList.push(item);
        }
      });
      this.$store.commit("customer/setCustomerList", customerIsCheckList);
      this.$router.go(-1);
    },
    // ---获取数据---
    getCropDeptTrees() {
      this.$http.getCropDeptTrees().then((res) => {
        let data = res.data.data;
        this.setTreeData(data);
        this.setMyId(data, 0);
        this.finished = true;
        this.loading = false;
      });
    },
    // 格式化数据
    formatTreeData(options) {
      let userList = []
      options.forEach((item) => {
        if (!item.userList) {
          this.$set(item, "userList", []);
        }
        if (item.childs && item.childs.length > 0) {
          item.userList = item.userList.concat(...item.childs.filter(f => {
            return f.userList && f.userList.length > 0
          }).map(m => m.userList))
        }
        userList = userList.concat(item.userList)
      })
      return userList
    },
  },
};
</script>

<style lang="less" scoped>
@black-color: #323233;
@gray-color: #c0c0c0;
@theme-color: #294a7b;

p {
  margin: 0 0;
}

.nav-bar {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  .submit {
    width: 72px;
    padding: 5px 20px;
    border-radius: 4px;
    color: #bcd5fa;
    box-sizing: border-box;
    &.active {
      color: #294a7b;
    }
  }
  .page-title {
    font-size: 16px;
  }
  .left-arrow {
    width: 72px;
    padding: 0px 10px;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    color: @black-color;
    box-sizing: border-box;
  }
}

.list {
  padding-top: 10px;
  .submit {
    padding: 5px 14px;
    background-color: #f2f2f2;
    color: #c0c0c0;
    position: fixed;
    top: 8px;
    right: 10px;
    z-index: 1100;
    border-radius: 4px;
    &.active {
      color: #ffffff;
      background-color: #294a7b;
    }
  }
  .van-checkbox-content {
    display: flex;
    align-items: center;
    .van-image {
      margin-right: 10px;
    }
    .position {
      color: #FBAC49;
      font-size: 12px;
      margin-left: 5px;
    }
  }
  ::v-deep .van-radio-group .van-radio__icon--checked .van-icon {
    background-color: #294a7b;
    border-color: #294a7b;
  }
  ::v-deep .van-radio-group {
    background-color: #fff;
    padding: 10px 20px;
    .van-radio {
      margin-bottom: 10px;
    }
    p {
      margin-top: 5px;
      &:first-child {
        font-size: 14px;
      }
      &:last-child {
        font-size: 12px;
        color: #888;
      }
    }
    // border-color: #294a7b;
  }
}
</style>
