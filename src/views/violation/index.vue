<template>
  <div class="violation">
    <div class="vio-title">
      <div class="top-left">违规记录</div>
    </div>
    <div
      class="customer-list"
      id="customer-list"
      :style="{ height: listHeight }"
    >
      <div class="list-item-box">
        <div
          class="list-item"
          v-for="(item, index) in violationList"
          :key="index"
        >
          <div class="item-left">
            <div class="left-info">
              <div class="info-mobile">
                <div class="info-avatar">
                  <img :src="item.fromUserAvatar" alt="" />
                </div>
                <div class="text-class">
                  <span class="info-ling-text">
                    {{ item.fromUserName || "未知" }}
                  </span>
                  <span class="and-text">与</span>
                  <span class="info-ling-text">{{
                    item.conversationName || "未知"
                  }}</span>
                  <span class="and-text">的聊天</span>
                </div>
              </div>
            </div>
            <div class="left-time">
              <div class="left-avatar">
                <img :src="item.fromUserAvatar" alt="" />
              </div>
              <div class="right-content">
                <div>{{ item.fromUserName || "未知" }}</div>
                <div v-html="parsingEmoji(item.content) || '--'"></div>
              </div>
            </div>
          </div>
          <div class="item-right" @click="checkDetail(item)">查 看</div>
        </div>
      </div>
      <div
        class="list-item-box-more"
        v-if="getMessagePageSizeNum.pageSize == violationList.length"
        @click="chooseMore()"
      >
        点击加载更多
      </div>
      <div class="list-item-box-more" v-else>
        暂无更多
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      listHeight: "400px",
      date: "",
      show: false,
      getViolationDate: "",
      violationList: [],
      getMessagePageSizeNum: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      authorizeUserId: "",
    };
  },
  created() {
    if (this.$route.query.date) {
      sessionStorage.setItem("date", this.$route.query.date);
      console.log('获取date:' + this.$route.query.date)
    }
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.authorizeUserId = wxUserId;
      this.getViolationPage();
    })
    // if (this.$route.query.code && this.$store.state.isLogin) {
    //   let code = this.$route.query.code;
    //   // 登录
    //   this.authorizeLogin(code);
    // } else {
    //   sessionStorage.setItem("date", this.$route.query.date);
    //   this.checkLoginStatus();
    // }
  },
  mounted() {
    this.$nextTick(() => {
      this.getFullHeight();
      window.onresize = () => {
        this.getFullHeight();
      };
    });
    document.title = "违规记录";
  },
  methods: {
    //逻辑部分
    //页面滚动到底部的方法
    getScrollY() {
      this.$nextTick(() => {
        setTimeout(() => {
          let top = document.documentElement.clientHeight;
          var middle = document.getElementById("customer-list");
          middle.style.height = top + "px";
          middle.scrollTop = middle.scrollHeight;
        }, 500);
      });
    },
    //获取列表高度
    getFullHeight() {
      this.listHeight =
        window.innerHeight -
        document.querySelector("#customer-list").offsetTop +
        "px";
    },
    checkDetail(item) {
      this.$router.push(
        `/violation/detail?conversationId=${item.conversationId}&sequence=${item.sequence}`
      );
    },
    //点击加载更多
    chooseMore() {
      this.getMessagePageSizeNum.pageSize += 20;
      this.getViolationPage();
      this.getScrollY();
    },
    //接口部分开始
    getViolationPage() {
      this.getViolationDate = sessionStorage.getItem("date");
      console.log("page", this.getViolationDate);
      this.violationList = [];
      let params = {
        pageSize: this.getMessagePageSizeNum.pageSize,
        pageNum: this.getMessagePageSizeNum.pageNum,
        date: this.getViolationDate,
      };
      this.$http.getViolationPage(params).then((res) => {
        res.data.data.list.forEach((item) => {
          let msg = item.sensitiveWordArray;
          let str = "";
          msg.forEach((item) => {
            str = str + item + "|";
          });
          str.substring(0, str.length - 1);
          let re = new RegExp("\\" + str, "ig");
          let content = "";
          if (item.content != "") {
            content = item.content.replace(
              re,
              "<span style='color: #294a7b;'>$&</span>"
            );
          }
          this.violationList.push({
            content: content,
            conversationId: item.conversationId,
            conversationName: item.conversationName,
            createTime: item.createTime,
            fromUserAvatar: item.fromUserAvatar,
            fromUserId: item.fromUserId,
            fromUserName: item.fromUserName,
            messageId: item.messageId,
            sensitiveWordArray: item.sensitiveWordArray,
            sequence: item.sequence,
            toUserAvatar: item.toUserAvatar,
            toUserId: item.toUserId,
            toUserType: item.toUserType,
            // msg: msg,
          });
          this.violationList.concat(this.violationList);
        });
        // this.violationList = res.data.data.list;
      });
    },
    //接口部分结束
  },
};
</script>

<style lang="less" scoped>
.vio-title {
  padding: 0px 12px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  .top-left {
    height: 45px;
    line-height: 45px;
  }
  .top-right {
    display: flex;
    margin-left: auto;
    width: 190px;
  }
}
.customer-list {
  padding: 0 12px;
  box-sizing: border-box;
  overflow-y: auto;
  .list-item-box {
    .list-item {
      display: flex;
      margin-bottom: 12px;
      // color: #9f9e9e;
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
            display: flex;
            font-size: 12px;
            .info-avatar {
              // border: 1px solid green;
              vertical-align: middle;
              img {
                width: 20px;
                height: 20px;
                border-radius: 5px;
                line-height: 20px;
                vertical-align: middle;
              }
            }
            .and-text {
              height: 20px;
              line-height: 20px;
            }
            .text-class {
              margin-left: 2px;
              white-space: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              // border: 1px solid red;
              .info-ling-text {
                color: #294a7b;
                margin: 0 2px;
              }
            }
          }
        }
        .left-time {
          font-size: 12px;
          display: flex;
          .left-avatar {
            img {
              width: 35px;
              height: 35px;
              border-radius: 5px;
            }
          }
          .right-content {
            color: #222222;
            margin-left: 5px;
            div:nth-child(1) {
              margin-bottom: 4px;
            }
            div:nth-child(2) {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; // 控制多行的行数
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      .background-light {
        background-color: rgba(255, 0, 0, 0.15);
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
  .list-item-box-more {
    width: 100%;
    background-color: #fff;
    text-align: center;
    padding: 5px 0;
    color: #294a7b;
  }
}
</style>
