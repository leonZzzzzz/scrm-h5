<template>
  <div>
    <qc-nav-bar></qc-nav-bar>
    <div class="main-content">
      <div class="xfo-select">
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item
            v-model="selectValue"
            :options="selectOptions"
            @change="selectValueChange"
          />
        </van-dropdown-menu>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        ><div class="xfo-list" v-for="(item, index) in list" :key="index">
          <div class="xfo-day">{{ item.yearMonth }}</div>
          <div class="xfo-cell-item" v-for="his in item.childs" :key="his.id">
            <p>{{ his.content }}</p>
            <p class="xfo-time">{{ his.monthDay }}</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import QcNavBar from "../../components/common/QcNavBar.vue";
import { List, DropdownMenu, DropdownItem, Toast } from "vant";
export default {
  components: {
    QcNavBar,
    vanList: List,
    vanDropdownMenu: DropdownMenu,
    vanDropdownItem: DropdownItem,
  },
  created() {
    // this.$http.setUserId({ userId: "686085b7e58b4175b08105a5048387ca" });
    // this.getCustomerFollowRecordPage({});

    // if (this.$route.query.code && this.$store.state.isLogin) {
    //   let code = this.$route.query.code;
    //   this.authorizeLogin(code);
    // } else {
    //   this.checkLoginStatus();
    // }
    // this.getActionTraceList();
  },
  mounted() {
    window.onscroll = () => {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        console.log("触底拉");
        this.pageData.pageSize = this.pageData.pageSize + 20;
        if (this.maxSize && this.pageData.pageSize > this.maxSize) {
          return;
        }
        this.getCustomerFollowRecordPage({ actionTraceCode: this.selectValue });
      }
    };
  },
  data() {
    return {
      authorizeUserId: "",
      list: [],
      loading: false,
      finished: false,
      selectValue: "",
      selectOptions: [{ text: "全部", value: "" }],
      pageData: {
        pageSize: 15,
        pageNum: 1,
      },
      maxSize: null,
    };
  },
  methods: {
    authorizeLogin(code) {
      this.$http.authorizeLogin({ code }).then((res) => {
        // 将是否需要登录的参数值设为false，表示不再需要登录
        if (res.data.code === 20000) {
          this.authorizeUserId = res.data.data.userId;
          this.getCustomerFollowRecordPage({});
          this.$store.commit("updateIsLogin", false);
        } else if (res.data.code === 12003) {
          this.checkLoginStatus();
        }
      });
    },
    selectValueChange() {
      console.log("selectValue", this.selectValue);
      this.pageData.pageSize = 15;
      this.maxSize = null;
      let options = {
        actionTraceCode: this.selectValue,
      };
      this.getCustomerFollowRecordPage(options);
    },
    checkLoginStatus() {
      this.$http.getLoginStatus().then((res) => {
        this.authorizeUserId = res.data.data.wxUserId;
        this.getCustomerFollowRecordPage({});
      });
    },
    getActionTraceList() {
      this.$http.getActionTraceList().then((res) => {
        let data = res.data.data;
        data.forEach((item) => {
          this.selectOptions.push({
            text: item.name.slice(0, 2),
            value: item.code,
          });
        });
      });
    },
    getCustomerFollowRecordPage(options) {
      this.finished = false;
      this.loading = false;
      options.type = "0";
      options.identityId = this.authorizeUserId;
      options.pageSize = this.pageData.pageSize;
      options.pageNum = this.pageData.pageNum;
      this.$http.getCustomerFollowRecordPage(options).then((res) => {
        let list = res.data.data.list;
        this.finished = true;
        this.loading = true;
        let newArr = this.getYearsDays(list);
        this.list = newArr;
        this.maxSize = res.data.data.total;
      });
    },
    getYearsDays(list) {
      let dateArr = [];
      list.forEach((item) => {
        let yearMonth = item.createTime.slice(0, 7).replace("-", "年") + "月";
        let monthDay = item.createTime
          .slice(5, 16)
          .replace("-", "月")
          .replace(" ", "日");
        item.monthDay = monthDay;
        if (dateArr.length == 0) {
          dateArr.push({
            yearMonth,
            childs: [item],
          });
          return dateArr;
        }
        dateArr.forEach((data) => {
          if (data.yearMonth == yearMonth) {
            data.childs.push(item);
          } else {
            dateArr.push({
              yearMonth,
              childs: [item],
            });
          }
        });
      });
      return dateArr;
    },
  },
};
</script>

<style lang="less" scoped>
.main-content {
  padding-top: 46px;
  .xfo-day {
    padding: 0 20px;
    line-height: 26px;
    margin: 10px 0;
  }
  .xfo-cell-item {
    width: calc(100% - 20px);
    min-height: 46px;
    background-color: #fff;
    line-height: 20px;
    margin: 10px auto;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    p {
      margin: 0;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .xfo-time {
      color: #dadada;
      font-size: 12px;
      margin-top: 10px;
    }
  }
  .xfo-select {
    width: 90px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1200;
    ::v-deep .van-dropdown-menu__bar {
      height: 45px;
      box-shadow: none;
    }
    ::v-deep .van-dropdown-menu__item {
      justify-content: start;
      padding-left: 10px;
    }
    ::v-deep .van-dropdown-item {
      width: 90px;
      left: calc(100% - 90px);
    }
    ::v-deep .van-dropdown-item__content {
      border: solid #f9f9f9;
      border-width: 0 0 1px 1px;
    }
  }
}
</style>