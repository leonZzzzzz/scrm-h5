<template>
  <div class="violation-detail" id="scroll-top">
    <!-- <div class="violation-title">
      <span>违规记录</span>
    </div> -->
    <!-- <div class="violation-div"></div> -->
    <div class="violation-container">
      <div class="violation-container-scroll">
        <div
          class="violation-more"
          @click="handleMore"
          v-if="total > messageList.length"
        >
          点击加载更多
        </div>
        <div class="violation-more" v-else>
          暂无更多消息
        </div>
        <div
          class="violation-container-item"
          v-for="(item, index) in messageList"
          :key="index"
        >
          <div class="violation-item-time">
            {{ item.messageTime | timeSubString }}
          </div>
          <div
            :class="
              item.sender.userType == 'external'
                ? 'violation-item-left'
                : 'violation-item-right'
            "
          >
            <div class="violation-item-avatar">
              <div class="violation-avatar">
                <img :src="item.sender.avatar | isHttp" alt="" />
              </div>
              <!--如果是文字-->
              <div
                class="violation-content"
                v-if="
                  item.messageType != 'image' && item.messageType != 'emotion'
                "
              >
                <div class="message" v-html="parsingEmoji(item.content)"></div>
              </div>
              <!--如果是图片-->
              <div
                class="violation-content-image"
                v-if="
                  item.messageType == 'image' || item.messageType == 'emotion'
                "
              >
                <div class="message">
                  <van-image :src="(item.host + item.fileUrl) | isImage" />
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <!-- <div class="violation-item-right">
          <div class="violation-item-avatar">
            <div class="violation-avatar">
              <img src="../../assets/moment_default-cover.jpg" alt="" />
            </div>
            如果是文字
            <div class="violation-content">
              <div class="message">
                内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容
              </div>
            </div>
            如果是图片
            <div class="violation-content">
              <div class="message">
                <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
            </div>
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conversationId: "",
      sequence: "",
      messageList: [],
      pageSize: 20,
      pageNum: 1,
      total: 0,
    };
  },
  methods: {
    //页面滚动到底部的方法
    getScrollY() {
      this.$nextTick(() => {
        setTimeout(() => {
          let top = document.documentElement.clientHeight;
          let middle = document.getElementById("scroll-top");
          middle.style.height = top + "px";
          middle.scrollTop = middle.scrollHeight;
          // console.log(middle.scrollTop);
        }, 500);
      });
    },
    handleMore() {
      this.loadMore();
    },
    loadMore() {
      this.pageSize += 20;
      this.getViolation();
    },
    //接口部分
    getViolation() {
      let params = {
        conversationId: this.conversationId,
        sequence: this.sequence,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      this.$http.getViolation(params).then((res) => {
        this.messageList = res.data.data.list;
        this.total = res.data.data.total;
        this.messageList.reverse();
      });
    },
    //接口结束
  },
  created() {
    this.conversationId = this.$route.query.conversationId;
    this.sequence = this.$route.query.sequence;
    this.getViolation();
    this.getScrollY();
    // console.log(document.documentElement.clientHeight);
  },
  mounted() {
    document.title = "违规记录";
  },
  filters: {
    timeSubString(time) {
      if (!time) {
        return;
      }
      return time.substring(0, time.length - 3);
    },
    isHttp(url) {
      let isTrue = /(http|https):\/\/([\w.]+\/?)\S*/;
      // isTrue.compile(/(http|https):\/\/([\w.]+\/?)\S*/)
      // if (!isTrue.test(url)) {
      //   return false
      // }
      if (!url) {
        return (url =
          "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png");
      } else {
        // return url
        if (!isTrue.test(url)) {
          return (url =
            "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png");
        } else {
          return url;
        }
      }
    },
    isImage(url) {
      if (url != "") {
        return url;
      } else {
        return (url = "");
      }
    },
  },
};
</script>

<style lang="less" scoped>
body {
  overflow: hidden;
}
.violation-detail {
  // border: 1px solid green;
  overflow: auto;
  .violation-title {
    color: #404041;
    z-index: 999;
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background-color: #ffffff;
    height: 40px;
    text-align: center;
    // span {
    //   height: 40px;
    //   line-height: 40px;
    // }
  }

  .violation-container {
    .violation-container-scroll {
      .violation-more {
        height: 40px;
        line-height: 40px;
        // border: 1px solid red;
        // padding-top: 20px;
        text-align: center;
        color: #409eff;
      }
      .violation-container-item {
        width: 100%;
        // border: 1px solid red;
        .violation-item-time {
          margin: 5px 0;
          font-size: 12px;
          color: #606266;
          text-align: center;
        }
        .violation-item-left {
          margin: 5px 10px;
          .violation-item-avatar {
            display: flex;
            .violation-avatar {
              img {
                width: 35px;
                height: 35px;
                border-radius: 5px;
              }
            }
            .violation-content {
              // width: 80%;
              margin-right: 40px;
              .message {
                font-size: 12px;
                border-radius: 5px;
                margin: 10px 5px;
                padding: 5px;
                color: #fff;
                background-color: #409eff;
                position: relative;
                &::before {
                  top: 3px;
                  left: -15px;
                  position: absolute;
                  content: "";
                  width: 0;
                  height: 0;
                  border-top: 10px solid transparent;
                  border-bottom: 10px solid transparent;
                  border-left: 10px solid transparent;
                  border-right: 10px solid #409eff;
                }
              }
            }
          }
        }
        .violation-item-right {
          display: flex;
          flex-direction: row-reverse;
          // border: 1px solid red;
          margin: 5px 10px;
          .violation-item-avatar {
            display: flex;
            flex-direction: row-reverse;
            .violation-avatar {
              img {
                width: 35px;
                height: 35px;
                border-radius: 5px;
              }
            }
            .violation-content {
              // width: 80%;
              margin-left: 40px;
              .message {
                font-size: 12px;
                border-radius: 5px;
                margin: 10px 5px;
                padding: 5px;
                color: #fff;
                background-color: #409eff;
                position: relative;
                &::after {
                  top: 3px;
                  right: -15px;
                  position: absolute;
                  content: "";
                  width: 0;
                  height: 0;
                  border-top: 10px solid transparent;
                  border-bottom: 10px solid transparent;
                  border-left: 10px solid #409eff;
                  border-right: 10px solid transparent;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
