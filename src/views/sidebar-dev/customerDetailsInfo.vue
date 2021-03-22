<template>
  <div>
    <div class="header_nav">
      <!-- <van-nav-bar
        left-text="返回"
        left-arrow
        :right-text="`共${customerUserListTotal}人`"
        @click-left="$router.go(-1)"
      /> -->
      <qc-nav-bar :right-text="`共${customerUserListTotal}人`"></qc-nav-bar>
    </div>
    <div class="main_content">
      <van-list
        :finished="finished"
        finished-text="已经到底啦~"
        v-if="customerUserList.length != 0"
      >
        <ul>
          <li v-for="(item, index) in customerUserList" :key="index">
            <div class="user_avatar">
              <van-image
                width="57"
                height="57"
                fit="cover"
                :src="item.avatar"
              />
            </div>
            <div class="user_info">
              <div class="user_name">姓名：{{ item.name }}</div>
              <div class="user_position">职位：{{ item.position }}</div>
              <div class="user_createTime">
                添加时间：{{ item.createTime | allTableTimefilters }}
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
      customerUserList: [], // 内部人员列表
      customerUserListTotal: 0, // 内部人员列表总人数
      finished: false,
      isworkwechat:'',
    };
  },
  methods: {
    // ---页面渲染函数---
    // ---获取数据函数---
    // 获取添加过外部联系人的内部人员
    getCustomerUserPage(options) {
      if(this.isworkwechat=='not'){
        this.$http.notEnterpriseMembers(options).then((res) => {
          this.customerUserListTotal = '1';
          this.customerUserList=[]
          res.data.data.createTime=res.data.data.claimTime
          this.customerUserList.push(res.data.data) ;
        });
      }else{
        this.$http.getCustomerUserPage(options).then((res) => {
          this.customerUserList = res.data.data.list;
          this.customerUserListTotal = res.data.data.total;
          this.finished = true;
        });
      }
    },
  },
  created() {
    this.pageId = this.$route.query.id;
    this.isworkwechat=this.$route.query.isworkwechat
    this.getCustomerUserPage({ id: this.pageId });
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
        margin-left: 10px;
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