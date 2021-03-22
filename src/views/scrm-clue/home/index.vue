<template>
  <div class="scrm-clue">
    <div class="scrm-clue-container">
      <keep-alive>
        <router-view v-if="$route.meta.isTabbar" />
      </keep-alive>
      <router-view  v-if="!$route.meta.isTabbar"/>
    </div>
    <section v-if="isTabbar">
      <!-- <div class="tabbar-height-bar"></div> -->
      <van-tabbar v-if="isTabbar" v-model="active" route placeholder>
        <van-tabbar-item icon="notes-o" replace to="/scrmClue/article">获客推文
          <span slot="icon" class="iconfont icon-wenzhangguanli"></span>
        </van-tabbar-item>
        <van-tabbar-item icon="search" replace to="/scrmClue/customerClue">线索
          <span slot="icon" class="iconfont icon-xiansuo"></span>
        </van-tabbar-item>
        <van-tabbar-item icon="chart-trending-o" replace to="/scrmClue/statistics">数据统计</van-tabbar-item>
      </van-tabbar>
    </section>
    
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import Utils from '@/utils/utils'
export default {
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
  },
  // 父组件中返回要传给下级的数据
  provide () {
    return {
      authorizeUserId: this.authorizeUserId
    }
  },
  data() {
    return {
      isTabbar: false, //当前子路由是否是tabbar页面
      active: 0,
      authorizeUserId: ''
    }
  },
  watch: {
    $route: {
      //初始化的时候执行一次
      immediate: true,
      handler: function (route) {
        console.log('客户线索 scrm-clue/home watch===> $route', this.isTabbar, route)
        this.isTabbar = route.meta.isTabbar === true
      }
    }
  },
  created() {
    // if (Utils.envJudge()) {
    //   // 如果是企业微信环境才调用授权接口
    //   this.oursSetPower('authorizeUserId')
    // }
  },
}
</script>

<style lang="less" scoped>

@theme-color: #3973CA;
@gray-color: #999;
@blank-color: #323233;

.tabbar-height-bar {
  height: 50px;
}

.scrm-clue {
  ::v-deep .van-tabbar {
    border-top: 1px solid #ebedf0;
  }
}
.scrm-clue-container {
  // 定义css变量，供子组件使用
  --theme-color: #3973CA;
  // --gray-color: #999;
  --gray-color: #A9A9A9;
  --blank-color: #323233;
  --font-md: 16px;
  --font-sm: 14px;
  --font-sm-s: 13px;
  --font-xs: 12px;
  font-size: var(--font-sm);
}
</style>