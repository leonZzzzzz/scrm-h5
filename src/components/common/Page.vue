<template>
  <!-- xfo -->
  <!-- 
    import Page from "../../components/common/Page";

    <Page :config="pageConfig" @onLoad="onLoad" @onRefresh="onRefresh">

    pageConfig: {
        loading: false,
        finished: false,
      },
   // 下拉刷新
    onRefresh(){

    },
    // 滚动加载
    onLoad(){

    },
  -->
  <div>
    <van-pull-refresh v-model="config.loading" @refresh="onRefresh">
      <van-list
        v-model="config.loading"
        :finished="config.finished"
        finished-text="- 没有更多了 -"
        @load="onLoad"
      >
        <slot></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
const configureObject = {
  loading: false, // 是否处于加载状态，加载过程中不触发load事件 refreshing: false, // 是否处于加载中状态
  finished: false // 是否已加载完成，加载完成后不再触发load事件
  
};
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return configureObject;
      },
    },
  },
  methods: {
    // 滚动条与底部距离小于 offset 时触发
    onLoad() {
      this.$emit("onLoad");
    },
    // 下拉刷新时触发
    onRefresh() {
      this.$emit("onRefresh");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>