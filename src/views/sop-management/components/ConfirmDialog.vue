<template>
  <van-overlay :show="config.show" z-index="99">
    <div class="overlay-wrapper">
      <div class="confirm-dialog">
        <div class="content">
          {{ config.message }}
        </div>
        <div class="btn-groups">
          <div class="btn btn-cancel" @click="onCancel">否</div>
          <div class="btn btn-commit" @click="onConfirm">是</div>
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
    config: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
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
  .confirm-dialog {
    width: calc(100% - 100px);
    margin: auto;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    .content {
      color: #222222;
      font-size: 17px;
      font-weight: bold;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 50px;
    }
    .btn-groups {
      display: flex;
      justify-content: center;
      margin-bottom: 18px;
      .btn {
        width: 90px;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        border-radius: 20px;
        box-sizing: border-box;
        cursor: pointer;
      }
      
      .btn-cancel {
        color: #3875C6;
        border: 1px solid #D9E2F2;
        margin-right: 15px;
      }
      .btn-commit {
        background: #3875C6;
        color: #ffffff;
      }
    }
  }
}
</style>