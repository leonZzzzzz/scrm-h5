<template>
  <van-overlay :show="show">
    <div class="overlay-wrapper">
      <div class="notify-dialog">
        <div class="content">
          <slot></slot>
        </div>
        <div class="bottom" v-if="!showBottomGroups" @click="onClose">知道了</div>
        <div class="bottom-groups" v-else>
          <div class="groups-btn btn-cancel" @click="onCancel">取消</div>
          <div class="groups-divider"></div>
          <div class="groups-btn btn-commit" @click="onConfirm">确认</div>
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
    showBottomGroups: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('onClose')
    },
    onCancel() {
      this.$emit('onCancel')
    },
    onConfirm() {
      this.$emit('onConfirm')
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
  .notify-dialog {
    width: calc(100% - 60px);
    margin: auto;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .bottom {
      text-align: center;
      padding: 10px 0;
      border-top: 1px solid #c8c9cc;
      color: #294a7b;
      cursor: pointer;
    }
    .bottom-groups {
      display: flex;
      border-top: 1px solid #c8c9cc;
      text-align: center;
      cursor: pointer;
      .groups-btn {
        flex: 1;
        line-height: 40px;
      }
      .btn-commit {
        color: #4f73ad;
      }
      .btn-cancel {
        border-right: 1px solid #c8c9cc;
      }
      .groups-divider {
        width: 1px;
        height: 40px;
        background-color: #c8c9cc;
      }
    }
  }
}
</style>