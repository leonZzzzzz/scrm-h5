<template>
  <div class="select-div">
    <div @click="changeOpen" class="changeItem">
      <span class="has-text" v-if="sTime != ''">{{ sTime }}</span>
      <span class="none-text" v-if="sTime == ''"> 开始日期</span>
      <span> - </span>
      <span class="has-text" v-if="eTime != ''">{{ eTime }}</span>
      <span class="none-text" v-if="eTime == ''"> 结束日期 </span>
      <van-icon name="cross" class="close-text" @click.stop="cutText" />
    </div>
    <transition name="van-fade">
      <div class="select-none" v-if="isShow == true">
        <div class="select-top">
          <div class="select-left">
            <div
              v-for="(item, index) in year"
              :key="index"
              @click="changeYear(item.num)"
            >
              <span>{{ item.num }}</span>
            </div>
          </div>
          <div class="select-right">
            <div
              v-for="(items, indexs) in year"
              :key="indexs"
              @click="changeEnd(items.num)"
            >
              {{ items.num }}
            </div>
          </div>
        </div>
        <div class="select-bottom">
          <span @click="sumbit">确定</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    startYear: {
      type: String,
      default: "",
    },
    endYear: {
      type: String,
      default: "",
    },
    num: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      sTime: this.startYear,
      eTime: this.endYear,
      isShow: false,
      index: this.num,
      year: [
        {
          num: 2020,
        },
        {
          num: 2019,
        },
        {
          num: 2018,
        },
        {
          num: 2017,
        },
        {
          num: 2016,
        },
        {
          num: 2015,
        },
        {
          num: 2014,
        },
        {
          num: 2013,
        },
        {
          num: 2012,
        },
        {
          num: 2011,
        },
        {
          num: 2010,
        },
        {
          num: 2009,
        },
        {
          num: 2008,
        },
        {
          num: 2007,
        },
        {
          num: 2006,
        },
        {
          num: 2005,
        },
        {
          num: 2004,
        },
        {
          num: 2003,
        },
        {
          num: 2002,
        },
        {
          num: 2001,
        },
        {
          num: 2000,
        },
        {
          num: 1999,
        },
        {
          num: 1998,
        },
        {
          num: 1997,
        },
        {
          num: 1996,
        },
        {
          num: 1995,
        },
        {
          num: 1994,
        },
        {
          num: 1993,
        },
        {
          num: 1992,
        },
        {
          num: 1991,
        },
        {
          num: 1990,
        },
      ],
    };
  },
  methods: {
    cutText() {
      this.sTime = "";
      this.eTime = "";
      let data = {
        start: this.sTime,
        end: this.eTime,
        index: this.index,
      };
      this.$emit("cancel", data);
    },
    changeYear(num) {
      this.sTime = num;
    },
    changeEnd(num) {
      this.eTime = num;
    },
    changeOpen() {
      this.isShow = !this.isShow;
    },

    sumbit() {
      this.isShow = false;
      let data = {
        start: this.sTime,
        end: this.eTime,
        index: this.index,
      };
      // this.$emit("startYear", this.sTime);
      // this.$emit("eTime", this.eTime);
      this.$emit("success", data);
    },
  },
  watch: {
    startYear(val) {
      this.startYear = val;
    },
    endYear(val) {
      this.endYear = val;
    },
  },
};
</script>

<style lang="less" scoped>
.select-div {
  border: none;
  padding: 5px 0;
  width: 180px;
  .changeItem {
    width: 100%;
    .has-text {
      color: #323233;
      padding: 5px;
    }
    .none-text {
      color: #c8c9cc;
      padding: 5px;
    }
    .close-text {
      // margin-top: 2px;
      margin-left: 5px;
      font-size: 14px;
      color: #c8c9cc;
      border: 1px solid #b0b0b3;
      border-radius: 50%;
    }
  }

  .select-none {
    right: 45px;
    border-radius: 2px;
    margin-top: 28px;
    position: absolute;
    width: 250px;
    z-index: 999;
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);

    .select-top {
      height: 200px;
      display: flex;
      .select-left {
        color: #646566;
        overflow-y: auto;
        width: 50%;
        border-right: 1px solid #ccc;
        margin: 5px 0;
        div {
          padding: 7px 0;
          text-align: center;
        }
      }
      .select-right {
        color: #646566;
        overflow-y: auto;
        width: 50%;
        margin: 5px 0;
        div {
          padding: 7px 0;
          text-align: center;
        }
      }
    }
    .select-bottom {
      height: 40px;
      text-align: right;
      line-height: 40px;
      margin-right: 5px;
      // span:nth-child(1) {
      //   border: 1px solid #ccc;
      //   padding: 5px 10px;
      //   border-radius: 5px;
      //   margin-right: 5px;
      //   color: rgb(153, 152, 152);
      // }
      span:nth-child(1) {
        background-color: #294a7b;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
}
</style>
