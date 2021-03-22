<template>
  <div>
    <div class="text-list-item" v-if="data.type == 'text'">
      <h3>
        {{ data.content || "--" }}
      </h3>
      <div class="item-bottom">
        <div class="time">
          <Time>{{ data.createTime || "--" }}</Time>
        </div>
        <div class="share">
          <Share :data="data"></Share>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Share from "./Share";
import Time from "./Time";
const dataObj = {
  id:"",
  content: "",
  createTime: "",
  type: "",
};
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return dataObj;
      },
    },
  },
  components: {
    Share,
    Time,
  },
};
</script>

<style lang="less" scoped>
.text-list-item {
  color: #272727;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 14px;
  h3 {
    font-size: 14px;
    text-align: justify;
    margin: 0 0 14px 0;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: normal;
    min-height: 38px;
  }
  .item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>