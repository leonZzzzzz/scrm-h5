<template>
  <div class="group-chat">
    <van-nav-bar
      :left-arrow="true"
      left-text="返回"
      right-text="同步数据"
      @click-left="goBack"
      @click-right="onDataSync"
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
    <div class="group-search">
      <van-search
        v-model="customerName"
        :show-action="false"
        placeholder="请输入客户昵称"
        :clearable="false"
        @input="getGroupChatCustomerList"
      >
        <template #left-icon>
          <van-icon
            name="search"
            class="search-icon"
            @click="getGroupChatCustomerList"
          ></van-icon>
        </template>
        <template #right-icon>
          <van-icon
            name="cross"
            class="clear-icon"
            @click="clearSearch"
          ></van-icon>
        </template>
        <!-- <template #action>
          <div class="data-sync">数据同步</div>
        </template> -->
      </van-search>
    </div>
    <div
      class="group-content"
      id="group-content"
      :style="{ height: pageHeight }"
    >
      <div class="customer-list" v-if="customerList.length > 0">
        <div
          class="list-item-box"
          v-for="(item, index) in customerList"
          :key="index"
          @click="goToCustomerPage(item)"
        >
          <div class="list-item">
            <img class="item-img" :src="item.userAvatar" alt="" />
            <div class="item-msg">
              {{ item.userName }}
              <span class="type-name">@微信</span>
              <!-- <span class="type-name">@企业微信</span> -->
            </div>
          </div>
        </div>
      </div>
      <van-empty v-else description="未找到相关客户">
        <template #image>
          <img src="../../assets/empty-data.png" />
        </template>
      </van-empty>
    </div>
    <!-- 群聊-添加联系人提示框 -->
    <notify-dialog :show="notifyDialogShow" @onClose="notifyDialogShow = false">
      <div class="notify-content">
        <div class="cont-top">
          该群成员尚未添加为联系人，暂无该客户详情，请先添加为联系人。
        </div>
        <div class="cont-info">
          <div class="info-title">添加方法：</div>
          <div class="info-msg" v-if="isMobile">
            退出当前页面，点击聊天窗口右上角进入群信息页面，选择进入群全部成员列表，选择需要添加为客户的外部成员，申请添加为联系人即可。
          </div>
          <div class="info-msg" v-else>
            关闭聊天工具栏，在侧边栏群全部成员列表，选择需要添加为客户的外部成员，申请��加为联系人即可。
          </div>
        </div>
      </div>
    </notify-dialog>
    <!-- loading -->
    <dia-loading :loading="isLoading"></dia-loading>
  </div>
</template>

<script>
import { NavBar, Search, Icon, Empty, Notify, Overlay } from "vant";
import NotifyDialog from "../../components/common/NotifyDialog";
import DiaLoading from "../../components/common/loading";
export default {
  components: {
    vanNavBar: NavBar,
    vanSearch: Search,
    vanIcon: Icon,
    vanEmpty: Empty,
    vanOverlay: Overlay,
    NotifyDialog,
    DiaLoading,
  },
  data() {
    return {
      pageHeight: "500px",
      customerList: [
        {
          userName: "小佛"
        }
      ],
      notifyDialogShow: false, // 提示弹窗
      chatId: "",
      customerName: "",
      isLoading: false,
      timer: "" // 定时器
    };
  },
  created() {
    if (this.$route.query.chatId) {
      this.chatId = this.$route.query.chatId;
      this.getGroupChatCustomerList();
     
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fullPageHeight();
      window.onresize = () => {
        this.fullPageHeight();
      };
    });
  },
  destroyed() {
    window.onresize = "";
  },
  methods: {
    fullPageHeight() {
      this.pageHeight =
        window.innerHeight -
        document.querySelector("#group-content").offsetTop +
        "px";
    },
    // 获取群的客户列表
    getGroupChatCustomerList() {
      let params = {
        chatId: this.chatId,
        name: this.customerName,
        type: 2 // 类型为客户
      };
      let list = [];
      this.$http.getGroupChatCustomerPage(params).then(res => {
        // let data = res.data.data
        // data.forEach(item => {
        //   if (item.type === 2) {
        //     list.push(item)
        //   }
        // })
        // this.customerList = list
        this.customerList = res.data.data;
      });
    },
    clearSearch() {
      this.customerName = "";
      this.getGroupChatCustomerList();
    },
    // 跳转到客户详情页
    goToCustomerPage(obj) {
      // if (obj.isJoined) {
      //   this.$router.push(`/sidebar-dev/customerDetail?id=${obj.id}`)
      // } else {
      //   this.notifyDialogShow = true
      // }
      this.$router.push(
        `/sidebar-dev/customerDetail?id=${obj.userId}&wxId=${obj.wxUserId}`
      );
    },
   
    goBack() {
      this.$router.back();
    },
    onDataSync() {
      // 数据同步
      this.isLoading = true;
      this.timer = setTimeout(() => {
        if (this.isLoading) {
          this.isLoading = false;
        }
      }, 10000);
      // let wxChatId = this.chatId
      this.$http.groupChatDataSync({ wxChatId: this.chatId }).then(() => {
        if (this.$route.query.chatId) {
          this.getGroupChatCustomerList();
        }
        this.isLoading = false;
        clearTimeout(this.timer);
      });
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="less" scoped>
.group-chat {
  background-color: #ffffff;
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
  .group-search {
    .search-icon {
      font-size: 20px;
      cursor: pointer;
    }
    .clear-icon {
      cursor: pointer;
    }
    // .data-sync {
    //   padding: 0 6px;
    //   box-sizing: border-box;
    //   font-size: 12px;
    //   color: #ffffff;
    //   background-color: #4f73ad;
    //   border-radius: 3px;
    // }
  }
  .group-content {
    overflow-y: auto;
    .customer-list {
      .list-item-box {
        padding: 0 12px;
        box-sizing: border-box;
        background-color: #ffffff;
        cursor: pointer;
        .list-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e8eaf0;
          .item-img {
            width: 44px;
            height: 44px;
            border-radius: 3px;
            margin-right: 12px;
            overflow: hidden;
          }
          .item-msg {
            .type-name {
              color: #2eab42;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
.notify-content {
  padding: 20px;
  box-sizing: border-box;
  line-height: 18px;
  .cont-top {
    padding: 0 20px;
    box-sizing: border-box;
    text-align: center;
  }
  .cont-info {
    margin-top: 20px;
    .info-msg {
      color: #969799;
    }
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
/deep/ .van-nav-bar .van-icon {
  color: #4f73ad;
}
/deep/ .van-nav-bar__text {
  color: #4f73ad;
}
</style>