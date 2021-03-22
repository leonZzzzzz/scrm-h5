<template>
  <div class="customerClue">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-search
        v-model="search.appellation"
        class="search-box"
        shape="round"
        placeholder="请输入昵称"
        @search="onSearch"
      />

      <section class="nav-data">
        <div class="nav-data-item">
          <p>{{ navDataTotal.customerClueQuantity | formatQuantity }}</p>
          <p>历史线索</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navData.customerClueQuantity | formatQuantity }}</p>
          <p>今日线索</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navDataTotal.customerQuantity | formatQuantity }}</p>
          <p>历史客户</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navData.customerQuantity | formatQuantity }}</p>
          <p>今日客户</p>
        </div>
      </section>
      
      <section class="filter-box">
        <div class="tabs" @click="onSelectOrderBy">
          <div class="tabs-item" 
            :class="{'tabs-item-active': search.orderBy == 'latestActive'}" 
            data-id="latestActive">最近活跃</div>
          <div class="tabs-item" 
            :class="{'tabs-item-active': search.orderBy == ''}" 
            data-id="">最近新增</div>
        </div>
        <div class="filter">
          <van-dropdown-menu active-color="#3973CA">
            <van-dropdown-item 
              v-model="search.followStatus" 
              :options="followStatusOptions" 
              @change="onfilter"
              />
          </van-dropdown-menu>
        </div>
      </section>
      <van-list
        v-model="listLoading"
        :finished="finished"
        finished-text="没有更多动态了"
        :error.sync="listError"
        error-text="请求失败，点击重新加载"
        offset="50"
        :immediate-check="false"
        @load="onLoad"
      >
        <ul class="list">
          <li class="item" 
            v-for="(item) in list" 
            :key="item.id" 
            @click="addRecord(item)"
          >
            <div class="item-main">
              <div class="item-headImage">
                <img v-if="item.headImage" :src="item.headImage" alt="" />
              </div>
              <div class="item-name-wrap">
                <p class="item-name">{{item.appellation}}
                </p>
                <p 
                  v-if="item.transferStatus == 'transfered-customer'" 
                  class="transfer-status"><span>@</span>微信</p>
                <span class="follow-status"
                  :class="{'follow-status-a': item.followStatus == 'follow'}"
                  >{{ item.followStatus | formatFollowStatus }}</span>
              </div>
              <div class="item-time">{{ item.createTime | formatDateTime('dateTime') }}</div>
              <div class="item-from">{{ item.customerClueSourceType }}</div>
              <div class="item-qty">
                <div>
                  <!-- <van-icon name="search" /> -->
                  <van-icon class-prefix="v-font" name="icon-fangwen" />
                  <span> 访问次数 {{ item.visitQuantity | formatQuantity }}</span>
                </div>
                <div>
                  <!-- <van-icon name="user-o" /> -->
                  <van-icon class-prefix="v-font" name="icon-liulan" />
                  <span> 浏览文章 {{ item.visitArticleQuantity | formatQuantity }}</span>
                </div>
                <div>
                  <!-- <van-icon name="share-o" /> -->
                  <van-icon class-prefix="v-font" name="icon-zhuanfafasong-3" />
                  <span> 转发 {{ item.shareQuantity | formatQuantity }}</span>
                </div>
              </div>
            </div>
            <div class="item-buttons">
              <div class="item-add" @click.stop="addRecord(item)">
                <van-icon name="plus" /><span>添加跟进记录</span>
              </div>
              <div class="item-edit" @click.stop="goToEditPage(item.id)">
                <van-icon name="edit" /><span>编辑资料</span>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from 'vant';
