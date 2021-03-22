<template>
  <div :style="{'--theme-color': color, '--font-size': fontSize}">
    <van-nav-bar
      :title="title"
      :left-arrow="leftArrow"
      :left-text="leftText"
      :right-text="rightText"
      :fixed="fixed"
      @click-left="goBack"
    >
      <template #left>
        <div class="left-arrow">
          <van-icon
            name="arrow-left"
            :class="isMobile ? 'left-arrow-icon-mobile' : 'left-arrow-icon'"
          />返回
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  props: {
    leftArrow: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    leftText: {
      type: String,
      default: '返回',
    },
    rightText: {
      type: String,
      default: '',
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#4f73ad'
    },
    fontSize: {
      type: String,
      default: '14px'
    }
  },
  components: {
    vanNavBar: NavBar,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.left-arrow {
  display: flex;
  align-items: center;
  height: 46px;
  line-height: 46px;
  color: var(--theme-color);
  font-size: 15px;
  .left-arrow-icon {
    font-size: 15px;
    margin-top: -1px;
    margin-right: 3px;
  }
  .left-arrow-icon-mobile {
    font-size: 15px;
    margin-top: -3px;
    margin-right: 3px;
  }
  ::v-deep .van-icon {
    color: var(--theme-color) !important;
    font-size: 15px;
  }
}
::v-deep .van-nav-bar__text {
  color: var(--theme-color);
}
</style>