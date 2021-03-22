<template>
  <div class="customer-info">
    <van-pull-refresh v-model="isPullRefresh" @refresh="onRefresh">
      <van-nav-bar :left-arrow="true" left-text="返回" :fixed="true" @click-left="goBack">
        <template #left>
          <div class="left-arrow">
            <van-icon name="arrow-left" :class="isMobile ? 'left-arrow-icon-mobile' : 'left-arrow-icon'" />返回
          </div>
        </template>
      </van-nav-bar>
      <div class="placeholder-el"></div>
      <!-- 单聊 -->
      <div class="single-chat">
        <div class="customer-content">
          <div class="base-info">
            <div class="summary">
              <div class="summary-left">
                <img v-if="isworkwechat!='not'" class="cust-avatar" :src="customerModel.avatar" alt="" />
                <div class="cust-cont">
                  <div class="cust-name">
                    {{ customerModel.name}}
                    <span class="type-name"
                      v-if="customerModel.typeName&&customerModel.typeName != ''">@{{ customerModel.typeName }}</span>
                    <span class='beshare' v-if="twstatus=='recyclingSoon'">即将共享</span>
                    <span class='receive' v-if="twstatus=='receiving'">领取中</span>
                    <span class='receive' v-if="twstatus=='reclaimed'">待领取</span>
                    <span class='receive' v-if="twstatus=='unable_to_assign'">退回公海池</span>
                    <!-- <span class="sync-btn" @click="refreshData()">同步数据</span> -->
                  </div>
                  <div class="cust-company">{{ customerModel.corpFullName }}</div>
                  <div class="cust-info" v-if="isworkwechat!='not'">
                    <!-- 1男，2女，0未知 -->
                    <span class="sex-span" v-if="customerModel.gender === 0">未知</span>
                    <i class="iconfont icon-nanxing sex-icon" style="color: #3671c9"
                      v-if="customerModel.gender === 1"></i>
                    <i class="iconfont icon-nvxing sex-icon" style="color: #ed4e9f"
                      v-if="customerModel.gender === 2"></i>
                    <!-- <div class="drop-down-menu">
                    <van-dropdown-menu
                      v-if="lifeCycleOptions.length > 0"
                      :overlay="false"
                      :close-on-click-outside="true"
                      :close-on-click-overlay="true"
                    >
                      <van-dropdown-item
                        :title="lifeCycleStage"
                        :options="lifeCycleOptions"
                        @change="optionChange"
                      />
                    </van-dropdown-menu>
                    <div class="no-menu-data" v-else @click="showMenuTips">
                      <div class="menu-title">{{ lifeCycleStage }}</div>
                      <van-icon name="arrow-down" />
                    </div>
                  </div> -->
                    <!-- 客户生命周期 -->
                    <div class="drop-down-menu" v-if="tuser==true">
                      <div class="no-menu-data" @click="showLifeCycleTreePopup">
                        <div class="menu-title" v-if="lifeCycleCategory">{{ lifeCycleCategory }} - {{ lifeCycleStage }}
                        </div>
                        <div class="menu-title" v-else>{{ lifeCycleStage }}</div>
                        <van-icon name="arrow-down" />
                      </div>
                    </div>
                    <div class="drop-down-menu" v-else>
                      <div class="no-menu-data">
                        <div class="menu-title" v-if="lifeCycleCategory">{{ lifeCycleCategory }} - {{ lifeCycleStage }}
                        </div>
                        <div class="menu-title" v-else>{{ lifeCycleStage }}</div>
                        <!-- <van-icon name="arrow-down" /> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="summary-right" v-if="tuser==true">
                <div class="edit-btn" @click="goToCustomerPage">
                  <van-icon name="edit" class="edit-icon" />
                </div>
              </div>
            </div>
            <div class="detail">
              <div class="detail-wrapper" :class="isExpendDetail ? 'active' : ''">
                <div ref="detail_wrapper_content">
                  <div class="info-item" v-if="customerModel.remarks">
                    <div class="item-left">
                      <div class="item-label">备注名</div>
                      <div class="item-desc">{{ customerModel.remarks }}</div>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.corpFullName">
                    <div class="item-left">
                      <div class="item-label">企业</div>
                      <div class="item-desc">
                        {{ customerModel.corpFullName }}
                      </div>
                    </div>
                  </div>
                  <!-- <div class="info-item" v-if="customerModel.position">
                  <div class="item-left">
                    <div class="item-label">职位</div>
                    <div class="item-desc">{{ customerModel.position }}</div>
                  </div>
                </div> -->
                  <div class="info-item" v-if="customerModel.mobile">
                    <div class="item-left">
                      <div class="item-label">电话</div>
                      <div class="item-desc">{{ customerModel.mobile }}</div>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.email">
                    <div class="item-left">
                      <div class="item-label">邮箱</div>
                      <div class="item-desc">{{ customerModel.email }}</div>
                    </div>
                  </div>
                  <!-- 拓展信息 -->
                  <!-- <div
                  class="info-item-extend"
                  v-for="(item, index) in externalProfileList"
                  :key="index"
                >
                  <div v-if="item.value" class="info-item-extend-content">
                    <div class="item-label">{{ item.name }}</div>
                    <div class="item-desc">{{ item.value }}</div>
                  </div>
                </div> -->
                  <div class="info-item-extend" v-for="(item, index) in externalProfileList" :key="index">
                    <div v-if="item.value && item.type !== 'image'" class="info-item-extend-content">
                      <div class="item-label">{{ item.name }}</div>
                      <div class="item-desc">{{ item.value }}</div>
                    </div>
                    <div class="external-item" v-if="item.type === 'image' && item.value.length > 0">
                      <div class="item-left">{{ item.name }}</div>
                      <div class="item-right" v-if="isMobile">
                        <vue-horizontal style="width: 100%">
                          <section v-for="(val, i) in item.value" :key="'image' + i">
                            <div>
                              <van-image class="img" :src="imgHost + val" fit="cover"
                                @click="externalImagePreview(item.value, i)">
                              </van-image>
                            </div>
                          </section>
                        </vue-horizontal>
                      </div>
                      <div class="item-right right-pc" v-else>
                        <div class="right-pc-wrapper">
                          <div v-for="(val, i) in item.value" :key="'image' + i">
                            <van-image class="img" :src="imgHost + val" fit="cover"
                              @click="externalImagePreview(item.value, i)">
                            </van-image>
                          </div>
                          <div class="float-btn" v-if="item.value.length >= 3">
                            <div class="btn-icon" @click="externalImagePreview(item.value, 0)">
                              <van-icon name="arrow" class="arrow-icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.typeName">
                    <div class="item-left">
                      <div class="item-label">类型</div>
                      <div class="item-desc">{{ customerModel.typeName }}</div>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.description">
                    <div class="item-left">
                      <div class="item-label">描述</div>
                      <div class="item-desc">{{ customerModel.description }}</div>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.updateTime">
                    <div class="item-left">
                      <div class="item-label">更新时间</div>
                      <div class="item-desc">
                        {{ customerModel.updateTime | allTableTimefilters }}
                      </div>
                    </div>
                  </div>
                  <div class="info-item" v-if="customerModel.createAtToTime">
                    <div class="item-left">
                      <div class="item-label">添加时间</div>
                      <div class="item-desc">
                        {{ customerModel.createAtToTime | allTableTimefilters }}
                      </div>
                    </div>
                  </div>
                  <!-- 拓展信息 -->
                  <!-- <template v-if="externalProfileList.length > 0">
                <div class="info-divider"></div>
                <div class="cust-extend">
                  <div
                    class="info-item-extend"
                    v-for="(item, index) in externalProfileList"
                    :key="index"
                  >
                    <div class="item-label">{{ item.name }}</div>
                    <div class="item-desc">{{ item.value }}</div>
                  </div>
                </div>
              </template> -->
                </div>
              </div>
              <div v-if="detailWrapperHeight > 214">
                <div class="expend-btn" v-if="isExpendDetail" @click="isExpendDetail = false">
                  收起详情
                  <van-icon name="arrow-up" class="btn-icon" />
                </div>
                <div class="expend-btn" v-else @click="isExpendDetail = true">
                  客户详情
                  <van-icon name="arrow-down" class="btn-icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="customer_btn">
            <van-cell is-link title="所属员工"><template #title>
                <div class="customer_content">
                  <div class="custom_title">所属员工</div>
                  <div class="customer_people" @click="
                    $router.push(
                      '/sidebar/customerDetailsInfo?id=' + customerId+'&isworkwechat='+isworkwechat
                    )
                  ">
                    <div class="customer_img_three">
                      <van-image round v-for="(item, index) in customerUserInfo.userList" :key="index" fit="cover"
                        :src="item.avatar" class="cust_img" />
                      <!-- <van-image
                        round
                        width="24px"
                        height="24px"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                      />
                      <van-image
                        round
                        width="24px"
                        height="24px"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                      /> -->
                    </div>
                    <div class="customer_number">
                      共{{ customerUserInfo.total }}人
                    </div>
                  </div>
                  <div class="line" v-if="isworkwechat!='not'">|</div>
                  <div v-if="isworkwechat!='not'" class="customer_group" @click="
                    $router.push('/sidebar/customerGroupInfo?id=' + wxCustomerId)
                  ">
                    共{{ customerGroupTotal }}个群聊
                  </div>
                </div>
              </template>
            </van-cell>
          </div>
          <div class="tags-info">
            <van-cell v-if="tuser==true" is-link title="客户标签" @click="goToTagPage" />
            <van-cell v-else title="客户标签" />
            <div class="tags-list">
              <!-- 企业标签 -->
              <span :class="isMobile ? 'tag-item-mobile' : 'tag-item'"
                v-for="(item, index) in customerModel.cropTagName" :key="index + 'a'">
                {{ item }}
              </span>
              <!-- 个人标签 -->
              <span :class="isMobile ? 'tag-item-mobile' : 'tag-item'"
                v-for="(item, index) in customerModel.personTagName" :key="index + 'b'">
                {{ item }}
              </span>
              <!-- 行为标签 -->
              <span :class="isMobile ? 'tag-item-mobile' : 'tag-item'"
                v-for="(item, index) in customerModel.behaviorTagName" :key="index + 'c'">
                {{ item }}
              </span>
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
              <input placeholder="添加跟进记录，100字内" maxlength="100" v-model="recordContent" />
              <div :class="isMobile ? 'add-btn-mobile' : 'add-btn'" @click="addRecord">添加</div>
            </div>
            <div class="record-steps">
              <van-steps direction="vertical" :active="-1">
                <van-step v-for="(item, index) in recordList" :key="index">
                  <div class="step-top">
                    <div class="step-hours">
                      {{ formatTimeHours(item.createTime) }}
                    </div>
                    <div class="step_btns" v-if="tuser == true">
                      <div :class="isMobile ? 'small-btn-mobile left-btn' : 'small-btn left-btn'"
                        @click="updateRecordSteps(item)">
                        修改
                      </div>
                      <div :class="isMobile ? 'small-btn-mobile' : 'small-btn'" @click="deleteRecordSteps(item.id)">
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
              <div class="record-no-more" v-if="recordList.length == recordPage.total && recordPage.total > 0">已经到底啦~
              </div>
              <div class="record-load-more" v-else-if="recordList.length != recordPage.total && recordPage.total > 0"
                @click="loadMoreRecord">显示更多</div>
              <!-- 无数据内容 -->
              <van-empty description="暂无数据" v-else>
                <template #image>
                  <img src="../../assets/empty-data.png" />
                </template>
              </van-empty>
            </div>
            <!-- 修改操作 -->
            <van-dialog v-model="updateFlag" show-cancel-button @confirm="updateFlagFun()">
              <div class="dialog_content">
                <van-field v-model="updateValue" label="跟进内容" label-width="70px" placeholder="请输入跟进内容" clearable
                  maxlength="100" />
              </div>
            </van-dialog>
          </div>
          <!-- 动态记录-系统自动添加 -->
          <div class="dynamic-record" v-if="tabActive === 'dynamic-record'">
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
              <div class="record-no-more" v-if="recordList.length == recordPage.total && recordPage.total > 0">已经到底啦~
              </div>
              <div class="record-load-more" v-else-if="recordList.length != recordPage.total && recordPage.total > 0"
                @click="loadMoreRecord">显示更多</div>
              <!-- 无数据内容 -->
              <van-empty description="暂无数据" v-else>
                <template #image>
                  <img src="../../assets/empty-data.png" />
                </template>
              </van-empty>
            </div>
          </div>
          <!-- 订单记录 -->
          <div class="order-record" v-if="tabActive === 'order-record'">
            <div class="record-content">
              <!-- 无数据内容 -->
              <van-empty description="暂无数据" v-if="orderPage.total <= 0">
                <template #image>
                  <img src="../../assets/empty-data.png" />
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
                <div class="order-list-tips" v-if="orderList.length == orderPage.total">已经到底啦~</div>
                <div class="load-more" v-else @click="loadMoreOrder">显示更多</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <dia-loading :loading="isLoading"></dia-loading>
      <!-- 生命周期底部弹窗 -->
      <van-popup v-model="showLifeCycleTree" round position="bottom" :style="{ height: '40%' }">
        <van-picker ref="picker" show-toolbar title="客户生命周期" :columns="lifeCycleTree" value-key="name"
          @confirm="onLifeCycleConfirm" @cancel="onLifeCycleCancel">
        </van-picker>
      </van-popup>
      <template v-if="twtype == 'TW'">
        <div class="placeholder-el"></div>
        <div class="fixed-box">
          <div class="btn" @click.once="DrawForMe">领取为我的客户</div>
        </div>
      </template>
      <template v-if="tuser==true&externalUserId != ''">
        <div class="placeholder-el"></div>
        <div class="fixed-box">
          <div class="btn" @click="enterSession">进入聊天</div>
          <div class="btn" v-if="twstatus=='recyclingSoon'" @click="postPone">延期回收</div>
          <div class="btn" v-if="twstatus=='unable_to_assign'" @click="sendback">退回公海池</div>
        </div>
      </template>
      <template v-if="isworkwechat=='not'&&tuser==true">
        <div class="placeholder-el"></div>
        <div class="fixed-box">
          <div class="btn" @click.stop="copyMobile(customerModel.mobile)">复制</div>
        </div>
      </template>
      <template v-if="isworkwechat=='not'&&tuser!=true&&pagetype=='pond'">
        <div class="placeholder-el"></div>
        <div class="fixed-box">
          <div class="btn" @click.stop="DrawForMe">领取</div>
        </div>
      </template>
    </van-pull-refresh>
    <van-overlay :show="copycontent" @click="copycontent = false">
      <div class="wrappercopy">
        <div class="blockcopy">
          <div>{{copyerr}}</div>
          <!-- <div style="margin-top:20px;">可复制下面电话添加客户好友：</div>
          <div style="margin-top:10px;"  @click.stop="copyMobile(customerModel.mobile)">{{customerModel.mobile}}<div style="display:inline-block;margin-left:30px;color:green">复制</div></div> -->
        </div>
      </div>
    </van-overlay>
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
  import NotifyDialog from "../../components/common/NotifyDialog";
  import DiaLoading from "../../components/common/loading";
  import VueHorizontal from "vue-horizontal";
  let recordLatestDate = ''
  export default {
    components: {
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
      return {
        copyerr: '',
        copycontent: false,
        isPullRefresh: true,
        customerModel: {},
        customerId: "",
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
          pageSize: 15,
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
          pageSize: 99,
          total: 0
        },
        isworkwechat: '',
        pagetype: ''
      };
    },
    created() {
      console.log('获取传参11', this.$route.query)
      if (this.$route.query.tuser) {
        this.tuser = this.$route.query.tuser
      }
      if (this.$route.query.id) {
        this.poolId = this.$route.query.poolId
        this.twstatus = this.$route.query.status
        if (this.twstatus) {
          this.getCycleRule()
        }
        let customerInfo = {}
        if (this.$route.query.externalUserId) {
          this.externalUserId = this.$route.query.externalUserId
          customerInfo = {
            customerId: this.$route.query.id,
            wxCustomerId: this.externalUserId,
            twtype: this.$route.query.twtype || ''
          }
          this.getWxJsJdkConfig()
        } else {
          if (this.$route.query.isworkwechat && this.$route.query.isworkwechat == 'not') {
            this.isworkwechat = this.$route.query.isworkwechat
            this.pagetype = this.$route.query.pagetype
            customerInfo = {
              customerId: this.$route.query.id, //详情id
              wxCustomerId: '', //获取群聊的id
              twtype: ''
            }
          } else {
            customerInfo = {
              customerId: this.$route.query.id,
              wxCustomerId: this.$route.query.wxId,
              twtype: this.$route.query.twtype || ''
            }
          }

        }
        sessionStorage.setItem("customerInfo", JSON.stringify(customerInfo))
      }
      this.initData()
      if (this.$route.query.code) {
        let code = this.$route.query.code
        this.authorizeLogin(code)
      } else {
        this.checkLoginStatus()
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
    methods: {
      // 获取回收规则
      getCycleRule() {
        this.$http.getCycleRule().then(res => {
          this.rules = res.data.data
        })
      },
      // 去聊天
      enterSession() {
        wx.openEnterpriseChat({
          // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
          userIds: '', //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
          externalUserIds: this.externalUserId, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
          openIds: '',
          groupName: '', // 会话名称。单聊时该参数传入空字符串""即可。
          chatId: "", // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
          success: function (res) {
            var chatId = res.chatId; //返回当前群聊ID，仅当使用agentConfig注入该接口权限时才返回chatId
            // 回调
          },
          fail: function (res) {
            if (res.errMsg.indexOf('function not exist') > -1) {

            }
          }
        });
      },
      // 延期
      postPone() {
        Dialog.confirm({
          message: `客户可进行一次延期${this.rules.extensionDays}天，是否确认延期？`,
        }).then(() => {
          this.$http.PostdelayRecovery({
            customerId: this.$route.query.id
          }).then(res => {
            Notify({
              type: "success",
              message: "延期成功"
            });
            setTimeout(() => {
              window.history.back();
            }, 1000);
          })
        }).catch(() => {

        });
      },
      // 退回到公海池
      sendback() {
        Dialog.confirm({
          message: `确定要退回到公海池吗？`,
        }).then(() => {
          this.$http.sendBackHighSeas({
            poolCustomerId: this.$route.query.id
          }).then(res => {
            Notify({
              type: "success",
              message: "退回成功"
            });
            setTimeout(() => {
              window.history.back();
            }, 1000);
          })
        }).catch(() => {
          // Notify({ type: "warning", message: res.data.message });
        });
      },
      // 复制内容
      copyMobile(mobile) {
        this.$copyText(mobile).then(res => {
          console.log(888)
          // Toast('复制成功')
          this.copyNumber()
        }).catch(err => {
          Toast('复制失败')
        })
      },
      // 获取复制日期
      copyNumber() {
        this.$http.copyClaimClientNumber({
          poolCustomerId: this.customerId
        }).then((res) => {
          Toast("复制成功");
        });
      },

      // 通过config接口注入权限验证配置
      getWxJsJdkConfig() {
        let that = this;
        let url = that.domainAddress;
        that.$http.getWxJsJdkConfig({
          url
        }).then((res) => {
          let config = res.data.data;
          wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式
            appId: config.appId, // 企业微信的corpID
            timestamp: config.timeStamp, // 生成签名的时间戳
            nonceStr: config.nonceString, // 生成签名的随机串
            signature: config.signature, // 签名
            jsApiList: ["selectExternalContact", "openEnterpriseChat"], // 需要使用的JS接口列表，凡是要调用的接口都需要传进来
          });
          wx.ready(function () {
            // config信息验证后执行ready方法，如果在页面加载时就需要调用相关接口，则须把相关接口放在此函数中执行
            // 先从后台获取应用的id
            that.getAgentId();
          });
          wx.error(function (res) {
            // config信息验证失败执行相关处理
            Notify({
              type: "warning",
              message: "config信息验证失败"
            });
          });
        });
      },
      getAgentId() {
        let pathName = window.location.pathname;
        let strs = pathName.split("/");
        let code = strs[1];
        // let code = 'hyzs'
        if (code) {
          this.$http.getAgentId({
            code
          }).then((res) => {
            if (res.data.data.agentId) {
              this.getWxJsJdkAgentConfig(res.data.data.agentId);
            } else {
              Notify({
                type: "warning",
                message: "请检查后台配置是否正确"
              });
            }
          });
        } else {
          Notify({
            type: "warning",
            message: "请检查后台配置是否正确"
          });
        }
      },
      // 通过agentConfig注入应用的权限
      getWxJsJdkAgentConfig(agentId) {
        let that = this;
        let url = that.domainAddress;
        that.$http.getWxJsJdkAgentConfig({
          url,
          agentId
        }).then((res) => {
          let agentConfig = res.data.data;
          wx.agentConfig({
            corpid: agentConfig.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
            agentid: agentConfig.agentId, // 必填，企业微信的应用id （e.g. 1000247）
            timestamp: agentConfig.timeStamp, // 必填，生成签名的时间戳
            nonceStr: agentConfig.nonceString, // 必填，生成签名的随机串
            signature: agentConfig.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
            jsApiList: ["selectExternalContact", "openEnterpriseChat"],
            success: function (res) {
              console.log('是否返回chatId', res)
              // 回调
              // 判断当前客户端是否支持指定的JS接口
            },
            fail: function (res) {
              if (res.errMsg.indexOf("function not exist") > -1) {
                // alert('版本过低请升级') 2.5.0及以后版本支持
                Notify({
                  type: "warning",
                  message: "企业微信版本过低请升级"
                });
              }
              // that.jssdk.agentConfigValid = false
            },
          });
        });
      },



      onRefresh() {
        new Promise((resolve, reject) => {
          this.initData()
          resolve(true);
        }).then((res) => {
          if (res) {
            this.isPullRefresh = false;
          }
        });
      },
      authorizeLogin(code) {
        this.$http.authorizeLogin({
          code
        }).then((res) => {
          if (res.data.code === 20000) {
            this.authorizeUserId = res.data.data.userId;
          } else if (res.data.code === 12003) {
            this.checkLoginStatus();
          }
        });
      },
      checkLoginStatus() {
        this.$http.getLoginStatus().then((res) => {
          this.authorizeUserId = res.data.data.wxUserId;
        });
      },
      initData() {
        let customerInfo = sessionStorage.getItem("customerInfo")
        if (customerInfo) {
          let obj = JSON.parse(customerInfo)
          console.log('返回对象', obj)
          this.customerId = obj.customerId
          this.wxCustomerId = obj.wxCustomerId
          this.twtype = obj.twtype

          this.getCustomerDetail(this.wxCustomerId);
          this.getCustomerSelectedTags();
          this.recordPage.pageNum = 1
          this.recordList = []
          this.getCustomerFollowRecordPage();
          if (this.isworkwechat != 'not') {
            this.getCustomerLifeCycle();
          }
          // this.getCustomerLifeCycleList();
          // this.getCustomerLifeCycleTree();
          // this.getOrderConfig();
          this.getExternalProfile();
        }
      },
      // 获取客户详情
      getCustomerDetail(wxUserId) {
        let id = this.customerId;
        if (wxUserId) {
          this.getCustomerGroupPage({
            id: wxUserId
          });
        }
        let url = ''
        if (this.isworkwechat == 'not') {
          url = 'notEnterproseMicro'
        } else {
          url = 'getCustomerDetailById'
        }
        this.$http[url]({
          id
        }).then((res) => {
          // this.$http.getCustomerDetailById({ id }).then((res) => {
          if (res.data.code === 40001) {
            // 调用同步数据接口同步数据
            this.refreshData();
          }
          this.customerModel = res.data.data;
          this.getCustomerUserPage({
            id: this.customerId
          });
          setTimeout(() => {
            this.getDetailWrapperIsOverflow();
          }, 800);
        });
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
      // 删除动态列表
      deleteRecordSteps(id) {
        Dialog.confirm({
            message: "确定永久删除该条跟进记录！",
          })
          .then(() => {
            this.$http.deteleCustomerRecord({
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
      // 修改动态列表
      updateRecordSteps(item) {
        this.updateFlag = true;
        this.updateId = item.id;
        this.updateValue = item.content;
        console.log(item);
      },
      updateFlagFun() {
        let options = {
          id: this.updateId,
          content: this.updateValue,
        };
        console.log(options);
        this.$http.updateCustomerRecord(options).then((res) => {
          this.recordPage.pageNum = 1
          this.recordList = []
          this.getCustomerFollowRecordPage();
          Notify({
            type: "success",
            message: "修改成功"
          });
        });
      },
      // 客户加入的群列表
      getCustomerGroupPage(options) {
        this.$http.getCustomerGroupPage(options).then((res) => {
          this.customerGroupTotal = res.data.data.total;
        });
      },
      // 获取添加过外部联系人的内部人员
      getCustomerUserPage(options) {
        let url = ''
        if (this.isworkwechat == 'not') {
          url = 'notEnterpriseMembers'
          this.$http.notEnterpriseMembers(options).then((res) => {
            this.customerUserInfo.total = '1';
            this.customerUserInfo.userList = []
            this.customerUserInfo.userList.push(res.data.data);
          });
        } else {
          url = 'getCustomerUserPage'
          this.$http.getCustomerUserPage(options).then((res) => {
            this.customerUserInfo.total = res.data.data.total;
            this.customerUserInfo.userList = res.data.data.list;
          });
        }
      },
      // 获取动态记录
      getCustomerFollowRecordPage() {
        if (this.recordPage.pageNum == 1) {
          recordLatestDate = ''
        }
        let type = 1; // type 0：系统自动添加，1：手动添加
        if (this.tabActive === "manul-record") {
          type = 1;
        } else if (this.tabActive === "dynamic-record") {
          type = 0;
        }
        let params = {
          pageNum: this.recordPage.pageNum,
          pageSize: this.recordPage.pageSize,
          customerId: this.customerId,
          type: type,
        };
        this.$http.getCustomerFollowRecordPage(params).then((res) => {
          this.recordPage.total = res.data.data.total
          let list = res.data.data.list;
          list.forEach(item => {
            item.formatterTime = this.formatterTime(item.createTime)
            this.recordList.push(item)
          })
        });
      },
      // 获取更多记录
      loadMoreRecord() {
        this.recordPage.pageNum++
        this.getCustomerFollowRecordPage()
        console.log('加载更多记录')
      },
      // 领取为我的客户
      DrawForMe() {
        let id = ''
        if (this.isworkwechat == 'not' && this.tuser != true) {
          id = this.customerId
        }
        if (this.twtype == 'TW') {
          id = this.poolId
        }
        this.$http.GetForMyClient({
          id: id
        }).then(res => {
          if (res.data.code == 20000) {
            Notify({
              type: "success",
              message: "领取成功"
            });
            // window.history.go(-1);
            setTimeout(() => {
              // self.location=document.referrer
              window.history.back();
              // location.href=""
            }, 1000);
          } else {
            if (this.customerModel.mobile) {
              this.copycontent = true
              this.copyerr = res.data.message
            } else {
              Notify({
                type: "warning",
                message: res.data.message
              });
            }
          }
        })
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
      // 查询客户生命周期阶段
      getCustomerLifeCycle() {
        let id = this.customerId;
        this.$http.getCustomerLifeCycle({
          id
        }).then((res) => {
          // this.lifeCycleStage = res.data.message;
          if (res.data.data) {
            this.lifeCycleStage = res.data.data.cycleName
            this.lifeCycleCategory = res.data.data.category
          } else {
            this.lifeCycleStage = res.data.message
          }
        });
      },
      // 获取生命周期阶段列表
      getCustomerLifeCycleList() {
        this.$http.getCustomerLifeCycleList().then((res) => {
          let list = res.data.data;
          let newList = [];
          list.forEach((item) => {
            let obj = {
              text: item.cycleName,
              value: item.id,
            };
            newList.push(obj);
          });
          this.lifeCycleOptions = newList;
        });
      },
      // 获取生命周期树
      getCustomerLifeCycleTree() {
        this.$http.getCustomerLifeCycleTree().then(res => {
          this.lifeCycleTree = res.data.data
        })
      },
      // 展示生命周期树弹窗
      showLifeCycleTreePopup() {
        this.$http.getCustomerLifeCycleTree().then(res => {
          this.lifeCycleTree = res.data.data
          this.showLifeCycleTree = true
        })
      },
      // 选择并设置生命周期
      onLifeCycleConfirm(val) {
        let selected = this.$refs.picker.getValues()
        let customerLifeCycleId = selected[1].id
        console.log('返回数据', customerLifeCycleId)
        let params = {
          customerId: this.customerModel.id,
          customerLifeCycleId: customerLifeCycleId
        }
        this.$http.setCustomerLifeCycle(params).then(() => {
          Notify({
            type: "success",
            message: "设置成功"
          });
          this.getCustomerLifeCycle()
        });
        this.showLifeCycleTree = false
      },
      // 取消选择生命周期
      onLifeCycleCancel(val) {
        this.showLifeCycleTree = false
      },
      // 设置生命周阶段
      optionChange(val) {
        // 数组中匹配对象
        this.lifeCycleOptions.forEach((item) => {
          if (item.value === val) {
            this.lifeCycleStage = item.text;
          }
        });
        let params = {
          customerId: this.customerModel.id,
          customerLifeCycleId: val,
        };
        this.$http.setCustomerLifeCycle(params).then(() => {
          Notify({
            type: "success",
            message: "设置成功"
          });
        });
      },
      showMenuTips() {
        Notify({
          type: "warning",
          message: "暂无数据"
        });
      },
      // 跳转到标签编辑页
      goToTagPage() {
        this.$router.push(`/sidebar-dev/customerTags?id=${this.customerId}&isworkwechat=${this.isworkwechat}`);
      },
      // 跳转到客户编辑页面
      goToCustomerPage() {
        this.$router.push(
          `/sidebar-dev/customerForm?id=${this.customerId}&wxId=${this.wxId}&isworkwechat=${this.isworkwechat}`
        );
      },
      getGroupHeight() {
        this.groupHeight =
          window.innerHeight -
          document.querySelector("#group-content").offsetTop +
          "px";
      },
      // 获取客户群信息
      getCustomerGroupDetail(chatId) {
        Toast.clear();
        this.$http.getGroupChatDetail({
          chatId
        }).then((res) => {
          this.groupChatModel = res.data.data;
        });
      },
      tabChange(item) {
        this.tabActive = item.value;
        if (item.value === "dynamic-record") {
          this.recordPage.pageNum = 1
          this.recordList = []
          this.getCustomerFollowRecordPage();
        } else if (item.value === "order-record") {
          this.orderPage.pageNum = 1
          this.orderList = []
          this.getCustomerOrderRecordPage();
        } else if (item.value === "manul-record") {
          this.recordPage.pageNum = 1
          this.recordList = []
          this.getCustomerFollowRecordPage();
        }
      },
      // 添加动态记录
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
            customerId: this.customerModel.id,
            // customerId: 'f8a8112b926446f398f58edbd421c003'
          };
          this.$http.addCustomerFollowRecord(params).then(() => {
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
      // 获取客户详情-订单记录配置信息
      getOrderConfig() {
        this.$http.getConfigByKey("is_open_sidebar_order").then((res) => {
          this.orderConfig = res.data.data || {};
          // 是否开启侧边栏订单记录，1为开启，0为关闭
          if (this.orderConfig.value === "1") {
            this.tabs = [{
                name: "跟进",
                value: "manul-record"
              },
              {
                name: "动态",
                value: "dynamic-record"
              },
              {
                name: "订单",
                value: "order-record"
              }
            ];
          } else {
            this.tabs = [{
                name: "跟进",
                value: "manul-record"
              },
              {
                name: "动态",
                value: "dynamic-record"
              }
            ];
          }
        });
      },
      // 获取客户扩展信息
      // getExternalProfile() {
      //   let id = this.customerId;
      //   this.$http.getExternalProfileById({ id }).then((res) => {
      //     let data = res.data.data;
      //     data.forEach((item) => {
      //       if (item.value && /_/g.test(item.value)) {
      //         item.value = item.value.replace(/_/g, "/");
      //       }
      //     });
      //     this.externalProfileList = data;
      //   });
      // },
      getExternalProfile() {
        let id = this.customerId;
        this.$http.getExternalProfileById({
          id
        }).then((res) => {
          let data = res.data.data;
          this.externalProfileList = []
          data.forEach((item) => {
            if (item.type == 'image') {
              if (item.value) {
                item.value = item.value.split("_")
              } else {
                item.value = []
              }
            } else {
              if (item.value && /_/g.test(item.value)) {
                item.value = item.value.replace(/_/g, "/");
              }
            }
            this.externalProfileList.push(item)
          });
        });
      },
      // 判断获取用户资料高度溢出
      getDetailWrapperIsOverflow() {
        this.$nextTick(() => {
          this.detailWrapperHeight = this.$refs.detail_wrapper_content.offsetHeight;
          //  console.log(detailWrapperHeight);
        });
      },
      // 获取客户订单记录
      getCustomerOrderRecordPage() {
        let params = {
          pageNum: this.orderPage.pageNum,
          pageSize: this.orderPage.pageSize,
          // keyword: this.orderPage.keyword,
          customerId: this.customerModel.id,
        };
        this.$http.getCropOrderPage(params).then((res) => {
          let list = res.data.data.list
          list.forEach(item => {
            this.orderList.push(item)
          })
          // this.orderList = res.data.data.list;
          this.orderPage.total = res.data.data.total;
          console.log('列表长度' + this.orderList.length + '总数' + this.orderPage.total)
        });
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
      confirmBinding() {
        if (this.memberNames === "") {
          Notify({
            type: "warning",
            message: "请输入会员名"
          });
        } else {
          let arr = this.memberNames.split("\n");
          let params = {
            customerId: this.customerModel.id,
            memberName: arr,
          };
          this.$http.bindTaobaoMember(params).then((res) => {
            this.bindingNotifyShow = false;
            this.getCustomerOrderRecordPage();
          });
        }
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
      // 同步数据
      refreshData() {
        this.isLoading = true;
        // let customerId = this.wxCustomerId
        this.$http
          .customerDataSync({
            customerId: this.wxCustomerId
          })
          .then(() => {
            this.getCustomerData();
            this.getCustomerSelectedTags();
            this.recordPage.pageNum = 1
            this.recordList = []
            this.getCustomerFollowRecordPage();
            this.getCustomerLifeCycle();
            this.getExternalProfile();
            this.isLoading = false;
          })
          .catch((e) => {
            this.isLoading = false
            console.log('customerDataSync', e)
          })
      },
      getCustomerData() {
        let id = this.customerId;
        let url = ''
        if (this.isworkwechat == 'not') {
          url = 'notEnterproseMicro'
        } else {
          url = 'getCustomerDetailById'
        }
        this.$http[url]({
          id
        }).then((res) => {
          // this.$http.getCustomerDetailById({ id }).then((res) => {
          this.customerModel = res.data.data;
        });
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
    beforeDestroy() {
      clearTimeout(this.timer);
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
          padding: 20px 12px 12px 12px;
          box-sizing: border-box;
          border-radius: 3px;
          background-color: rgba(142, 187, 229, 9%);

          .summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            .summary-left {
              display: flex;

              .cust-avatar {
                width: 54px;
                height: 54px;
                border-radius: 27px;
                box-sizing: border-box;
                margin-right: 10px;
              }

              .cust-cont {
                .cust-name {
                  font-weight: bold;
                  color: #222222;
                  margin-bottom: 10px;

                  .type-name {
                    font-size: 12px;
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
                  font-size: 12px;
                  color: #9f9e9e;
                  margin-bottom: 10px;
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
              }
            }

            .summary-right {
              .edit-btn {
                cursor: pointer;

                .edit-icon {
                  font-size: 20px;
                }
              }
            }
          }

          .detail {
            .detail-wrapper {
              // height: 110px;
              // overflow: hidden;
              // padding-top: 2px;
              margin-top: 20px;
              max-height: 214px;
              overflow: hidden;

              &.active {
                max-height: unset;
              }

              .info-item {
                display: flex;
                color: #222222;
                margin-bottom: 10px;
                line-height: 18px;

                .item-left {
                  display: flex;
                  flex: 1;

                  .item-label {
                    color: #9da2ab;
                    flex-shrink: 0;
                    width: 70px;
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
                  color: #222222;
                  line-height: 18px;
                  display: flex;
                  margin-bottom: 10px;

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
      margin-top: 12px;

      .tabbar {
        display: flex;
        background-color: #ffffff;
        border-bottom: 2px solid #f9f9f9;
        box-sizing: border-box;
        justify-content: space-around;

        .tab-item {
          padding: 10px;
          border-bottom: 2px solid rgba(0, 0, 0, 0);
          color: #9f9e9e;
          margin-bottom: -2px;
          cursor: pointer;
          flex: 1;
          text-align: center;
          max-width: 60px;
        }

        .tab-active {
          color: #4f73ad;
          border-bottom: 2px solid #4f73ad;
          font-weight: bold;
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

          input {
            height: 34px;
            line-height: 34px;
            padding: 0 10px;
            background-color: #f7f8fa;
            border: unset;
            box-sizing: border-box;
            flex: 1;
            border-radius: 4px;
          }

          .add-btn {
            width: 56px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            color: #ffffff;
            background-color: #4f73ad;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 6px;
          }

          .add-btn-mobile {
            width: 56px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            color: #ffffff;
            background-color: #4f73ad;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 6px;
            padding-top: 2px;
            box-sizing: border-box;
          }
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

            .small-btn {
              width: 46px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              color: #4f73ad;
              background-color: #e8f1fa;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
            }

            .small-btn-mobile {
              width: 46px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              color: #4f73ad;
              background-color: #e8f1fa;
              border-radius: 4px;
              cursor: pointer;
              padding-top: 1px;
              box-sizing: border-box;
              font-size: 12px;
            }

            .left-btn {
              margin-right: 5px;
            }
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