import ApiScrmClue from '@/api/scrm-clue';
export default {
  components: {
    vanDropdownMenu: DropdownMenu,
    vanDropdownItem: DropdownItem
  },
  inject: {
    authorizeUserId: {
      from: 'authorizeUserId',
      default: ''
    },
  },
  data() {
    return {
      refreshing: false,
      listLoading: false,
      listError: false,
      finished: false,
      search: {
        appellation: '',
        followStatus: 'not-follow',
        orderBy: 'latestActive',
        pageNum: 1,
        pageSize: 10
      },
      // 今日统计
      navData: {
        // 浏览
        visitQuantity: 0,
        // 转发
        shareQuantity: 0,
        // 线索
        customerClueQuantity: 0,
        // 客户
        customerQuantity:0,
      },
      // 历史统计
      navDataTotal: {
        // 浏览
        visitQuantity: 0,
        // 转发
        shareQuantity: 0,
        // 线索
        customerClueQuantity: 0,
        // 客户
        customerQuantity:0,
      },
      list: [
        // {
        //   id: '1',
        //   createTime: '2020-03-12 12:30:15', // 加入时间
        //   headImage: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3869515018,2735128030&fm=26&gp=0.jpg', // 头像
        //   appellation: 'CONLIN', // 昵称
        //   followStatus: 'not-follow', // 跟进状态：not-follow=未跟进，follow=已跟进
        //   transferStatus: 'transfered-customer', // 转化状态：not-transfer=未转化，transfered-customer=已转化为客户
        //   customerClueSourceType: '来自文章', // 线索来源
        //   visitQuantity: '12', // 浏览数
        //   visitArticleQuantity: '15', // 浏览文章数
        //   shareQuantity: '2', // 转发数
        // }
      ],
      followStatusOptions: [
        { text: '已跟进', value: 'follow' },
        { text: '未跟进', value: 'not-follow' },
      ]
    }
  },
  mounted() {
    // this.getTongji()
    // this.onLoad()
  },
  activated() {
    this.getTongji()
    this.onSearch()
  },
  filters: {
    formatFollowStatus(val) {
      switch(val) {
        case 'not-follow':
          return '未跟进'
        case 'follow':
          return '已跟进'
        default:
          return val
      }
    }
  },
  methods: {
    onSelectOrderBy(e) {
      console.log(e)
      this.search.orderBy =  e.target.dataset.id || ''
      this.onSearch()
    },
    onfilter() {
      this.onSearch()
    },
    // 搜索
    onSearch() {
      if (this.listLoading) return
      console.log('onSearch')
      this.search = {...this.search, pageNum: 1}
      this.list = []
      this.listLoading = true
      this.finished = false
      this.onLoad()
    },
    // 刷新
    onRefresh() {
      if (this.listLoading) return
      console.log('onRefresh')
      // 将search对象恢复初始值
      this.search = this.$options.data().search
      this.finished = false;
      this.onLoad()
    },
    // 加载列表
    async onLoad() {
      try {
        // 字段参考接口文档 http://xyj.wego168.com/xiaoyaoji/doc/4b3F1fqF6k
        let res = await ApiScrmClue.getScrmClueCustomerCluePage(this.search)
        // 加载状态结束
        this.listLoading = false
        this.refreshing = false
        // this.listError = false
        // this.finished = false
        let {list, pageNum, pageSize} = res.data.data
        if (pageNum === 1) this.list = list
        else this.list = this.list.concat(list)
        // 数据全部加载完成
        if (list.length === 0) {
          this.finished = true
        }
        // 页数加1
        this.search.pageNum++
      } catch (error) {
        console.log(error)
        // 加载状态结束
        this.listLoading = false
        this.refreshing = false
        // 请求失败
        this.listError = true
      }
    },
    // 获取统计
    getTongji() {
      ApiScrmClue.getScrmClueSourceDataToday().then(res => {
        this.navData = res.data.data
      })
      ApiScrmClue.getScrmClueSourceDataTotal().then(res => {
        this.navDataTotal = res.data.data
      })
    },
    addRecord(item) {
      // this.$toast('暂未开放')
      this.$router.push('/scrmClue/customerClue/customer?id='+item.id)
      // this.$router.push('/scrmClue/customerClue/customer/editCustomer?id='+item.id)
    },
    // 跳转到客户编辑页面
    goToEditPage(customerClueId) {
      this.$router.push('/scrmClue/customerClue/editCustomer?id='+customerClueId)
      // this.$router.push(
      //   `/sidebar-dev/customerForm?id=${this.customerId}&wxId=${this.wxId}&isworkwechat=${this.isworkwechat}`
      // );
    },
  }
}
</script>

