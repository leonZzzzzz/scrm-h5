<template>
  <div class="life-div">
    <div class="tabbar-div">
      <div class="tabbar" v-if="tabs.length <= 4">
        <div
          class="tab-item"
          v-for="(item, index) in tabs"
          :key="index"
          :class="tabActive === item.value ? 'tab-active' : ''"
          @click="tabChange(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="tabbar-four-div" v-if="tabs.length > 4">
      <div class="a-div">
        <ul>
          <li
            v-for="(item, index) in tabs"
            :key="index"
            :class="tabActive === item.value ? 'tab-active' : ''"
            @click="tabChange(item)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div
        class="container-item"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div class="item-group-Name" @click="item.isTrue = !item.isTrue">
          {{ item.lifeCycle }}
          <van-icon
            :name="item.isTrue == true ? 'arrow-down' : 'arrow-up'"
            class="icon-item"
          />
        </div>
        <transition-group name="van-fade" class="list-group" tag="div">
          <template v-if="item.isTrue == true">
            <div
              class="item-group-customer"
              v-for="(custItem, custIndex) in item.list"
              :key="custIndex"
            >
              <div class="item-name" v-if="custItem.customerId != undefined">
                <div class="name-avatar">
                  <img :src="custItem.avatar" alt="" />
                </div>
                <div class="name-remark">
                  <div class="name">
                    <div
                      class="name-item"
                      v-html="parsingEmoji(custItem.name)"
                    ></div>
                    <div
                      :class="
                        custItem.gender == 0
                          ? 'gender-none'
                          : custItem.gender == 1
                          ? 'gender-man'
                          : custItem.gender == 2
                          ? 'gender-woman'
                          : ''
                      "
                    >
                      {{ custItem.gender | isGender }}
                    </div>
                  </div>
                  <div class="remark">
                    <div class="remark-left">
                      备注: <span> {{ custItem.remark | isRemark }}</span>
                    </div>
                  </div>
                  <div class="lasetime">
                    上次跟进时间：{{
                      custItem.lastFollowTime | allTableTimefilters
                    }}
                  </div>
                </div>
              </div>
              <div class="item-name-none" v-else>暂无数据</div>
            </div>
          </template>
        </transition-group>
      </div>
    </div>

    <!-- <div
      class="customer-btn"
      @click="openAdminBtn"
     
    >
      我是管理员
    </div>
    <div
      class="customer-btn"
     
    >
      切回成员视角
    </div> -->
    <!-- <Ball :title="title"></Ball> -->
    <Ball
      :title="title"
      v-if="isType == 1 && isAdmin == true"
      @click.native="openAdminBtn"
    ></Ball>
    <Ball
      :title="titles"
      @click.native="openPeople"
      v-if="isType == 2 && isAdmin == true"
    ></Ball>
  </div>
