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
        <div class="title" @click.stop="change">{{ title }}</div>
        <transition name="plus-icon-first">
          <div class="item-menu" v-if="isChange == true"></div>
        </transition>
        <transition name="plus-icon-two">
          <div class="item-menu-two" v-if="isChange == true"></div>
        </transition>
        <transition name="plus-icon-three">
          <div class="item-menu-three" v-if="isChange == true"></div>
        </transition>
        <transition name="plus-icon-four">
          <div class="item-menu-four" v-if="isChange == true"></div>
        </transition>
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
      oTop: "200",
      $vm: null, // 悬浮按钮
      moving: false, // 移动状态
      oW: null, // 悬钮距离
      oH: null,
      htmlWidth: null, // 页面宽度
      htmlHeight: null,
      bWidth: null, // 悬钮宽度
      bHeight: null,
      click: false, // 是否是点击
      isChange: false,
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
    change() {
      this.isChange = !this.isChange;
    },
    // 移动触发
    onTouchStart(e) {
      e = e.touches[0];
      this.click = true;
      this.oH = e.clientY - this.$refs.remove.getBoundingClientRect().top;
      this.htmlHeight = document.documentElement.clientHeight;
      this.bHeight = this.$refs.remove.offsetHeight;
      let oTop = e.clientY - this.oH;
      this.oTop = oTop;
      this.moving = true;
    },
    // 移动结束
    onTouchEnd(e) {
      this.moving = false;
      this.$refs.remove.class + " t-suspend-button-animate";
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
      let oTop = e.clientY - this.oH;
      if (oTop < 0) {
        oTop = 0;
      } else if (oTop > this.htmlHeight - this.bHeight) {
        oTop = this.htmlHeight - this.bHeight;
      }
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
    // width: 3rem;
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
    position: relative;
    color: #fff;
    .title {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      line-height: 40px;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
      margin-right: 0px;
    }
    .item-menu {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      position: absolute;
      top: -70px;
      right: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      &-two {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: -30px;
        right: 60px;
        background-color: rgba(0, 0, 0, 0.5);
      }
      &-three {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: 30px;
        right: 60px;
        background-color: rgba(0, 0, 0, 0.5);
      }
      &-four {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: 60px;
        right: 5px;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
.plus-icon-first-enter-active {
  transition: opacity 0.5s;
}
.plus-icon-first-enter {
  opacity: 0;
}
.plus-icon-first-leave-active {
  transition: opacity 2s;
}
.plus-icon-first-leave-to {
  opacity: 0;
}
.plus-icon-two-enter-active {
  transition: opacity 1s;
}
.plus-icon-two-enter {
  opacity: 0;
}
.plus-icon-two-leave-active {
  transition: opacity 1.5s;
}
.plus-icon-two-leave-to {
  opacity: 0;
}
.plus-icon-three-enter-active {
  transition: opacity 1.5s;
}
.plus-icon-three-enter {
  opacity: 0;
}
.plus-icon-three-leave-active {
  transition: opacity 1s;
}
.plus-icon-three-leave-to {
  opacity: 0;
}
.plus-icon-four-enter-active {
  transition: opacity 2s;
}
.plus-icon-four-enter {
  opacity: 0;
}
.plus-icon-four-leave-active {
  transition: opacity 0.5s;
}
.plus-icon-four-leave-to {
  opacity: 0;
}
</style>
