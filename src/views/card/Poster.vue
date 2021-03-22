<template>
  <div class="poster-div">
    <qc-nav-bar></qc-nav-bar>
    <div v-if="tableData && tableData.length == 0" class="none-div">
      <img
        src="../../assets/empty-data.png"
        alt=""
        style="width:150px;height:150px;"
        class="none_img"
      />
      <p class="none_text">暂无海报,请先创建</p>
    </div>
    <div class="poster-container" v-else>
      <section class="content">
        <div class="olist">
          <div
            class="img_box_outer"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div class="img_box">
              <img :src="item.host + item.background" alt="" />
            </div>
            <div class="img_text">
              <span class="name">{{ item.name }}</span>
              <span class="btn" style="color:#294a7b" @click="openForm(item)"
                >生成海报</span
              >
            </div>
          </div>
        </div>
      </section>
    </div>
    <dia-loading :loading="isLoading"></dia-loading>
  </div>
</template>

<script>
import QcNavBar from "../../components/common/QcNavBar";
import DiaLoading from "../../components/common/loading";
export default {
  components: { QcNavBar, DiaLoading },
  data() {
    return {
      tableData: [],
      isLoading: false,
    };
  },
  methods: {
    openForm(item) {
      this.$router.push(
        `/card/poster/form?background=${item.background}&height=${item.height}&host=${item.host}&id=${item.id}&name=${item.name}&qrcodeOffsetX=${item.qrcodeOffsetX}&qrcodeOffsetY=${item.qrcodeOffsetY}&qrcodeSize=${item.qrcodeSize}&width=${item.width}`
      );
    },
    setUserId() {
      this.$http
        .setUserId({ userId: "1c49f23477b14516b73783c1de4e038e" })
        .then(() => {
          this.getPosterPage();
          this.getBussinessUser();
        });
    },
    getPosterPage() {
      this.isLoading = true;
      this.$http.getPosterPage().then((res) => {
        if (res.data.code == 20000) {
          this.isLoading = false;
          this.tableData = res.data.data;
        } else {
          this.isLoading = false;
        }
      });
    },
    getQrcode(params) {
      this.$http.getQrcode(params).then((res) => {});
    },
    getBussinessUser() {
      this.$http.getBussinessUser().then((res) => {
        let businessCardId = res.data.data.id;
        let params = {
          businessCardId: businessCardId,
          page: "pages/scrm/card/index",
          type: "weapp",
        };
        this.getQrcode(params);
      });
    },
  },
  created() {
    // this.setUserId();
    this.getAuthorizeWxUserId().then(wxUserId => {
      this.getPosterPage();
    })
  },
};
</script>

<style lang="less" scoped>
.poster-div {
  width: 100%;
  .poster-container {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    padding-top: 60px;
    padding-bottom: 0;
    .content {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      .olist {
        column-count: 2;
        column-gap: 10px;
        padding: 0 10px;
        .img_box_outer {
          border: 1px solid rgba(0, 0, 0, 0.1);
          // box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
          -webkit-column-break-inside: avoid;
          margin: 0 0 15px 0;
          page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
          break-inside: avoid; /*break-inside: avoid; 避免元素内部断行并产生新列*/
          position: relative;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          overflow: hidden;
          font-size: 0;
          .img_box {
            width: 100%;
            img {
              width: 100%;
              border-top-right-radius: 5px;
              border-top-left-radius: 5px;
            }
          }
          .img_text {
            font-size: 14px;
            padding: 10px 0;

            color: #646566;
            background-color: #fff;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            display: flex;
            justify-content: space-between;
            .name {
              // text-align: center;
              margin-left: 5px;
              width: 55%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .btn {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.loading-overlay {
  background-color: rgba(0, 0, 0, 0);
}
.loading-img {
  width: 75px;
}
.none-div {
  padding-top: 50px;
  text-align: center;

  .none_img {
    padding-top: 100px;
  }
  .none_text {
    color: #646566;
  }
}
</style>
