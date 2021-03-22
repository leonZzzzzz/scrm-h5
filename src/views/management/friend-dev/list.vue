<template>
  <div class="container">
    <div class="top-tips">
      <van-notice-bar scrollable @click="goToPage">
        管理员【{{createBy}}】给你分配了客户，快去复制手机号码添加为你的客户吧！<span>如何添加客户&gt;</span>
      </van-notice-bar>
    </div>
    <div class="tabbar">
      <div class="tab-item"
        v-for="(item, index) in tabs"
        :key="index"
        :class="tabActive === item.value ? 'tab-active' : '' "
        @click="tabChange(item)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="add-tips" v-if="tabActive == 0">你有{{notAddedNumber}}名未添加客户</div>
    <div class="add-tips" v-else-if="tabActive == 1">你已添加{{addedNumber}}名客户</div>
    <div class="add-tips" v-else>你有25名被添加客户</div>
    <div class="customer-list" id="customer-list" :style="{ height: listHeight }">
      <div class="list-item-box" v-for="(item, index) in customerList" :key="index">
        <div class="list-item" v-if="tabActive == 0">
          <div class="item-left" :class="item.isCopied ? '' : 'background-light'">
            <div class="left-info">
              <span class="info-mobile">{{item.mobile}}</span> | <span>{{item.customerName}}</span>
            </div>
            <div class="left-time">
              复制时间：{{timeSubString(item.copyTime)}}
            </div>
          </div>
          <div class="item-right" @click="copyMessage(item)">复 制</div>
        </div>
        <div class="list-item" v-else>
          <div class="item-left">
            <div class="left-info">
              <span class="info-mobile">{{item.mobile}}</span> | <span>{{item.customerName}}</span>
            </div>
            <div class="left-time">
              添加时间：
            </div>
          </div>
          <div class="item-right" @click="copyMessage(item)">复 制</div>
        </div>
      </div>
    </div>
    <!-- <div class="floating-btn">统计</div> -->
  </div>
</template>

<script>
import { NoticeBar , Toast  } from 'vant'
export default {
  components: {
    vanNoticeBar: NoticeBar
  },
  data() {
    return {
      notAddedNumber: 0, // 未添加
      addedNumber: 0, // 已添加
      tabActive: 0,
      tabs: [
        // { text: '全部', value: -1 },
        { text: '未添加', value: 0 },
        { text: '已添加', value: 1 },
        // { text: '被添加', value: 2 },
      ],
      createBy: '',
      userId: '',
      friendId: '',
      customerList: [],
      page: {
        pageNum: 1,
        pageSize: 999,
        total: 0
      },
      listHeight: '400px',
    }
  },
  created() {
    if (this.$route.query.userId) {
      this.userId = this.$route.query.userId
      this.friendId = this.$route.query.friendId
      this.createBy = this.$route.query.createBy
      this.getMgmtPageCustomer()
    }
  },
  mounted() {
    document.title = '批量加好友'
    // document.querySelector('body').setAttribute('style', 'background-color:#ffffff')
    this.$nextTick(() => {
      this.getFullHeight()
      window.onresize = () => {
        this.getFullHeight()
      }
    })
  },
  destroyed() {
    window.onresize = ''
  },
  methods: {
    getFullHeight() {
      this.listHeight = window.innerHeight - document.querySelector('#customer-list').offsetTop + 'px'
    },
    getMgmtPageCustomer() {
      let params = {
        userId: this.userId,
        friendId: this.friendId,
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
        status: this.tabActive
      }
      this.$http.getMgmtPageCustomer(params).then(res => {
        this.customerList = res.data.data.list
        if (this.tabActive === 0) {
          this.notAddedNumber = res.data.data.total
        } else if (this.tabActive === 1) {
          this.addedNumber = res.data.data.total
        }
      })
    },
    // 跳转到添加方式页面
    goToPage() {
      this.$router.push('/friend/addway')
    },
    tabChange(item) {
      this.tabActive = item.value
      this.getMgmtPageCustomer()
    },
    copyMessage(item) {
      let message = item.mobile
      this.$copyText(message).then(res => {
        Toast.success('复制成功');
      }).catch(err => {
        //alert('Can not copy')
      })
      this.$http.copycustomer({ id: item.id }).then(() => {
        this.getMgmtPageCustomer()
      })
    },
    timeSubString(time) {
      if (!time) {
        return
      }
      return time.substring(0, time.length - 3)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
}
.top-tips {
  cursor: pointer;
  span {
    color: #294a7b;
  }
}
.tabbar {
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #E8EAF0;
  padding: 10px 12px 0 12px;
  box-sizing: border-box;
  .tab-item {
    flex: 1;
    padding: 10px 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    color: #9f9e9e;
    margin: 0 10px -1px 10px;
    text-align: center;
    cursor: pointer;
  }
  .tab-active {
    color: #294a7b;
    border-bottom: 2px solid #294a7b;
    font-weight: bold;
  }
}
.add-tips {
  padding: 20px 12px;
  box-sizing: border-box;
}
.customer-list {
  padding: 0 12px;
  box-sizing: border-box;
  overflow-y: auto;
  .list-item-box {
    .list-item {
      display: flex;
      margin-bottom: 12px;
      color: #9f9e9e;
      .item-left {
        flex: 1;
        background-color: #ffffff;
        border-radius: 5px;
        width: calc(100% - 46px);
        padding: 12px;
        box-sizing: border-box;
        .left-info {
          margin-bottom: 8px;
          .info-mobile {
            color: #222222;
          }
        }
        .left-time {
          font-size: 12px;
        }
      }
      .background-light {
        background-color: rgba(255, 0, 0, .15);
      }
      .item-right {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        min-width: 36px;
        font-size: 12px;
        color: #ffffff;
        background-color: #294a7b;
        border-radius: 5px;
        margin-left: 10px;
        writing-mode: vertical-rl;
        cursor: pointer;
      }
    }
  }
}
.floating-btn {
  position: absolute;
  left: 12px;
  top: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: #ffffff;
  background-color: #294a7b;
}
</style>