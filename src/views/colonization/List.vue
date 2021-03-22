<template>
  <div>
    <div v-if="true">
      <!-- isSingleChat -->
      <!-- <van-nav-bar title="Vip建群" /> -->
      <Page :config="pageConfig" @onLoad="onLoad" @onRefresh="onRefresh">
        <div class="table-list">
          <TableList
            :name="item.name"
            :groupNameTemplate="item.groupNameTemplate"
            :userContent="item.userContent"
            v-for="(item, index) in tableData"
            :key="index"
            @clickHandel="clickHandel(item)"
          ></TableList>
        </div>
      </Page>
      <van-dialog v-model="show" show-cancel-button @confirm="confirm">
        <div class="xfo-dialog">
          <div class="title group">群名称</div>
          <van-field
            input-align="center"
            v-model="groupName"
            :autofocus="true"
            placeholder="请输入群名称"
          />
          <div class="title">成员</div>
          <div style="text-align: center">
            <Coustom
              v-for="(item, index) in previewData.userList"
              :key="index"
              :url="item.avatar"
              :name="item.name"
              :size="40"
              style="margin: 5px"
            ></Coustom>
          </div>
        </div>
      </van-dialog>
    </div>
    <div class="no-power" v-else>
      <img
        src="http://athena-1255600302.cosgz.myqcloud.com/attachments/scrm/1733c8c502de448585ef0c7076dadbdf.png"
      />
    </div>
    <Loading :loading="isSingleChat && loading"></Loading>
  </div>
</template>

<script>
import TableList from "./components/TableList";
import Coustom from "./components/Coustom";
import Page from "../../components/common/Page";
import Loading from "../../components/common/loading";
import { Toast } from "vant";
export default {
  components: {
    TableList,
    Page,
    Coustom,
    Loading,
  },
  created() {
    this.OgetPenEnterpriseChatRulePage({});
    this.getWxJsJdkConfig();
  },
  data() {
    return {
      pageConfig: {
        loading: false,
        finished: false,
      },
      tableData: [],
      pageData: {
        pageSize: 20,
        pageNum: 1,
      },
      show: false,
      previewData: [],
      groupName: "",
      customerId: "",
      isSingleChat: false,
      loading: false,
    };
  },
  methods: {
    /* 页面渲染 */
    // 1.0 获取授权
    getWxJsJdkConfig() {
      let options = [
        "openEnterpriseChat",
        "getContext",
        "getCurExternalContact",
      ];
      let code = window.location.pathname.split("/")[1];
      this.loading = true;
      this.setPower(options, code, () => {
        this.getContext();
      });
    },
    // 2.0 获取页面入口环境
    getContext() {
      wx.invoke("getContext", {}, (res) => {
        if (res.err_msg == "getContext:ok") {
          var entry = res.entry; //返回进入小程序的入口类型
          if (entry != "single_chat_tools") {
            this.isSingleChat = false;
            this.loading = false;
            return;
          }
          this.isSingleChat = true;
          console.log("获取页面入口环境成功");
          this.getCurExternalContact();
        }
      });
    },
    // 3.0 获取当前外部联系人userid
    getCurExternalContact() {
      wx.invoke("getCurExternalContact", {}, (res) => {
        if (res.err_msg == "getCurExternalContact:ok") {
          console.log("当前外部联系人userId", res.userId);
          this.customerId = res.userId;
          this.loading = false;
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      this.OgetPenEnterpriseChatRulePage({});
    },
    // 滚动加载
    onLoad() {
      this.pageData.pageSize = this.pageData.pageSize + 20;
    },
    // 预览
    clickHandel(item) {
      console.log("aaaa");
      if (!this.isSingleChat) {
        return;
      }
      this.show = true;
      console.log(item);
      // this.previewData = item;
      console.log(this.customerId);
      let options = {
        wxCustomerId: this.customerId,
        id: item.id,
      };
      this.previewPenEnterpriseChatRule(options);
    },
    // 预览确定
    confirm() {
      if (this.ISIPHONE) {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
      }
      let userIds = [];
      this.previewData.userList.forEach((item) => {
        userIds.push(item.userId);
      });
      console.log("提交的数据", {
        userIds: userIds.join(";"),
        externalUserIds: this.customerId,
        groupName: this.groupName,
      });
      wx.openEnterpriseChat({
        // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
        userIds: userIds.join(";"), //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: this.customerId, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: this.groupName, // 会话名称。单聊时该参数传入空字符串""即可。
        chatId: "", // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
        success: function (res) {
          if (this.ISIPHONE) {
            Toast.clear();
          }
          var chatId = res.chatId; //返回当前群聊ID，仅当使用agentConfig注入该接口权限时才返回chatId
          // 回调
        },
        fail: function (res) {
          if (res.errMsg.indexOf("function not exist") > -1) {
            Toast.clear();
            alert("版本过低请升级");
          }
        },
      });
    },
    /* 获取数据 */
    OgetPenEnterpriseChatRulePage(options) {
      options.pageSize = this.pageData.pageSize;
      options.pageNum = this.pageData.pageNum;
      this.$http.OgetPenEnterpriseChatRulePage(options).then((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.pageConfig.finished = true;
        this.pageConfig.loading = false;
      });
    },
    previewPenEnterpriseChatRule(options) {
      this.$http.previewPenEnterpriseChatRule(options).then((res) => {
        console.log(res);
        let data = res.data.data;
        this.previewData = data;
        this.groupName = data.groupNameTemplate;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.table-list {
  padding: 10px;
}
.xfo-dialog {
  padding: 10px 20px;
  .title {
    text-align: center;
    color: #323233;
    margin: 16px 0;
    font-size: 14px;
    font-weight: bold;
    &.group {
      margin-bottom: 10px;
    }
  }
}
.no-power {
  width: 100%;
  padding-top: 200px;
  display: flex;
  justify-content: center;
  img {
    width: 70%;
  }
}
::v-deep .van-pull-refresh {
  overflow: unset;
}
</style>