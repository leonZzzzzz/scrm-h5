<template>
  <van-overlay :show="show">
    <div class="overlay-wrapper">
      <div class="com-dialog" :class="isFullPage ? 'full-page' : ''">
        <!-- <div class="top">
          <van-icon name="cross" class="close" @click="onCancel"></van-icon>
        </div> -->
        <div class="content">
          <slot></slot>
        </div>
        <div class="btn-group">
          <div class="com-btn btn-cancel" @click="onCancel">取消</div>
          <div class="com-btn btn-commit" @click="onCommit">确定</div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { Overlay, Icon } from 'vant'
export default {
  components: {
    vanOverlay: Overlay,
    vanIcon: Icon
  },
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isFullPage: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit('onCancel')
    },
    onCommit() {
      this.$emit('onCommit')
    }
  }
}
</script>

<style lang="less" scoped>
.overlay-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .com-dialog {
    width: calc(100% - 20px);
    margin: auto;
    background-color: #eff0f3;
    padding: 20px 12px;
    box-sizing: border-box;
    .top {
      display: flex;
      flex-direction: row-reverse;
      .close {
        font-size: 18px;
        color: #969799;
        cursor: pointer;
      }
    }
    .btn-group {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 20px;
      .com-btn {
        padding: 5px 20px;
        margin-left: 10px;
        background-color: #294a7b;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
      }
      .btn-cancel {
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #969799;
        box-sizing: border-box;
      }
    }
  }
  .full-page {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>