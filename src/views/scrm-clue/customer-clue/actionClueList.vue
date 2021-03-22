<template>
  <div class="shareList">
      <qc-nav-bar color="#222" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
            </div>
            <div class="item-bottom-qty">
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
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ApiScrmClue from '@/api/scrm-clue';
  import QcNavBar from "@/components/common/QcNavBar";
export default {
  components: { QcNavBar: QcNavBar },
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
        level: 1,
        orderBy: 'mostVisit',
        pageNum: 1
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
    }
  },
  mounted() {
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
    // 搜索
    onSearch() {
      if (this.listLoading) return
      console.log('onSearch')
      let {level, orderBy} = this.$route.query
      this.search = {
        ...this.search, 
        pageNum: 1, 
        level: level || 1, 
        orderBy: orderBy || 'mostVisit'
      }
      this.list = []
      this.listLoading = true
      this.finished = false;
      this.onLoad()
    },
    // 刷新
    onRefresh() {
      if (this.listLoading) return
      console.log('onRefresh')
      // 将search对象恢复初始值
      this.search = this.$options.data().search
      // this.finished = false;
      // 在数据不够一屏时 发现finished设置false后组件会自动触发onLoad
      this.onLoad()
    },
    // 加载列表
    async onLoad() {
      try {
        // 字段参考接口文档 http://xyj.wego168.com/xiaoyaoji/doc/4bK7gruT6W
        let res = await ApiScrmClue.getScrmClueCustomerCluePageByLevel(this.search)
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
    addRecord(item) {
      // this.$toast('暂未开放')
      this.$router.push('/scrmClue/customerClue/customer?id='+item.id)
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

.shareList {
  background: #fff;
  min-height: calc(100vh);
}

.list {
  margin: 60px 0 0;
  overflow: hidden;
  .item {
    margin: 2px 15px 15px;
    padding: 0 15px;
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0px rgba(224, 224, 224, 0.8);
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
    }
    .item-bottom-qty {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ECEDEF;
      & > div {
        height: 42px;
        line-height: 42px;
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
    
  }
}
</style>