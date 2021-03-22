<template>
  <div class="customer-info">
    <van-pull-refresh v-model="isPullRefresh" @refresh="onRefresh">
      <qc-nav-bar color="#222" />
      <div class="placeholder-el"></div>
      <div class="single-chat">
        <div class="customer-content">
          <div class="base-info">
            <div class="summary">
              <div class="summary-left">
                <img v-if="isworkwechat!='not'" class="cust-avatar" :src="customerModel.avatar || customerModel.headImage" alt="" />
                <div class="cust-cont">
                  <div class="cust-name">
                    {{ customerModel.name || customerModel.appellation}}
                    <span
                        class="type-name"
                        v-if="customerModel.followStatus == 'follow'"
                        >@微信</span
                      >
                  </div>
                  <div class="cust-company">{{ customerModel.company }}</div>
                  <div class="follow-status-wrap" v-if="customerModel.followStatus && customerModel.followStatus != 'follow'">
                    <div 
                      class="follow-status" 
                      :class="{'follow-status-a': customerModel.followStatus == 'follow'}"
                      >{{ customerModel.followStatus == 'follow' ? '已跟进' : '未跟进' }}</div>
                  </div>
                </div>
              </div>
              <div class="summary-right" v-if="tuser==true">
                <div class="edit-btn" @click="goToEditPage()">
                  <van-icon name="edit" class="edit-icon" />
                  <span>编辑资料</span>
                </div>
              </div>
            </div>
            <div class="detail">
              <div class="detail-wrapper" :class="isExpendDetail ? 'active' : ''">
                <div ref="detail_wrapper_content">
                  <div class="detail-qty">
                    <div>
                      <!-- <van-icon name="search" /> -->
                      <van-icon class-prefix="v-font" name="icon-fangwen" />
                      <span> 访问次数 {{ customerModel.visitQuantity | formatQuantity }}</span>
                    </div>
                    <div>
                      <!-- <van-icon name="user-o" /> -->
                      <van-icon class-prefix="v-font" name="icon-liulan" />
                      <span> 浏览文章 {{ customerModel.visitArticleQuantity | formatQuantity }}</span>
                    </div>
                    <div>
                      <!-- <van-icon name="share-o" /> -->
                      <van-icon class-prefix="v-font" name="icon-zhuanfafasong-3" />
                      <span> 转发 {{ customerModel.shareQuantity | formatQuantity }}</span>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.remark">
                    <div class="item-left">
                      <div class="item-label">备注名:</div>
                      <div class="item-desc">{{ customerModel.remark }}</div>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="item-left">
                      <div class="item-label">企业:</div>
                      <div class="item-desc">
                        {{ customerModel.company }}
                      </div>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.position">
                  <div class="item-left">
                    <div class="item-label">职位:</div>
                    <div class="item-desc">{{ customerModel.position }}</div>
                  </div>
                </div>
                  <div class="info-item">
                    <div class="item-left">
                      <div class="item-label">电话:</div>
                      <div class="item-desc">{{ customerModel.phone }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="extend-content">
          <div class="tabbar">
            <div class="tab-item" v-for="(item, index) in tabs" :key="index"
              :class="tabActive === item.value ? 'tab-active' : ''" @click="tabChange(item)">
              {{ item.name }}
            </div>
          </div>
          <!-- 跟进记录-手动添加 -->
          <div class="dynamic-record" v-if="tabActive === 'manul-record'">
            <div class="record-add" v-if="tuser == true">
              <input placeholder="请输入要添加的跟进信息~ 100字内" maxlength="100" v-model="recordContent" />
              <div class="add-btn" @click="addRecord">添加</div>
            </div>
            <div class="record-steps">
              <van-steps direction="vertical" :active="-1">
                <van-step v-for="(item, index) in recordList" :key="index">
                  <div class="step-top">
                    <div class="step-hours">
                      {{ formatTimeHours(item.createTime) }}
                    </div>
                    <div class="step_btns" v-if="tuser == true">
                      <div class="btn" :class="isMobile ? 'small-btn-mobile left-btn' : 'small-btn left-btn'"
                        @click="updateRecordSteps(item)">
                        修改
                      </div>
                      <div class="btn" :class="isMobile ? 'small-btn-mobile' : 'small-btn'" @click="deleteRecordSteps(item.id)">
                        删除
                      </div>
                    </div>
                  </div>
                  <div class="step-info"><span class="info-name">{{ item.createBy }}&nbsp;</span>发表：</div>
                  <div class="step-message" v-html="item.content"></div>
                  <div class="step-time">
                    <div v-html="item.formatterTime"></div>
                  </div>
                </van-step>
              </van-steps>
              <div class="record-no-more" v-if="listLoading">加载中...</div>
              <div class="record-no-more" v-else-if="recordList.length == recordPage.total && recordPage.total > 0">已经到底啦~
              </div>
              <div class="record-load-more" v-else-if="recordList.length != recordPage.total && recordPage.total > 0"
                @click="loadMoreRecord">显示更多</div>
              <!-- 无数据内容 -->
              <van-empty description="暂无数据" v-else>
                <template #image>
                  <img :src="emptyDataImg" />
                </template>
              </van-empty>
            </div>
            <!-- 修改操作 -->
            <van-dialog v-model="updateFlag" confirmButtonColor="#3973CA" show-cancel-button @confirm="updateFlagFun()">
              <div class="dialog_content">
                <van-field v-model="updateValue" label="跟进内容" label-width="70px" colon placeholder="请输入跟进内容, 100字内" clearable
                  maxlength="100" style="padding-top: 20px;padding-bottom: 20px;" />
              </div>
            </van-dialog>
          </div>
          <!-- 动态记录-系统自动添加 -->
          <div class="dynamic-record" v-else-if="tabActive === 'dynamic-record'">
            <div class="record-steps dynamic-steps">
              <van-steps direction="vertical" :active="-1">
                <van-step v-for="(item, index) in recordList" :key="index">
                  <div class="step-top">
                    <div class="step-hours">
                      {{ formatTimeHours(item.createTime) }}
                    </div>
                  </div>
                  <div class="step-message" v-html="item.content"></div>
                  <div class="step-time">
                    <div v-html="item.formatterTime"></div>
                  </div>
                </van-step>
              </van-steps>
              <div class="record-no-more" v-if="listLoading">加载中...</div>
              <div class="record-no-more" v-else-if="recordList.length == recordPage.total && recordPage.total > 0">已经到底啦~
              </div>
              <div class="record-load-more" 
                v-else-if="recordList.length != recordPage.total && recordPage.total > 0"
                @click="loadMoreRecord">显示更多</div>
              <!-- 无数据内容 -->
              <van-empty description="暂无数据" v-else>
                <template #image>
                  <img :src="emptyDataImg" />
                </template>
              </van-empty>
            </div>
          </div>
          <!-- 订单记录 -->
          <div class="order-record" v-else-if="tabActive === 'order-record'">
            <div class="record-content">
              <!-- 无数据内容 -->
              <van-empty description="暂无数据" v-if="!listLoading && orderPage.total <= 0">
                <template #image>
                  <img :src="emptyDataImg" />
                </template>
              </van-empty>
              <div class="record-list" v-else>
                <div class="order-item" v-for="(item, index) in orderList" :key="index">
                  <div class="item-top">
                    <div class="t-numb">订单编号: {{ item.orderNumber }}</div>
                    <div class="t-status" :style="item.status | statusColor">{{ item.status | statusName }}</div>
                  </div>
                  <div class="item-content">
                    <div class="c-msg">{{ item.orderContent }}</div>
                    <!-- <div class="c-amount"><span class="sign">￥</span><span class="price">{{ item.productAmount | toPriceYuan }}</span></div> -->
                    <!-- <div>商品金额￥{{ item.productAmount | toPriceYuan }}</div> -->
                    <div class="c-price">订单金额<span class="sign">￥</span><span
                        class="price">{{ item.orderAmount | toPriceYuan }}</span></div>
                  </div>
                  <div class="item-bottom">
                    <div class="b-label">创建时间</div>
                    <div class="b-msg">{{ item.createTime | allTableTimefilters }}</div>
                  </div>
                </div>
                <div class="order-list-tips" v-if="listLoading">加载中...</div>
                <div class="order-list-tips" v-else-if="orderList.length == orderPage.total">已经到底啦~</div>
                <div class="load-more" v-else @click="loadMoreOrder">显示更多</div>
              </div>
            </div>
          </div>
          <!-- 最关心 -->
          <div class="most-interested" v-else-if="tabActive === 'most-interested'">
            <div class="record-content">
              <!-- 无数据内容 -->
              <van-empty description="暂无数据" v-if="!listLoading && interestedList.length <= 0">
                <template #image>
                  <img :src="emptyDataImg" />
                </template>
              </van-empty>
              <div class="record-list" v-else>
                <div class="interested-item" v-for="(item) in interestedList" :key="item.id" @click.stop="toArticleDetail(item.id)">
                  <div class="item-top">
                    <div class="name">{{ item.name }}</div>
                  </div>
                  <div class="item-content">
                    <div v-html="item.content"></div>
                  </div>
                  <div class="item-bottom">
                    <div class="time"> {{ item.createTime | formatDateTime('date')}}</div>
                    <div class="qty">
                      <van-icon class-prefix="v-font" name="icon-fangwen" />
                      <span> 访问次数 {{ item.visitQuantity }}</span>
                    </div>
                  </div>
                </div>
                <div class="order-list-tips" v-if="listLoading">加载中...</div>
                <div class="order-list-tips" v-else-if="interestedList.length > 0">已经到底啦~</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <dia-loading :loading="isLoading"></dia-loading>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {
    Icon,
    Steps,
    Step,
    DropdownItem,
    DropdownMenu,
    Notify,
    Toast,
    Field,
    Search,
    Empty,
    Overlay,
    Button,
    Dialog,
    Cell,
    Collapse,
    CollapseItem,
    Image,
    Tab,
    Tabs,
    NavBar,
    Picker,
    Popup,
    PullRefresh,
    ImagePreview,
  } from "vant";
  import NotifyDialog from "@/components/common/NotifyDialog";
  import DiaLoading from "@/components/common/loading";
  import QcNavBar from "@/components/common/QcNavBar";
  import VueHorizontal from "vue-horizontal";
  // 跟进、动态记录左边的时间格式
  let recordLatestDate = '';
  // 无数据时的图片
  const emptyDataImg = require('../../../../assets/empty-data.png')
  export default {
    components: {
      QcNavBar,
      vanIcon: Icon,
      vanSteps: Steps,
      vanStep: Step,
      vanDropdownMenu: DropdownMenu,
      vanDropdownItem: DropdownItem,
      NotifyDialog,
      vanField: Field,
      vanSearch: Search,
      vanEmpty: Empty,
      vanOverlay: Overlay,
      vanButton: Button,
      vanCell: Cell,
      vanCollapse: Collapse,
      vanCollapseItem: CollapseItem,
      vanImage: Image,
      vanTabs: Tabs,
      vanTab: Tab,
      vanNavBar: NavBar,
      [Dialog.Component.name]: Dialog.Component,
      vanPicker: Picker,
      vanPopup: Popup,
      vanPullRefresh: PullRefresh,
      VueHorizontal,
      DiaLoading,
    },
    data() {
      this.emptyDataImg = emptyDataImg
      return {
        copyerr: '',
        copycontent: false,
        isPullRefresh: true,
        customerModel: {},
        customerId: "", // 在这里是客户线索ID
        wxCustomerId: "",
        isExpendDetail: false,
        customerTags: [],
        recordContent: "",
        recordList: [],
        lifeCycleStage: "", // 生命周期阶段
        lifeCycleCategory: "", // 生命周期-客户分类
        lifeCycleOptions: [
          // 生命周期阶段列表
          // { text: '未设置', value: -1 },
          // { text: '阶段一', value: 0 },
          // { text: '阶段二', value: 1 },
        ],
        tabs: [{
            name: "跟进",
            value: "manul-record"
          }, // 手动添加的记录
          {
            name: "动态",
            value: "dynamic-record"
          }, // 系统自动添加的记录
          {
            name: '订单',
            value: 'order-record'
          }, // 订单列表
          {
            name: '最关心',
            value: 'most-interested'
          }, // 订单列表
        ],
        tabActive: "manul-record",
        bindingNotifyShow: false, // 订单记录-绑定客户信息提示框
        noMatchNotifyShow: false, // 无匹配的会员订单提示框
        orderList: [], // 订单记录
        updateFlag: false, // 动态列表修改
        updateValue: "", // 动态内容值
        updateId: "",
        customerGroupTotal: 0, // 客户加入的群列表总数
        orderPage: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
        },
        memberNames: "", // 输入的会员名称
        orderConfig: {}, // 判断前端是否展示订单记录
        isLoading: false,
        timer: "", // 定时器
        externalProfileList: [], // 客户的扩展信息列表
        detailWrapperHeight: 0, // 判断获取用户资料高度溢出
        // 添加过外部联系人的内部人员信息
        customerUserInfo: {
          userList: [],
          total: 0,
        },
        lifeCycleTree: [], // 客户生命周期树
        showLifeCycleTree: false, // 展示客户生命周期树
        authorizeUserId: '', // 授权成功后返回的uerId
        twtype: '', // 显示“领取为我的客户”,TW
        poolId: '',
        tuser: true,
        externalUserId: '',
        twstatus: '',
        rules: {},
        recordPage: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        isworkwechat: '',
        pagetype: '',
        // 最关心列表
        listLoading: false, // 列表加载中
        interestedList: [
          // {
          //   id: 1,
          //   createTime: '2020-12-28',
          //   visitQuantity: 15,
          //   name: '如何接地气地接入微前端？如何接地气地接入微前端？',
          //   content: `简介：微前端带来了明显好处的同时，也面临着痛...`,
          // },
        ]
      };
    },
    created() {
      console.log('created=== query》', this.$route.query)
      let {id, tuser, poolId, status, externalUserId, twtype, isworkwechat, pagetype, wxId} = this.$route.query;
      if (tuser) {
        this.tuser = tuser
      }
      if (id) {
        this.customerId = id
        this.poolId = poolId
        this.twstatus = status

        let customerInfo = {
          customerId: id,   // 客户线索id
          wxCustomerId: wxId || '', //群聊的id
          twtype: twtype || ''
        }
        sessionStorage.setItem("customerInfo", JSON.stringify(customerInfo))
      }
      this.initData()
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      onRefresh() {
        this.initData()
      },
      initData() {
        let customerInfo = sessionStorage.getItem("customerInfo")
        if (customerInfo) {
          let obj = JSON.parse(customerInfo)
          console.log('返回对象', obj)
          this.customerId = obj.customerId
          this.getCustomerDetail();
          this.recordPage.pageNum = 1
          this.recordList = []
          this.getCustomerFollowRecordPage();
        }
      },
      // 获取客户线索详情
      getCustomerDetail() {
        this.$http.getScrmClueCustomerClueGet({ id: this.customerId }).then((res) => {
          // 客户资料详情
        // this.$http.scrmClueCustomerProfileGet({ customerClueId: this.customerId }).then((res) => {
          this.isPullRefresh = false;
          this.customerModel = res.data.data;
        }).catch(() => this.isPullRefresh = false)
      },
      // 获取客户扩展信息
      getCustomerSelectedTags() {
        let id = this.customerId;
        let url = ''
        if (this.isworkwechat == 'not') {
          url = 'acquireTagsnotCorporate'
        } else {
          url = 'getCustomerTagList'
        }
        this.$http[url]({
          id
        }).then((res) => {
          // this.$http.getCustomerTagList({ id }).then((res) => {
          let personalTags = res.data.data.personalTagList;
          let cropTags = res.data.data.cropTagList;
          let newList = [];
          cropTags.forEach((item) => {
            item.tagList.forEach((obj) => {
              if (obj.isCheck) {
                newList.push(obj.name);
              }
            });
          });
          personalTags.forEach((item) => {
            if (item.isCheck) {
              newList.push(item.name);
            }
          });
          this.customerTags = newList;
        });
      },
      // 添加跟进记录
      addRecord() {
        if (this.recordContent === "") {
          Notify({
            type: "warning",
            message: "内容不能为空"
          });
        } else if (this.recordContent.length > 100) {
          Notify({
            type: "warning",
            message: "已超出字数"
          });
        } else {
          let params = {
            content: this.recordContent,
            customerClueId: this.customerId, // 客户线索Id
          };
          this.$http.scrmClueCustomerFollowAdd(params).then(() => {
            Notify({
              type: "success",
              message: "添加成功"
            });
            this.recordContent = "";
            this.recordPage.pageNum = 1
            this.recordList = []
            this.getCustomerFollowRecordPage();
          });
        }
      },
      // 删除跟进记录
      deleteRecordSteps(id) {
        Dialog.confirm({
            message: "确定永久删除该条跟进记录吗？",
            confirmButtonColor: "#3973CA"
          })
          .then(() => {
            this.$http.scrmClueCustomerFollowDelete({
              id
            }).then((res) => {
              this.recordPage.pageNum = 1
              this.recordList = []
              this.getCustomerFollowRecordPage();
              Notify({
                type: "success",
                message: "删除成功"
              });
            });
          })
          .catch(() => {});
      },
      // 修改跟进记录列表
      updateRecordSteps(item) {
        this.updateFlag = true;
        this.updateId = item.id;
        this.updateValue = item.content;
        console.log(item);
      },
      // 修改跟进记录
      updateFlagFun() {
        let options = {
          id: this.updateId,
          content: this.updateValue,
        };
        console.log(options);
        this.$http.scrmClueCustomerFollowUpdate(options).then((res) => {
          this.recordPage.pageNum = 1
          this.recordList = []
          this.getCustomerFollowRecordPage();
          Notify({
            type: "success",
            message: "修改成功"
          });
        });
      },
      // 获取跟进记录
      getCustomerFollowRecordPage() {
        if (this.recordPage.pageNum == 1) {
          recordLatestDate = ''
        }
        let url;
        if (this.tabActive === "manul-record") {
          // 跟进记录
          url = 'scrmClueCustomerFollowPage'
        } else if (this.tabActive === "dynamic-record") {
          // 动态记录
          url = 'scrmClueCustomerActionPage'
        }
        let params = {
          pageNum: this.recordPage.pageNum,
          pageSize: this.recordPage.pageSize,
          customerClueId: this.customerId, // 客户线索ID
        };
        if (!url) return false;
        this.listLoading = true
        console.log(11111111)
        this.$http[url](params).then((res) => {
          this.listLoading = false
          this.recordPage.total = res.data.data.total
          let list = res.data.data.list;
          list.forEach(item => {
            item.formatterTime = this.formatterTime(item.createTime)
            this.recordList.push(item)
          })
        }).catch(() => this.listLoading = false)
      },
      // 获取更多跟进记录
      loadMoreRecord() {
        this.recordPage.pageNum++
        this.getCustomerFollowRecordPage()
        console.log('加载更多记录')
      },
      // 时间问题，ios不支持格式（2020-09-01），需先替换成（2020/09/01）
      formatTimeMonth(time) {
        let date = new Date(time.replace(/\-/g, "/"));
        // console.log('返回' + time.replace(/\-/g, '/'))
        return `${
        date.getMonth() + 1 <= 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}`;
      },
      formatTimeHours(time) {
        let date = new Date(time.replace(/\-/g, "/"));
        return `${
        date.getHours() <= 9 ? "0" + date.getHours() : date.getHours()
      }:${
        date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()
      }:${
        date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds()
      }`;
      },
      // 转到客户编辑页面
      goToEditPage() {
        this.$router.push('/scrmClue/customerClue/editCustomer?id='+this.customerId)
        // this.$router.push(
        //   `/sidebar-dev/customerForm?id=${this.customerId}&wxId=${this.wxId}&isworkwechat=${this.isworkwechat}`
        // );
      },
      tabChange(item) {
        this.tabActive = item.value;
        if (['dynamic-record', 'manul-record'].includes(item.value) === "dynamic-record") {
          this.recordPage.pageNum = 1
          this.recordList = []
          this.getCustomerFollowRecordPage();
        } else if (item.value === "order-record") {
          this.orderPage.pageNum = 1
          this.orderList = []
          this.getCustomerOrderRecordPage();
        } else if (item.value === "most-interested") {
          this.interestedList = []
          this.getScrmClueCustomerInterestedList();
        }
      },
      // 跳转推文详情
      toArticleDetail(id) {
        this.$router.push('/scrmClue/article/detail?id='+id || '')
      },
      // 获取最关心列表
      getScrmClueCustomerInterestedList() {
        // 此接口不是分页的，虽然结构是分页的，但后端会全部返回
        this.listLoading = true
        this.$http.getScrmClueCustomerInterestedPage({customerClueId: this.customerId,}).then((res) => {
          this.listLoading = false
          let list = res.data.data.list
          list.forEach(item => {
            this.interestedList.push(item)
            // 因为列表页面上只会显示3行内容，这里处理一下大概只截取120个字符就够了
            if (item.content) {
              item.content = item.content.slice(0, 120)
            }
          })
          this.interestedList = list
        })
        .catch(() => this.listLoading = false)
      },
      // 获取客户订单记录
      getCustomerOrderRecordPage() {
        let params = {
          pageNum: this.orderPage.pageNum,
          pageSize: this.orderPage.pageSize,
          // keyword: this.orderPage.keyword,
          customerId: this.customerModel.id,
        };
        this.listLoading = true
        this.$http.getCropOrderPage(params).then((res) => {
          this.listLoading = false
          let list = res.data.data.list
          list.forEach(item => {
            this.orderList.push(item)
          })
          // this.orderList = res.data.data.list;
          this.orderPage.total = res.data.data.total;
          console.log('列表长度' + this.orderList.length + '总数' + this.orderPage.total)
        }).catch(() => this.listLoading = false)
      },
      // 清空订单搜索内容
      clearCustomerOrderRecordPage() {
        this.orderPage.keyword = "";
        this.getCustomerOrderRecordPage();
      },
      // 订单记录-绑定客户信息提示框
      showBindingNotify() {
        this.memberNames = "";
        this.bindingNotifyShow = true;
      },
      // 获取更多订单信息
      loadMoreOrder() {
        this.orderPage.pageNum++
        this.getCustomerOrderRecordPage()
        console.log('加载更多')
      },
      goBack() {
        this.$router.back();
        // console.log('返回')
      },
      // 跟进、动态记录左边的时间格式
      formatterTime(time) {
        let newStr = time.slice(0, time.length - 9)
        if (recordLatestDate === newStr) {
          return ''
        } else {
          let result = this.getFormatterTime(time)
          recordLatestDate = newStr
          return result
        }
      },
      getFormatterTime(time) {
        let result = ''
        let date = new Date(time.replace(/\-/g, '/'))
        let now = new Date()
        let pubilshTime = parseInt(date.getTime() / 1000)
        let nowTime = parseInt(now.getTime() / 1000)
        let d = nowTime - pubilshTime
        // let d_days = parseInt(d / 86400)
        let d_days = parseInt(parseInt(nowTime / 86400) - parseInt(pubilshTime / 86400))
        let d_hours = parseInt(d / 3600)
        let d_minutes = parseInt(d / 60)
        let d_seconds = parseInt(d)
        // console.log('天数' + d_days + '-' + nowTime + '-' + pubilshTime)
        if (d_days <= 0) {
          // if (d_seconds < 60) {
          //   result = '刚刚'
          // } else if (d_hours <= 0 && d_minutes > 0) {
          //   result = d_minutes + '分钟前'
          // } else {
          //   result = '今天' + date.getHours() + '点'
          // }
          result = '<span class="time-strong">今天</span>'
        } else if (d_days > 0 && d_days < 2) {
          // result = '昨天' + date.getHours() + '点'
          result = '<span class="time-strong">昨天</span>'
        } else {
          // result = (date.getMonth() + 1) + '月' + date.getDate() + '日'
          result = '<span class="time-bold">' + `${date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()}` +
            '</span><span class="time-normal">' +
            `${(date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) + '月' : (date.getMonth() + 1) + '月'}` +
            '</span>'
        }
        return result
      },
      // 扩展信息-图片预览
      externalImagePreview(images, startPosition) {
        console.log('图片预览', images, startPosition)
        let list = []
        images.forEach(item => {
          list.push(`${this.imgHost}${item}`)
        })
        ImagePreview({
          images: list,
          startPosition: startPosition,
          closeable: true,
        });
      }
    },
    filters: {
      statusName(val) {
        if (val === '') return ''
        switch (val) {
          case -2:
            return '已退款'
          case -1:
            return '已取消'
          case 0:
            return '待支付'
          case 1:
            return '待发货'
          case 2:
            return '已发货'
          case 3:
            return '已收货'
          case 4:
            return '退货中'
          case 5:
            return '换货中'
          case 6:
            return '退款中'
          case 10:
            return '已完成'
        }
      },
      statusColor(val) {
        if (val === '') return ''
        switch (val) {
          case -2:
            return 'color: #E53935'
          case -1:
            return 'color: #E53935'
          case 0:
            return 'color: #ff9c00'
          case 1:
            return 'color: #ff9c00'
          case 2:
            return 'color: #ff9c00'
          case 3:
            return 'color: #4caf50'
          case 4:
            return 'color: #ff9c00'
          case 5:
            return 'color: #ff9c00'
          case 6:
            return 'color: #ff9c00'
          case 10:
            return 'color: #999999'
        }
      },
      toPriceYuan(val) {
        if (val === '' || val === undefined || val === null || val === 0) return '0.00'
        return (val / 100).toFixed(2)
      }
    },
  };