</template>
<script>
import Ball from "../../components/common/Ball";
export default {
  components: { Ball },
  data() {
    return {
      tabActive: 0,
      categoryId: "",
      // date: new Date(),
      tabs: [],
      authorizeUserId: "",
      FirstCategory: "",
      tableData: [],

      changeIndex: 0,
      day: "",
      type: "",
      isAdmin: false,
      isType: 0,
      title: "我是管理员",
      titles: "切回成员视角",
    };
  },
  methods: {
    //判断当type=='user'时，这个人是不是管理员
    isAdminCycle() {
      this.$http.isAdminCycle().then((res) => {
        this.isAdmin = res.data.data;
        if (this.isAdmin == true) {
          this.isType = 1;
          console.log("如果是管理员", this.isType);
        } else if (this.isAdmin == false) {
          this.isType = 0;
          console.log("如果不是管理员", this.isType);
        }
      });
    },
    //点击我是成员按钮
    openPeople() {
      this.day = sessionStorage.getItem("day");
      this.categoryId = sessionStorage.getItem("categoryId");
      this.isType = 1;
      let params = {
        categoryId: this.FirstCategory,
        day: this.day,
        userId: this.authorizeUserId,
      };
      console.log("点击我是成员按钮", this.isType);
      this.getUserCycleDaily(params);
    },
    //点击我是管理员按钮
    openAdminBtn() {
      this.day = sessionStorage.getItem("day");
      this.categoryId = sessionStorage.getItem("categoryId");
      this.isType = 2;
      let params = {
        categoryId: this.FirstCategory,
        day: this.day,
        userId: this.authorizeUserId,
      };
      console.log("点击我是管理员按钮", this.isType);
      this.getAdminCycleDeily(params);
    },
    changeOpen(index) {
      this.changeIndex = index;
      this.isTrue = !this.isTrue;
    },
    tabChange(item) {
      this.tabActive = item.value;
      this.FirstCategory = item.categoryId;
      this.day = sessionStorage.getItem("day");
      let params = {
        categoryId: this.FirstCategory,
        day: this.day,
        userId: this.authorizeUserId,
      };
      // this.getLifeCycleDaily();
      if (this.isType == 0) {
        this.getUserCycleDaily(params);
      }
      if (this.isType == 1) {
        this.getUserCycleDaily(params);
      }
      //如果type == 'admin'
      if (this.isType == 2) {
        this.getAdminCycleDeily(params);
      }
    },
    //获取分类下的客户
    getLifeCycleDaily() {
      this.tableData = [];
      this.day = sessionStorage.getItem("day");
      this.type = sessionStorage.getItem("type");
      let params = {
        categoryId: this.FirstCategory,
        day: this.day,
        userId: this.authorizeUserId,
      };
      //获取链接上带的type值，如果type == 'user'
      if (this.type == "user") {
        //判断是不是管理员
        this.isAdminCycle();
        this.getUserCycleDaily(params);
      }
      //如果type == 'admin'
      if (this.type == "admin") {
        //直接获取数据
        this.isAdmin = true;
        this.isType = 2;
        this.getAdminCycleDeily(params);
      }
    },
    getUserCycleDaily(params) {
      this.tableData = [];
      this.$http.getUserCycleDaily(params).then((res) => {
        let data = res.data.data;
        data.forEach((item) => {
          if (item.list.length == 0) {
            item.list = {
              remark: "暂无数据",
            };
          }
          this.tableData.push({
            lifeCycle: item.lifeCycle,
            lifeCycleId: item.lifeCycleId,
            list: item.list,
            isTrue: true,
          });
        });
      });
    },
    // 获取管理员信息
    getAdminCycleDeily(params) {
      this.tableData = [];
      this.$http.getAdminCycleDeily(params).then((res) => {
        let data = res.data.data;
        data.forEach((item) => {
          if (item.list.length == 0) {
            item.list = {
              remark: "暂无数据",
            };
          }
          this.tableData.push({
            lifeCycle: item.lifeCycle,
            lifeCycleId: item.lifeCycleId,
            list: item.list,
            isTrue: true,
          });
        });
      });
    },

    //获取分类列表，显示分类列表，并且将链接上的分类id拿到，跟全部分类进行比较，知道他是第几个
    getCustomerCategory() {
      this.tabs = [];
      this.$http.getCustomerCategory().then((res) => {
        let data = res.data.data;
        this.FirstCategory = sessionStorage.getItem("categoryId");
        data.forEach((item, index) => {
          this.tabs.push({
            text: item.name,
            categoryId: item.id,
            value: index,
          });
        });
        this.tabs.forEach((tabItem, index) => {
          if (this.FirstCategory == tabItem.categoryId) {
            this.tabActive = index;
          }
        });
        this.getLifeCycleDaily();
      });
    },
    // setUserId() {
    //   this.$http
    //     .setUserId({ userId: "236e3b2c0ff94eaf8f4dd401ed233164" })
    //     .then(() => {
    //       // this.$nextTick(() => {
    //       this.getCustomerCategory();
    //     });
    // },
  },
  created() {
    // this.setUserId();
    if (this.$route.query.day) {
      sessionStorage.setItem("day", this.$route.query.day);
    }
    if (this.$route.query.type) {
      sessionStorage.setItem("type", this.$route.query.type);
    }
    if (this.$route.query.categoryId) {
      sessionStorage.setItem("categoryId", this.$route.query.categoryId);
    }
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.authorizeUserId = wxUserId;
      this.getCustomerCategory();
    })
  },
  filters: {
    isGender(options) {
      if (options == 0) {
        return "?";
      }
      if (options == 1) {
        return "♂";
      }
      if (options == 2) {
        return "♀";
      }
    },
    isRemark(option) {
      return option.replace(/,/g, " / ");
    },
  },
  mounted() {
    document.title = "客户看板";
  },
};
</script>

