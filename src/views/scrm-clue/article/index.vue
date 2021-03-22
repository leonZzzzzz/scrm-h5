<template>
  <div class="article-page">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-search
        v-model="search.name"
        class="search-box"
        shape="round"
        placeholder="请输入标题"
        @search="onSearch"
      />

      <section class="nav-data">
        <div class="nav-data-item">
          <p>{{ navData.visitQuantity | formatQuantity }}</p>
          <p>今日浏览</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navData.shareQuantity | formatQuantity }}</p>
          <p>今日转发</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navData.customerClueQuantity | formatQuantity }}</p>
          <p>今日线索</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navData.customerQuantity | formatQuantity }}</p>
          <p>今日客户</p>
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
          <li class="item" v-for="(item) in list" :key="item.id" @click="toDetail(item.id)">
            <div class="item-title">
              <p class="title">{{ item.name }}</p>
              <div class="share-button" @click.stop="onShareArticle(item)">
                <van-icon class-prefix="v-font" name="icon-zhuanfafasong-3" />
                <span>分享</span>
              </div>
            </div>
            <div class="item-qty">
              <span>历史浏览 {{ item.visitQuantity | formatQuantity }}</span>
              <span>今日浏览 {{ item.todayVisitQuantity | formatQuantity }}</span>
              <span class="time">{{ item.createTime | formatDateTime('date') }}</span>
            </div>
            <div class="item-content">
              <div class="img-wrap">
                <img :src="imgUrl + item.imageUrl" alt="" />
              </div>
              <div class="info">
                <p v-html="item.content"></p>
              </div>
            </div>
            <div class="item-buttons">
              <div>
                <!-- <van-icon name="share-o" /> -->
                <van-icon class-prefix="v-font" name="icon-zhuanfafasong-3" />
                <span> 转发 {{ item.shareQuantity | formatQuantity }}</span>
              </div>
              <div>
                <!-- <van-icon name="search" /> -->
                <van-icon class-prefix="v-font" name="icon-xiansuo" />
                <span> 线索 {{ item.customerClueQuantity | formatQuantity }}</span>
              </div>
              <div>
                <van-icon name="user-o" />
                <span> 客户 {{ item.customerQuantity | formatQuantity }}</span>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
    <!-- 引导分享弹窗 -->
    <van-overlay :show="showShare" @click="showShare = false">
      <img class="share-image" src="../images/share.png" alt="请点击页面顶部右上角 “...” 分享" @click.stop />
    </van-overlay>
  </div>
</template>