</script>

<style lang="less" scoped>
  .customer-info {
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

    .placeholder-el {
      height: 46px;
    }

    .single-chat {
      .customer-content {

        // background-color: #e8edf3;
        .base-info {
          position: relative;
          padding: 20px 15px 15px;
          box-sizing: border-box;
          border-radius: 3px;
          // background-color: rgba(142, 187, 229, 9%);
          background-color: #F7F9FF;

          .summary {
            display: flex;
            justify-content: space-between;
            // margin-bottom: 12px;

            .summary-left {
              display: flex;

              .cust-avatar {
                flex-shrink: 0;
                width: 50px;
                height: 50px;
                margin-right: 10px;
                border-radius: 50%;
                box-sizing: border-box;
              }

              .cust-cont {
                .cust-name {
                  margin-bottom: 5px;
                  font-weight: bold;
                  color: #222222;
                  font-size: 16px;

                  .type-name {
                    font-size: 13px;
                    font-weight: bold;
                    color: #2eab42;
                    margin-left: 5px;
                  }

                  .sync-btn {
                    color: rgb(5, 80, 177);
                    background: rgba(5, 80, 177, 0.2);
                    border-radius: 5px;
                    padding: 2px 8px;
                    font-size: 12px;
                    margin-left: 10px;
                  }
                }

                .cust-company {
                  min-height: 22px;
                  font-size: 14px;
                  color: #9f9e9e;
                }

                .cust-info {
                  display: flex;
                  align-items: center;
                  .sex-icon {
                    font-size: 24px;
                    margin-right: 8px;
                  }

                  .sex-span {
                    font-size: 10px;
                    background-color: #3671c9;
                    color: #ffffff;
                    border-radius: 3px;
                    margin-right: 8px;
                    padding: 0 4px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                  }

                  .drop-down-menu {
                    max-width: 230px;

                    // margin-left: 8px;
                    .no-menu-data {
                      height: 24px;
                      background-color: #8ebbe5;
                      // border: 1px solid #8ebbe5;
                      border-radius: 3px;
                      color: #ffffff;
                      display: flex;
                      align-items: center;
                      padding: 0 5px;
                      cursor: pointer;

                      .menu-title {
                        font-size: 12px;
                        // font-weight: bold;
                        color: #ffffff;
                        margin-right: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                    }

                    ::v-deep .van-dropdown-item__content {
                      width: 150px;
                      left: 108px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
                        0 0 6px rgba(0, 0, 0, 0.04);
                      max-height: 200px;
                      overflow-y: auto;

                      .van-dropdown-item__option {
                        padding: 5px 10px;
                        border-bottom: none;
                      }
                    }
                  }
                }
                .follow-status-wrap {
                  width: 60px;
                  height: 22px;
                  overflow: hidden;
                }
                .follow-status {
                  // width: 60px;
                  // height: 22px;
                  // line-height: 23px;
                  // font-size: 12px;
                  color: #fff;
                  vertical-align: middle;
                  text-align: center;
                  background: #FFBB96;
                  font-size: 24px;
                  width: 120px;
                  height: 44px;
                  line-height: 44px;
                  border-radius: 4px;
                  transform: scale(0.5) translate(-50%, -50%);
                }
              }
            }

            .summary-right {
              .edit-btn {
                position: absolute;
                top: 20px;
                right: 0;
                width: 95px;
                height: 28px;
                line-height: 28px;
                font-size: 13px;
                cursor: pointer;
                color: #FFFFFF;
                text-align: center;
                border-radius: 14px 0px 0px 14px;
                background: linear-gradient(90deg, #508AE1 0%, #3954CA 100%);
                span {
                  vertical-align: middle;
                }
                .edit-icon {
                  font-size: 12px;
                  margin-right: 3px;
                  vertical-align: middle;
                }
              }
            }
          }

          .detail {
            .detail-wrapper {
              margin-left: 60px;
              max-height: 214px;
              overflow: hidden;

              &.active {
                max-height: unset;
              }

              .detail-qty {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                & > div {
                  height: 30px;
                  line-height: 30px;
                  color: #9DA2AA;
                  font-size: 12px;
                  vertical-align: middle;
                  position: relative;

                  ::v-deep .v-font, .van-icon {
                    font-size: var(--font-xs);
                  }
                  ::v-deep .van-icon {
                    font-size: var(--font-xs);
                    vertical-align: -15%;
                  }
                }
                // ::v-deep .van-icon {
                //   color: inherit;
                //   font-size: inherit;
                //   vertical-align: inherit;
                // }
              }
              
              .info-item {
                display: flex;
                color: #222222;
                margin-bottom: 10px;
                line-height: 18px;
                font-size: 14px;

                .item-left {
                  display: flex;
                  flex: 1;
                  .item-label {
                    color: #9da2ab;
                    flex-shrink: 0;
                    padding-right: 10px;
                    // width: 70px;
                  }
                }

                .item-right {
                  width: 120px;
                  display: flex;

                  .item-label {
                    color: #9da2ab;
                    flex-shrink: 0;
                    width: 70px;
                  }
                }
              }

              .info-divider {
                width: 100%;
                height: 1px;
                background-color: #dcdee0;
                margin-bottom: 10px;
              }

              // .cust-extend {
              //   display: flex;
              //   flex-direction: column;
              .info-item-extend {
                display: flex;

                // color: #222222;
                // margin-bottom: 10px;
                // line-height: 18px;
                // .item-label {
                //   color: #9da2ab;
                //   flex-shrink: 0;
                //   margin-right: 10px;
                // }
                .info-item-extend-content {
                  display: flex;
                  margin-bottom: 10px;
                  color: #222222;
                  line-height: 18px;

                  .item-label {
                    width: 70px;
                    color: #9da2ab;
                    flex-shrink: 0;
                  }
                }
              }

              // }
            }

            .expend-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #b0b4ba;
              margin-top: 5px;
              cursor: pointer;

              .btn-icon {
                margin-left: 10px;
              }
            }
          }
        }

        .tags-info {
          // padding: 18px 12px;
          box-sizing: border-box;
          margin-top: 12px;
          background-color: #ffffff;

          .tags-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;

            .edit-icon {
              font-size: 20px;
              cursor: pointer;
            }
          }

          .tags-list {
            display: flex;
            flex-flow: wrap;
            padding: 10px 20px 0;
            border-top: 1px solid #e8eaf0;

            .tag-item {
              display: flex;
              align-items: center;
              color: #4f73ad;
              padding: 6px 10px;
              background-color: #e8f1fa;
              border-radius: 3px;
              margin: 0 5px 10px 0;
            }

            .tag-item-mobile {
              color: #4f73ad;
              padding: 3px 10px 0 10px;
              background-color: #e8f1fa;
              border-radius: 3px;
              margin: 0 5px 10px 0;
              height: 27px;
              line-height: 27px;
            }
          }
        }
      }

      .customer_btn {

        // 所属员工
        .customer_content {
          display: flex;

          .customer_people {
            // margin-left: auto;
            display: flex;
            flex: 1;
            color: #969799;

            .customer_img_three {
              display: flex;
              align-items: center;
              margin-right: auto;
              padding: 0 10px;
              position: relative;
              width: 54px;

              .cust_img {
                width: 24px;
                height: 24px;
              }

              .van-image {
                position: absolute;
                top: 0;

                &:nth-child(2) {
                  left: 26px;
                }

                &:nth-child(3) {
                  position: relative;
                  top: 0;
                  left: 32px;
                }
              }
            }
          }

          .line {
            margin: 0 10px;
            font-size: 12px;
            color: #969799;
            position: relative;
            left: 0;
            top: -2px;
          }

          .customer_group {
            color: #969799;
          }
        }
      }
    }

    .extend-content {
      .tabbar {
        position: relative;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        background: #F6F6F6;
        border-bottom: 2px solid #F6F6F6;

        .tab-item {
          flex: 1;
          padding: 0 10px;
          max-width: 60px;
          margin-bottom: -2px;
          height: 45px;
          line-height: 45px;;
          color: #222;
          font-size: 15px;
          cursor: pointer;
          text-align: center;
        }
        .tab-active {
          position: relative;
          color: var(--blank-color);
          &:after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 2px;
            width: 20px;
            height: 3px;
            border-radius: 4px;
            background: #FAC05B;
            transform: translateX(-50%);
          }
        }
      }

      .dynamic-record {
        padding: 20px 12px;
        box-sizing: border-box;
        background-color: #ffffff;

        .title-bar {
          display: flex;
          // align-items: center;
          font-size: 13px;
          font-weight: bold;
          color: #222222;
          margin-bottom: 12px;
          height: 16px;
          line-height: 16px;

          .bar-tag {
            width: 4px;
            height: 12px;
            border-radius: 2px;
            background-color: #3672ca;
            margin-right: 8px;
          }
        }

        .title-bar::before {
          content: "";
          width: 4px;
          height: 16px;
          border-radius: 2px;
          background-color: #3672ca;
          margin-right: 8px;
        }

        .record-add {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          height: 40px;
          border-radius: 20px;
          background: #F6F6F6;
          input {
            flex: 1;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
            border: unset;
            border-radius: 20px;
            box-sizing: border-box;
            background-color: #f7f8fa;
          }

          .add-btn {
            // width: 56px;
            // height: 34px;
            // line-height: 34px;
            // text-align: center;
            // color: #ffffff;
            // background-color: #4f73ad;
            // border-radius: 4px;
            // cursor: pointer;
            // margin-left: 6px;
            width: 67px;
            height: 40px;
            font-size: 15px;
            color: #fff;
            line-height: 40px;
            text-align: center;
            background: #3974CB;
            border-radius: 0px 20px 20px 0px;
          }

          // .add-btn-mobile {
          //   width: 56px;
          //   height: 34px;
          //   line-height: 34px;
          //   text-align: center;
          //   color: #ffffff;
          //   background-color: #4f73ad;
          //   border-radius: 4px;
          //   cursor: pointer;
          //   margin-left: 6px;
          //   padding-top: 2px;
          //   box-sizing: border-box;
          // }
        }

        .record-steps {
          .step-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: -3px;
            margin-bottom: 5px;
          }

          .step-info {
            color: #000000;
            margin-bottom: 10px;

            .info-name {
              color: #4f73ad;
            }
          }

          .step-message {
            line-height: 20px;
            color: #000000;
            background: #f7f8fa;
            border-radius: 4px;
            padding: 8px 10px;
          }

          .step-time {
            position: absolute;
            top: 10px;
            left: -80px;
            font-size: 13px;
            // font-weight: bold;
            color: #000000;

            .time-hours {
              font-size: 12px;
              color: #9ea2aa;
            }
          }

          .step_btns {
            display: flex;
            .btn {
              margin-left: 5px;
              width: 50px;
              height: 25px;
              line-height: 26px;
              text-align: center;
              font-size: 12px;
              color: var(--theme-color);
              border-radius: 2px;
              background: #F1F8FE;
            }
            // .small-btn {
            //   width: 46px;
            //   height: 24px;
            //   line-height: 24px;
            //   text-align: center;
            //   color: #4f73ad;
            //   background-color: #e8f1fa;
            //   border-radius: 4px;
            //   cursor: pointer;
            //   font-size: 12px;
            // }

            // .small-btn-mobile {
            //   width: 46px;
            //   height: 24px;
            //   line-height: 24px;
            //   text-align: center;
            //   color: #4f73ad;
            //   background-color: #e8f1fa;
            //   border-radius: 4px;
            //   cursor: pointer;
            //   padding-top: 1px;
            //   box-sizing: border-box;
            //   font-size: 12px;
            // }

            // .left-btn {
            //   margin-right: 5px;
            // }
          }

          .van-step--vertical {
            padding-right: 0;
          }
        }

        .dynamic-steps {
          .step-top {
            margin-top: 0;
            margin-bottom: 10px;
          }

          .van-step--vertical {
            padding-right: 0px;
          }
        }
      }

      .order-record {
        .record-search {
          padding: 12px 0;
          box-sizing: border-box;
          background-color: #ffffff;

          input {
            height: 34px;
            padding: 0 10px;
            background-color: #f7f8fa;
            border: unset;
            box-sizing: border-box;
            flex: 1;
            margin-right: 10px;
          }

          .search-name {
            color: #294a7b;
            cursor: pointer;
          }

          .search-icon {
            font-size: 24px;
            color: #9f9e9e;
            cursor: pointer;
          }

          .clear-icon {
            cursor: pointer;
          }
        }

        .record-content {
          .order-binding {
            text-align: center;
            height: 100%;
            padding: 50px 0;

            .binding-tips {
              color: #aaaaaa;
              margin-bottom: 10px;
            }

            .binding-btn {
              color: #4f73ad;
              cursor: pointer;
            }
          }

          .record-list {
            .order-detail {
              background-color: #ffffff;
              margin-top: 10px;

              .order-header {
                padding: 0 12px;
                box-sizing: border-box;
                border-bottom: 1px solid #ebedf0;

                .order-content {
                  border-bottom: 1px solid #ebedf0;

                  .order-title {
                    padding: 15px 0;
                    line-height: 18px;
                  }

                  .order-amount {
                    display: flex;
                    align-items: center;
                    flex-direction: row-reverse;
                    margin-bottom: 15px;
                    color: #aaaaaa;

                    span {
                      color: #222222;
                    }
                  }
                }

                .order-price {
                  display: flex;
                  justify-content: space-between;
                  padding: 15px 0;
                  color: #aaaaaa;

                  span {
                    color: #222222;
                  }
                }
              }

              .order-info {
                padding: 12px 15px;
                box-sizing: border-box;
                line-height: 18px;
                font-size: 12px;

                .order-info-item {
                  display: flex;
                  color: #aaaaaa;
                  margin-bottom: 5px;
                  justify-content: space-between;

                  .order-label {
                    flex-shrink: 0;
                  }

                  .order-msg {
                    // color: #222222;
                  }
                }
              }
            }

            .order-item {
              background: #fff;
              margin-top: 12px;

              .item-top {
                padding: 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                // flex-direction: row-reverse;
                border-bottom: 1px solid #ebedf0;
              }

              .t-numb {
                // color: #aaa;
              }

              .item-content {
                padding: 0 12px;
                border-bottom: 1px solid #ebedf0;

                .c-msg {
                  padding: 12px 0;
                  line-height: 18px;
                }

                .c-amount {
                  color: #ff6000;
                }

                .c-price {
                  text-align: right;
                  margin-bottom: 12px;
                }

                .sign {
                  font-size: 12px;
                }

                .price {
                  font-weight: bold;
                }
              }

              .item-bottom {
                padding: 12px;
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #aaa;
              }
            }

            .order-list-tips {
              color: #9f9e9e;
              text-align: center;
              padding: 12px 0;
            }

            .load-more {
              font-size: 14px;
              color: #9f9e9e;
              text-align: center;
              padding: 12px 0 24px 0;
            }
          }
        }
      }

      .most-interested {
        .record-list {
          margin: 0 15px;
          .interested-item {
            padding: 15px;
            margin-top: 15px;
            border-radius: 4px;
            background: #FFFFFF;
            box-shadow: 0px 1px 3px 0px rgba(224, 224, 224, 0.8);
            .item-top {
              min-height: 20px;
              font-size: 16px;
              font-weight: bold;
              color: #222222;
              // background: red;
              .name {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
            .item-content {
              margin-top: 10px;
              overflow: hidden;
              & > div {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                font-size: 14px;
                color: #58585A;
                line-height: 1.6;
              }
            }
            .item-bottom {
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #A9A9A9;
              margin-top: 10px;
              font-size: 12px;
              ::v-deep .v-font, .van-icon {
                font-size: 12px;
              }
            }
          }
          .order-list-tips {
            color: #9f9e9e;
            text-align: center;
            padding: 12px 0;
          }

          .load-more {
            font-size: 14px;
            color: #9f9e9e;
            text-align: center;
            padding: 12px 0 24px 0;
          }
        } 
      }
    }
  }

  .binding-notify {
    padding: 12px;

    .notify-tips {
      text-align: center;
      margin-bottom: 12px;
      line-height: 18px;
    }
  }

  .no-match-notify {
    .notify-tips {
      padding: 40px 0;
      text-align: center;
      line-height: 18px;
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

  /deep/ .van-steps--vertical {
    padding: 0 0 0 80px;
  }

  /deep/ .van-step--vertical {
    padding-bottom: 16px;
  }

  /deep/ .van-step--vertical:not(:last-child)::after {
    border-bottom-width: 0;
  }

  // PX 强制不转换rem格式
  /deep/ .van-step__circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #4f73ad;
  }

  /deep/ .van-dropdown-menu__bar {
    height: 24px;
    // border: 1px solid #57ABF0;
    box-shadow: unset;
    border-radius: 3px;
    background-color: #8ebbe5;
  }

  // /deep/ .van-ellipsis {
  //   // font-size: 10px;
  //   font-size: 13px;
  //   margin-right: 8px;
  //   color: #ffffff;
  // }
  /deep/ .van-dropdown-menu__title::after {
    right: 5px;
    border: 3px solid;
    border-color: transparent transparent #ffffff #ffffff;
  }

  /deep/ .van-nav-bar .van-icon {
    color: #4f73ad;
  }

  /deep/ .van-nav-bar {
    z-index: 99;
  }

  /deep/ .van-nav-bar__text {
    color: #4f73ad;
  }

  // 新样式-佛欲
  .groupBaseInfo {
    .groupMemberNumber {
      width: 100%;
      height: 80px;
      background-color: #f0f4f8;
      margin-top: 10px;

      ul {
        width: 100%;
        display: flex;

        li {
          width: 25%;
          height: 80px;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          align-content: center;

          .num {
            width: 100%;
            font-size: 20px;
            font-weight: bold;
          }

          .tit {
            width: 100%;
            font-size: 14px;
            color: #262626;
          }
        }
      }
    }

    .groupTimeSex {
      width: 100%;
      height: 80px;
      margin-top: 10px;
      background-color: #ffffff;
      padding: 20px;
      box-sizing: border-box;

      .createTime,
      .memberSex {
        height: 30px;
        line-height: 10px;

        .tit {
          color: #929292;
          font-size: 14px;
        }

        .sex {
          margin-right: 20px;
        }

        .male {
          i {
            color: #04baff;
          }
        }

        .female {
          i {
            color: #ff6e85;
          }
        }

        .unknown {
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 3px;
            color: #ffffff;
            background-color: #cccccc;
            font-size: 10px;
            text-align: center;
            line-height: 16px;
            font-style: normal;
            position: relative;
            left: 0;
            top: -2px;
          }
        }
      }
    }
  }

  .groupListNav {
    margin-top: 10px;

    .vanCellContent {
      display: flex;
      justify-content: space-between;

      .right {
        color: #2958a3;
      }
    }
  }

  .groupListContent {
    .groupMember {
      padding: 10px 20px 0;
      background-color: #ffffff;
      display: flex;

      .userAvatar {
        padding-bottom: 10px;
        border-radius: 3px;
      }

      .userInfo {
        flex: 1;
        border-bottom: 3px solid #f9f9f9;
        padding-bottom: 7px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        padding-left: 20px;

        span {
          color: #ed9c3b;
        }
      }
    }

    .listTitle {
      padding: 10px 20px;
      background-color: #ffffff;
      font-size: 14px;
      margin-bottom: 0px;
    }
  }

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  // by-wu
  .record-no-more {
    font-size: 12px;
    color: #9f9e9e;
    text-align: center;
    margin-top: 20px;
  }

  .record-load-more {
    font-size: 14px;
    color: #9f9e9e;
    text-align: center;
    padding: 12px 0 24px 0;
  }

  .fixed-box {
    display: flex;
    padding: 12px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 55;

    .btn {
      width: 100%;
      margin: 0 10px;
      padding: 10px 0;
      background: #4f73ad;
      border-radius: 5px;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
    }
  }

  .beshare {
    color: red;
    background: rgba(248, 96, 96, 0.3);
    border-radius: 5px;
    padding: 2px 8px;
    font-size: 12px;
    margin-left: 10px;
    font-weight: normal;
  }

  .receive {
    color: rgb(5, 80, 177);
    background: rgba(5, 80, 177, 0.2);
    border-radius: 5px;
    padding: 2px 8px;
    font-size: 12px;
    margin-left: 10px;
    font-weight: normal;
  }

  /deep/ .time-bold {
    font-size: 26px;
    margin-right: 0px;
  }

  /deep/ .time-normal {
    font-size: 12px;
  }

  /deep/ .time-strong {
    font-size: 26px;
  }

  /deep/ .van-button--small {
    height: 26px;
  }

  /deep/ .van-step__circle-container {
    left: -12px;
  }

  /deep/ .van-step__line {
    left: -12px;
  }

  .external-item {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    margin-bottom: 10px;

    .item-left {
      width: 70px;
      flex-shrink: 0;
      padding: 0 15px 0 0;
      box-sizing: border-box;
      color: #9da2ab;
    }

    .item-right {
      flex: 1;
      padding: 0 18px 0 0;
      display: flex;
      box-sizing: border-box;
      width: 100px;

      .img {
        width: 80px;
        height: 80px;
        border-radius: 6px;
        margin-right: 10px;
        overflow: hidden;
      }
    }

    .right-pc {
      padding: 0;
      position: relative;

      .right-pc-wrapper {
        display: flex;
        margin-right: 20px;
        overflow: hidden;
      }

      .float-btn {
        position: absolute;
        top: 0;
        right: 0px;
        width: 40px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: #000000;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          background: #fff;

          .arrow-icon {
            font-size: 12px;
            font-weight: bold;
            margin: 9px;
          }
        }
      }
    }
  }

  /deep/ .v-hl-svg {
    width: 30px !important;
    height: 30px !important;
  }

  .wrappercopy {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .blockcopy {
    width: 220px;
    // height: 120px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
</style>