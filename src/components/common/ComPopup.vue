<template>
  <van-overlay :show="show">
    <div class="overlay-wrapper">
      <div class="com-popup">
        <div class="title">{{title}}</div>
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
    width: calc(100% - 40px);
    margin: auto;
    background-color: #FFFFFF;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 8px;
    .title {
      color: #222222;
      font-weight: bold;
      text-align: center;
      padding: 16px 0;
    }
    .btn-group {
      display: flex;
      justify-content: center;
      padding: 12px 0;
      .com-btn {
        padding: 8px 20px;
        margin: 0 18px;
        background-color: #4f73ad;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
      }
      .btn-cancel {
        background-color: #EDEEF3;
        color: #222222;
      }
      .btn-commit {
        font-weight: bold;
      }
    }
  }
}
</style>