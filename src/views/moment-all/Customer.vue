<template>
  <div>
    <qc-nav-bar></qc-nav-bar>
    <div class="list">
      <div :class="['submit', { active: isHas }]" @click="success">确定</div>
      <van-list
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
import { List, Cell, Checkbox, CheckboxGroup, Image } from "vant";
import QcNavBar from "../../components/common/QcNavBar.vue";
export default {
  components: {
    vanList: List,
    vanCell: Cell,
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    vanImage: Image,
    QcNavBar,
  },
  created() {
    this.getCropDeptTrees();
  },
  data() {
    return {
      customerList: [],
      loading: false,
      finished: false,
      isHas: false,
    };
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
        if (item.childs.length == 0) {
          return;
        } else {
          this.setTreeData(item.childs);
        }
      });
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
          return;
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
          item.type = 0
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
  },
};
</script>

<style lang="less" scoped>
.list {
  padding-top: 46px;
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
}
</style>
