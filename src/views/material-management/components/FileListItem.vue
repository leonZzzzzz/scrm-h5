<template>
  <div class="file-list-item" v-if="data.type == 'file'">
    <div class="img" @click="previewFile">
      <img
        :src="typeList.find((t) => data.file.split('.')[1] === t.type).img"
      />
    </div>
    <div class="details">
      <h3 @click="previewFile">
        {{ data.name || "--" }}
      </h3>
      <div class="details-bottom">
        <Time>{{ data.createTime || "--" }}</Time>
        <Share :data="data"></Share>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "./Time";
import Share from "./Share";
const dataObj = {
  name: "",
  createTime: "",
  file: "",
  type: "",
};
export default {
  props: {
    // type: {
    //   type: String,
    //   default: "txt",
    // },
    data: {
      type: Object,
      default: () => {
        return dataObj;
      },
    },
  },
  components: {
    Time,
    Share,
  },
  data() {
    return {
      typeList: [
        {
          type: "txt",
          img: require("../../../assets/material/txt.png"),
        },
        {
          type: "doc",
          img: require("../../../assets/material/word.png"),
        },
        {
          type: "docx",
          img: require("../../../assets/material/word.png"),
        },
        {
          type: "ppt",
          img: require("../../../assets/material/ppt.png"),
        },
        {
          type: "pptx",
          img: require("../../../assets/material/ppt.png"),
        },
        {
          type: "pdf",
          img: require("../../../assets/material/pdf.png"),
        },
        {
          type: "xls",
          img: require("../../../assets/material/excel.png"),
        },
        {
          type: "xlsx",
          img: require("../../../assets/material/excel.png"),
        },
      ],
    };
  },
  methods: {
    previewFile() {
      if (this.isMobile) {
        window.open(`${this.imgUrl}${this.data.file}`);
      } else {
        window.location.href = `${this.imgUrl}${this.data.file}`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.file-list-item {
  padding: 10px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    display: flex;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .details {
    flex: 1;
    padding-left: 10px;
    height: 70px;
    h3 {
      font-size: 14px;
      text-align: justify;
      margin: 0 0 4px 0;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      min-height: 38px;
      font-weight: normal;
    }
    .details-bottom {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>