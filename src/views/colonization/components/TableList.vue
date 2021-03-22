<template>
  <div class="table-list">
    <div class="left">
      <div class="line-first">
        <p>{{ name }}</p>
      </div>
      <div class="line-second">
        <p>群名：{{ groupNameTemplate }}</p>
      </div>
      <div class="line-second">
        <p>成员：{{ userContent }}</p>
      </div>
    </div>
    <div class="right" @click="clickHandel">
      {{ buttonName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "规则名",
    },
    groupNameTemplate: {
      type: String,
      default: "群名模板",
    },
    userContent: {
      type: String,
      default: "成员列表前4",
    },
    buttonName: {
      type: String,
      default: "建群",
    },
  },
  methods: {
    clickHandel() {
      this.$emit("clickHandel");
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
.table-list {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
  .left {
    width: calc(100% - 40px);
    p {
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .line-first {
      width: 100%;
      display: flex;
      font-size: 16px;
    }
    .line-second {
      p {
        color: #808080;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .right {
    padding: 0 10px;
    width: 20px;
    height: 100%;
    background-color: #366cb3;
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
  }
}
</style>