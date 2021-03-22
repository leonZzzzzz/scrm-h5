<template>
  <van-overlay :show="show">
    <div class="overlay-wrapper">
      <div class="com-popup">
        <div class="content">
          <slot></slot>
        </div>
        <div class="btn-group">
          <div class="com-btn btn-cancel" @click="onCancel">{{cancelText}}</div>
          <div class="com-btn btn-commit" @click="onCommit">{{commitText}}</div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { Overlay } from 'vant'
export default {
  components: {
    vanOverlay: Overlay
  },
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    cancelText: {
      type: String,
      default: () => {
        return '取消'
      }
    },
    commitText: {
      type: String,
      default: () => {
        return '确认'
      }
    },
    title: {
      type: String,
      default: () => {
        return ''
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
  .com-popup {
    width: calc(100% - 60px);
    margin: auto;
    background-color: #FFFFFF;
    border-radius: 3px;
    .title {
      color: #222222;
      font-weight: bold;
      text-align: center;
      padding: 16px 0;
    }
    .btn-group {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #c8c9cc;
      .com-btn {
        flex: 1;
        text-align: center;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
      }
      .btn-cancel {
        color: #222222;
        border-right: 1px solid #c8c9cc;
      }
      .btn-commit {
        color: #4f73ad;
      }
    }
  }
}
</style>