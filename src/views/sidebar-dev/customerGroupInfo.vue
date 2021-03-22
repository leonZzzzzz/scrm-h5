<template>
  <div>
    <div class="header_nav">
      <!-- <van-nav-bar left-text="返回" left-arrow @click-left="$router.go(-1)" /> -->
      <qc-nav-bar></qc-nav-bar>
    </div>
    <div class="main_content">
      <van-list
        :finished="finished"
        finished-text="已经到底啦~"
        v-if="customerGroupList.length != 0"
      >
        <ul>
          <li v-for="(item, index) in customerGroupList" :key="index">
            <div class="user_info">
              <div class="user_name">群名：{{ item.name }}</div>
              <div class="user_position">成员：{{ item.quantity }}人</div>
              <div class="user_createTime">
                进群时间：{{ item.joinTime | allTableTimefilters }}
              </div>
            </div>
          </li>
        </ul></van-list
      >
      <van-empty description="暂无数据" v-else>
        <template #image>
          <img src="../../assets/empty-data.png" />
        </template>
      </van-empty>
    </div>
    <div></div>
  </div>
</template>

<script>
import { NavBar, Image, Toast, List, Empty } from "vant";
import QcNavBar from "../../components/common/QcNavBar";
export default {
  components: {
    VanNavBar: NavBar,
    VanImage: Image,
    VanList: List,
    VanEmpty: Empty,
    QcNavBar,
  },
  data() {
    return {
      pageId: "", // 页面id
      customerGroupList: {}, // 群列表
      finished: false,
    };
  },
  methods: {
    //   ---页面渲染函数---
    //   ---数据获取函数---
    // 客户加入的群列表
    getCustomerGroupPage(options) {
      this.$http.getCustomerGroupPage(options).then((res) => {
        console.log(res);
        this.customerGroupList = res.data.data.list;
        this.finished = true;
      });
    },
  },
  created() {
    this.pageId = this.$route.query.id;
    this.getCustomerGroupPage({ id: this.pageId });
  },
};
</script>

<style lang="less" scoped>
.main_content {
  padding-top: 46px;
  ul {
    li {
      display: flex;
      padding: 10px;
      background-color: #ffffff;
      margin-top: 10px;
      .user_info {
        font-size: 14px;
        color: #585858;
        .user_name {
          margin-bottom: 5px;
        }
        .user_position,
        .user_createTime {
          font-size: 12px;
          color: #bababa;
        }
      }
    }
  }
}
::v-deep .van-nav-bar__left {
  & > i::before {
    position: relative;
    top: 1px;
    left: 0;
  }
}
</style>