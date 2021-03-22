<template>
  <div class="removeHome">
    <span
      class="t-suspend-button"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      ref="remove"
      :style="`left: ${oLeft}px; top: ${oTop}px;`"
    >
      <div class="yuanqiu">
        <div>{{ title }}</div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      oLeft: "",
      oTop: "",
      $vm: null, // 悬浮按钮
      moving: false, // 移动状态
      oW: null, // 悬钮距离
      oH: null,
      htmlWidth: null, // 页面宽度
      htmlHeight: null,
      bWidth: null, // 悬钮宽度
      bHeight: null,
      click: false, // 是否是点击
    };
  },
  mounted() {
    this.$refs.remove.addEventListener(
      "touchmove",
      (e) => {
        if (e.cancelable) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  },
  methods: {
    // 移动触发
    onTouchStart(e) {
      e = e.touches[0];
      this.click = true;

      this.oW = e.clientX - this.$refs.remove.getBoundingClientRect().left;
      this.oH = e.clientY - this.$refs.remove.getBoundingClientRect().top;

      this.htmlWidth = document.documentElement.clientWidth;
      this.htmlHeight = document.documentElement.clientHeight;

      this.bWidth = this.$refs.remove.offsetWidth;
      this.bHeight = this.$refs.remove.offsetHeight;

      let oLeft = e.clientX - this.oW;
      let oTop = e.clientY - this.oH;

      this.oLeft = oLeft;
      this.oTop = oTop;

      this.moving = true;
    },
    // 移动结束
    onTouchEnd(e) {
      this.moving = false;

      this.$refs.remove.class + " t-suspend-button-animate";

      // 左侧距离
      let oLeft = this.oLeft;
      if (oLeft < (this.htmlWidth - this.bWidth) / 2) {
        oLeft = 0;
      } else {
        oLeft = this.htmlWidth - this.bWidth;
      }

      // if (this.click) {
      //   this.props.onClick();
      // }
      // }
      // if (oTop < 0) {
      //   oTop = 0;
      // } else if (oTop > this.htmlHeight - this.bHeight) {
      //   oTop = this.htmlHeight - this.bHeight;
      // }

      this.oLeft = oLeft;
    },
    // 开始移动
    onTouchMove(e) {
      this.$refs.remove.class = "t-suspend-button";
      this.moving && this.onMove(e);
    },
    // 移动中
    onMove(e) {
      e = e.touches[0];
      this.click = false;

      // 左侧距离
      let oLeft = e.clientX - this.oW;
      let oTop = e.clientY - this.oH;
      if (oLeft < 0) {
        oLeft = 0;
      } else if (oLeft > this.htmlWidth - this.bWidth) {
        oLeft = this.htmlWidth - this.bWidth;
      }
      if (oTop < 0) {
        oTop = 0;
      } else if (oTop > this.htmlHeight - this.bHeight) {
        oTop = this.htmlHeight - this.bHeight;
      }

      this.oLeft = oLeft;
      this.oTop = oTop;
    },
  },
};
</script>

<style lang="less" scoped>
.removeHome {
  .t-suspend-button {
    position: fixed;
    bottom: 2%;
    right: 0px;
    width: 3rem;
    height: 2.5rem;
    border-radius: 2rem;
    z-index: 99999;
  }

  .t-suspend-button img {
    width: 100%;
    height: 100%;
  }

  .t-suspend-button-animate {
    transition-duration: 12s;
  }
  .yuanqiu {
    // width: 48px;
    // height: 48px;
    div {
      color: #fff;
      border-radius: 20px;
      // border-top-left-radius: 20px;
      // border-bottom-left-radius: 20px;
      background-color: #294a7b;
      padding: 10px;
      text-align: center;
    }
  }
}
</style>