<style lang="less" scoped>
.life-div {
  // overflow-x: auto;
  width: 100%;
  .tabbar-div {
    z-index: 9999 !important;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    .tabbar {
      display: flex;
      background-color: #ffffff;
      border-bottom: 1px solid #e8eaf0;
      padding: 10px 12px 0 12px;
      box-sizing: border-box;
      .tab-item {
        user-select: none;
        width: 100%;
        text-align: center;
        padding: 10px 0px;
        border-bottom: 2px solid rgba(0, 0, 0, 0);
        color: #9f9e9e;
        cursor: pointer;
      }
      .tab-active {
        color: #294a7b;
        border-bottom: 2px solid #294a7b;
        font-weight: bold;
      }
    }
  }
  .tabbar-four-div {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    background-color: #fff;
    z-index: 9999 !important;
    .a-div {
      ul {
        padding: 10px 0;
        border-bottom: 1px solid #e8eaf0;
        padding: 10px 12px 0 12px;
        list-style: none;
        white-space: nowrap;
        width: auto;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          text-align: center;
          padding: 10px 0px;
          border-bottom: 2px solid rgba(0, 0, 0, 0);
          color: #9f9e9e;
          cursor: pointer;
          user-select: none;
          margin-left: 20px;
          display: inline-block;
          &:last-child {
            margin-right: 20px;
          }
        }
      }
      .tab-active {
        color: #294a7b;
        border-bottom: 2px solid #294a7b;
        font-weight: bold;
      }
    }
  }
  .container {
    // height: 1000px;
    // border: 1px solid green;
    margin-top: 55px;
    width: 100%;
    overflow-y: auto;
    .container-item {
      // padding: 10px 0;
      .item-group-Name {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        color: #727070;
        margin-bottom: 1px;
        .icon-item {
          z-index: 1;
        }
      }
      .item-group-customer {
        .item-name {
          background-color: #fff;
          border-radius: 10px;
          padding: 10px;
          margin: 10px;
          display: flex;
          color: rgb(114, 112, 112);
          .name-avatar {
            img {
              width: 60px;
              height: 60px;
              border-radius: 5px;
            }
          }
          .name-remark {
            margin-left: 5px;
            .name {
              display: flex;
              font-size: 16px;
              height: 20px;
              line-height: 20px;

              .gender-none {
                margin-top: 2px;
                line-height: 15px;
                height: 15px;
                margin-left: 5px;
                padding: 0px 4px;
                border-radius: 3px;
                color: #fff;
                background-color: #cccccc;
                font-size: 14px;
              }
              .gender-woman {
                margin-top: 2px;
                line-height: 15px;
                height: 15px;
                margin-left: 2px;
                padding: 0px 2px;
                border-radius: 3px;
                color: #fff;
                background-color: #ff6e85;
                font-size: 12px;
              }
              .gender-man {
                margin-top: 2px;
                line-height: 15px;
                height: 15px;
                margin-left: 5px;
                // padding: 0px 5px;
                padding: 0px 2px;
                border-radius: 3px;
                font-size: 12px;
                background-color: #04baff;
                color: #fff;
              }
            }
            .remark {
              margin-top: 10px;
              color: rgb(168, 164, 164);
              font-size: 12px;
              display: flex;
              .remark-left {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 250px;
              }
            }
            .lasetime {
              color: rgb(168, 164, 164);
              font-size: 12px;
            }
          }
        }
        .item-name-none {
          margin: 5px 20px;
          display: flex;
          color: rgb(114, 112, 112);
          text-align: center;
          padding: 10px 0;
        }
      }
    }
  }
  .customer-btn {
    color: #fff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: #294a7b;
    padding: 10px;
    position: fixed;
    right: 0;
    z-index: 999;
    bottom: 20%;
    text-align: center;
  }
}
.xuanfu {
  height: 4.5rem;
  width: 4.5rem;
  /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
  z-index: 999;
  position: fixed;
  top: 4.2rem;
  right: 3.2rem;
  border-radius: 0.8rem;
  background-color: rgba(0, 0, 0, 0.55);
}
.yuanqiu {
  height: 2.7rem;
  width: 2.7rem;
  border: 0.3rem solid rgba(140, 136, 136, 0.5);
  margin: 0.65rem auto;
  color: #000000;
  font-size: 1.6rem;
  line-height: 2.7rem;
  text-align: center;
  border-radius: 100%;
  background-color: #ffffff;
}
</style>
