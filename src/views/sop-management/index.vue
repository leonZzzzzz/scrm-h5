<template>
  <div class="sop">
    <div class="content">
      <sop-list v-if="tabActive == 'list'"></sop-list>
      <sop-statistics v-else-if="tabActive == 'statistics'"></sop-statistics>
    </div>
    <div class="tabbar">
      <van-tabbar v-model="tabActive">
        <van-tabbar-item name="list" icon="home-o">明细</van-tabbar-item>
        <van-tabbar-item name="statistics" icon="search">统计</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import SopList from './list.vue'
import SopStatistics from './statistics.vue'
import Utils from '../../utils/wxSdk'
export default {
  components: {
    SopList,
    SopStatistics,
  },
  data() {
    return {
      tabActive: 'list'
    }
  },
  created() {
    // 授权
    this.getAuthorizeWxUserId().then(wxUserId => {
      console.log('返回wxUserId', wxUserId)
    })
    .catch(err => {
      console.log('获取wxUserId失败', err)
    })
    // wxsdk配置
    Utils.setWxJsJdkAgentConfig().then(res => {
      console.log('配置信息注入成功')
    })
    .catch(err => {
      console.log('配置信息注入失败')
    })
  },
}
</script>

<style lang="less" scoped>
.content {
  margin-bottom: 50px;
}
</style>