<script>
import ApiScrmClue from '@/api/scrm-clue';
import wxSdk from '@/utils/wxSdk';
import { Overlay } from 'vant';
export default {
  components: {
    vanOverlay: Overlay
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
        name: '',
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
      list: [
        // {
        //   id: '',
        //   createTime: '', // 时间
        //   name: '', // 标题
        //   // content: '', // 简介
        //   imageUrl: '', // 封面
        //   visitQuantity: '', // 浏览数
        //   todayVisitQuantity: '', // 今日浏览数
        //   shareQuantity: '', // 转发数
        //   customerClueQuantity: '', // 线索数
        //   customerQuantity: '', // 客户数
        // }
      ],
      showShare: false,
      // 要分享的推文
      shareArticleItem: {}
    }
  },
  mounted() {
    wxSdk.getWxJsJdkConfig()
    // this.getTongji()
    // this.onLoad()
  },
  activated() {
    this.getTongji()
    this.onSearch()
  },
  methods: {
    // 跳转推文详情
    toDetail(id) {
      this.$router.push('/scrmClue/article/detail?id='+id || '')
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
    // 搜索
    onSearch() {
      if (this.listLoading) return
      console.log('onSearch')
      this.search = {...this.search, pageNum: 1}
      this.list = []
      this.finished = false;
      this.listLoading = true
      this.onLoad()
    },
    // 加载列表
    async onLoad() {
      try {
        let res = await ApiScrmClue.getScrmClueMaterialPage(this.search)
        // 加载状态结束
        this.listLoading = false
        this.refreshing = false
        // this.listError = false
        // this.finished = false
        let {list, pageNum, pageSize} = res.data.data
        list.forEach(item => {
          // 因为列表页面上只会显示4行内容，这里处理一下大概只截取150个字符就够了
          if (item.content) {
            item.content = item.content.slice(0, 150)
          }
        })
        if (pageNum === 1) this.list = list
        else this.list = this.list.concat(list)
        // 数据全部加载完成
        if (list.length === 0) {
          this.finished = true
        }
        // 页数加1
        this.search.pageNum++
      } catch (error) {
        // 加载状态结束
        this.listLoading = false
        this.refreshing = false
        // 请求失败
        this.listError = true
      }
    },
    // 获取统计的今日数据
    getTongji() {
      ApiScrmClue.getScrmClueSourceDataToday().then(res => {
        this.navData = res.data.data
      })
    },
    // 分享推文
    onShareArticle(item) {
      // this.$notify({
      //   message: '请点击页面顶部右上角 “...” 分享',
      //   background: '#3973CA'
      // });
      this.showShare = true;
      this.shareArticleItem = JSON.parse(JSON.stringify(item))
      this.getShareLink()
    },
    onMenuShare(link) {
      let {id, name, imgUrl} = this.shareArticleItem
      if (!id) return
      let model = {
        title: name,
        desc: '',
        link: link,
        imgUrl: this.imgHost + imgUrl,
      }
      wxSdk.shareSetting(model)
    },
    // 获取推文转发的链接
    getShareLink() {
      if (this.shareArticleItem.shareUrl) {
        this.onMenuShare(shareUrl)
      } else {
        ApiScrmClue.getScrmClueCustomerMaterialShareLink({
          materialId: this.shareArticleItem.id, // 推文ID
          materialType: 'article', // 固定值
          from: '', 
          client: '', // 开发环境才需要传，用于测试; 传client=wework暗示在企微内，传client=wechat暗示在微信内，不然会报错code=40000
        })
        .then(res => {
          let { shareUrl } = res.data.data
          this.onMenuShare(shareUrl)
          this.list.forEach(item => {
            if (item.id === this.shareArticleItem.id) {
              this.$set(item, 'shareUrl', shareUrl)
            }
          })
        })
      }
    }
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

.share-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 95%;
}

.article-page {
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

.list {
  margin: 30px 15px 0;
  .item {
    margin-bottom: 15px;
    padding: 10px 15px;
    box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.8);
    border-radius: 4px;
    .item-title {
      display: flex;
      justify-content: space-between;
      .title {
        max-width: 80%;
        // font-size: 16px;
        font-size: 16px;
        line-height: 1.5;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .share-button {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--theme-color);
        font-size: var(--font-sm-s);
        ::v-deep .v-font {
          margin-top: 2px;
          margin-right: 2px;
          font-size: var(--font-sm);
          color: var(--theme-color);
        }
      }
    }
    .item-qty {
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: var(--font-xs);
      color: var(--gray-color);
      span {
        padding-right: 15px;
      }
      .time {
        flex: 1;
        text-align: right;
        padding-right: 0;
      }
    }
    .item-content {
      margin-top: 10px;
      display: flex;
      // align-items: center;
      .img-wrap {
        flex-shrink: 0;
        width: 80px;
        height: 80px;
        margin-right: 10px;
        background: #ccc;
        img {
          width: 100%;
          height: 100%;
          background: #ccc;
        }
      }
      .info { 
        overflow: hidden;
        & > p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          color: #58585A;
          line-height: 1.5;
          font-size: var(--font-sm);
        }
      }
    }
    .item-buttons {
      display: flex;
      padding-top: 10px;
      align-items: center;
      justify-content: space-between;
      & > div {
        flex: 1;
        text-align: center;
        font-size: var(--font-xs);
        color: var(--gray-color);
        // span {
        //   // vertical-align: middle;
        // }
        ::v-deep .v-font, .van-icon {
          font-size: var(--font-xs);
        }
        ::v-deep .van-icon {
          font-size: var(--font-sm-s);
          vertical-align: -15%;
        }
      }
      div:first-child {
        text-align: left;
      }
      div:last-child {
        text-align: right;
      }
    }
  }
}
</style>