<style lang="less" scoped>

p {
  margin: 0;
  padding: 0;
}
ul, li {
  list-style: none;
}

.customerClue {
  background: #fff;
  min-height: calc(100vh - 50px);
}

.search-box {
  position: sticky;
  top: 0;
}

.nav-data {
  display: flex;
  align-items: center;
  margin: 10px 15px;
  margin-top: 0;
  border-radius: 5px;
  box-shadow: 0 2px 3px 0 #65A3FE;
  // background: linear-gradient(90deg, #6D7EF9 0%, #65A3FE 100%);
  background: linear-gradient(90deg, #447FD6 0%, #3671C9 100%);
  &-item {
    position: relative;
    flex: 1;
    color: #fff;
    &:not(:last-child)::after {
      content: ' ';
      position: absolute;
      top: 15%;
      right: 0;
      height: calc(100% - 30%);
      pointer-events: none;
      border-left: 1px solid #fff;
      opacity: 0.3;
      transform: scaleY(.5);
    }
    p {
      margin: 0;
      padding: 0;
      margin-top: 15px;
      text-align: center;
    }
    p:first-child {
      font-family: 'Bebas';
      font-weight: bold;
      font-size: 25px;
    }
    p:last-child {
      opacity: .6;
      font-size: var(--font-sm-s);
      margin-bottom: 15px;
    }
  }
}

.filter-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  padding-bottom: 5px;
  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    // height: 1px solid #ECEDEF;
    border-bottom: 1px solid #ECEDEF;
    transform: scaleY(0.5);
  }
  .tabs {
    height: 45px;
    line-height: 45px;
    .tabs-item {
      display: inline-block;
      margin-right: 40px;
      font-size: var(--font-md);
      color: var(--gray-color);
      &-active {
        position: relative;
        color: var(--blank-color);
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 30px;
          height: 3px;
          border-radius: 3px;
          background: #FAC05B;
          transform: translateX(-50%);
        }
      }
    }
  }
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: 0 0 0 0 #fff;
  }
}

.list {
  margin: 30px 15px 0;
  overflow: hidden;
  .item {
    margin-bottom: 15px;
    padding: 0 15px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.8);
    border-radius: 4px;
    overflow: hidden;
    .item-main {
      position: relative;
      margin-top: 10px;
      margin-left: 55px;
      .item-name-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
        .item-name {
          font-size: var(--font-md);
          color: var(--blank-color);
        }
        .transfer-status {
          padding-bottom: 1px;
          padding-left: 5px;
          color: #3CA057;
          vertical-align: top;
          font-size: var(--font-sm-s);
          span {
            vertical-align: baseline;
          }
        }
        .follow-status {
          flex: 1;
          text-align: right;
          color: #FAC05B;
          font-size: var(--font-sm-s);
          &-a {
            color: var(--gray-color);
          }
        }
      }
      .item-time {
        margin-bottom: 5px;
        color: var(--gray-color);
        font-size: var(--font-xs);
      }
      .item-from {
        min-height: 20px;
        font-size: var(--font-sm);
        color: #58585A;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .item-qty {
        display: flex;
        justify-content: space-between;
        & > div {
          height: 30px;
          line-height: 30px;
          color: var(--gray-color);
          font-size: var(--font-xs);
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
    }
    .item-headImage {
      position: absolute;
      top: 0;
      left: -55px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #eee;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .item-buttons {
      display: flex;
      border-top: 1px solid #ECEDEF;
      & > div {
        flex: 1;
        height: 42px;
        line-height: 42px;
        color: var(--theme-color);
        font-size: var(--font-sm-s);
        vertical-align: middle;
        text-align: center;
        position: relative;
        &:first-child::after {
          content:  ' ';
          position: absolute;
          top: 25%;
          right: 0;
          height: calc(100% - 50%);
          pointer-events: none;
          border-left: 1px solid #ECEDEF;
          // transform: scaleX(.5);
        }
      }
      ::v-deep .van-icon {
        color: inherit;
        font-size: inherit;
        vertical-align: inherit;
        padding-right: 5px;
      }
    }
    
  }
}
</style>